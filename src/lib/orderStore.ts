import fs from 'fs';
import path from 'path';
import { Order } from '@/types';
import { supabase, isSupabaseConfigured } from './supabase';

const DATA_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Initial seed orders so the admin panel has data ready
const INITIAL_SEED_ORDERS: Order[] = [
  {
    id: 'TR-230329',
    customer: {
      fullName: 'মাহিন চৌধুরী',
      phone: '01828034555',
      address: 'মাদরাসা রোড, সদর হাসপাতাল সংলগ্ন, চাঁদপুর সদর',
      cityZone: 'chandpur',
      notes: 'বিকেলের মধ্যে ডেলিভারি দিলে ভালো হয়',
    },
    items: [
      {
        productId: 'tiara-crepe-cotton-tassel-hijab',
        productName: 'ক্রেপ কটন টেসেল হিজাব',
        size: 'বড় সাইজ (১৯৫/৮৫)',
        color: 'কপার (Copper)',
        quantity: 1,
        price: 550,
        image: '/images/products/hijabs/cotton-hijab-1/809107193_122103017367474189_5145764325827666920_n.jpg',
      },
    ],
    subtotal: 550,
    deliveryFee: 50,
    total: 600,
    paymentMethod: 'cash_on_delivery',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'TR-230315',
    customer: {
      fullName: 'তানজিলা হক',
      phone: '01711223344',
      address: 'বাসা ৪২, রোড ৭, সেক্টর ৪, উত্তরা, ঢাকা',
      cityZone: 'dhaka',
      notes: 'কল দিয়ে আসবেন',
    },
    items: [
      {
        productId: 'tiara-crepe-cotton-tassel-hijab',
        productName: 'ক্রেপ কটন টেসেল হিজাব',
        size: 'বড় সাইজ (১৯৫/৮৫)',
        color: 'সেজ গ্রিন (Sage Green)',
        quantity: 1,
        price: 550,
        image: '/images/products/hijabs/cotton-hijab-1/809107193_122103017895474189_3647366001408501052_n.jpg',
      },
      {
        productId: 'tiara-dressmaker-hijab-pins',
        productName: 'স্টেইনলেস স্টিল বল হিজাব পিন বক্স',
        size: '১ বক্স',
        color: 'গোল্ডেন (Gold)',
        quantity: 1,
        price: 150,
        image: '/images/products/hijab-pins.jpg',
      },
    ],
    subtotal: 700,
    deliveryFee: 120,
    total: 820,
    paymentMethod: 'cash_on_delivery',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

function ensureStorage(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(INITIAL_SEED_ORDERS, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error initializing orders storage:', err);
  }
}

/**
 * Get all orders from server storage (and Supabase if configured)
 */
export async function getOrdersServer(): Promise<Order[]> {
  ensureStorage();

  let fileOrders: Order[] = [];
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    fileOrders = JSON.parse(raw);
  } catch (e) {
    console.error('Error reading orders from file:', e);
    fileOrders = [];
  }

  // If Supabase is connected, optionally fetch and merge
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const supabaseOrders: Order[] = data.map((d: any) => ({
          id: d.order_id || String(d.id),
          customer: {
            fullName: d.customer_name,
            phone: d.customer_phone,
            address: d.customer_address,
            cityZone: d.city_zone || 'chandpur',
            notes: d.notes,
          },
          items: d.items || [],
          subtotal: d.subtotal || 0,
          deliveryFee: d.delivery_fee || 0,
          total: d.total_amount || 0,
          paymentMethod: d.payment_method || 'cash_on_delivery',
          status: d.status || 'pending',
          createdAt: d.created_at,
        }));

        // Merge keeping unique by id
        const orderMap = new Map<string, Order>();
        supabaseOrders.forEach((o) => o.id && orderMap.set(o.id, o));
        fileOrders.forEach((o) => o.id && !orderMap.has(o.id) && orderMap.set(o.id, o));
        return Array.from(orderMap.values()).sort((a, b) => 
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
      }
    } catch (err) {
      console.warn('Supabase fetch failed, using local orders:', err);
    }
  }

  return fileOrders.sort((a, b) => 
    new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
}

/**
 * Save new order to server storage
 */
export async function createOrderServer(order: Order): Promise<{ success: boolean; orderId: string; order: Order }> {
  ensureStorage();

  const orderId = order.id || `TR-${Math.floor(100000 + Math.random() * 900000)}`;
  const finalOrder: Order = {
    ...order,
    id: orderId,
    status: order.status || 'pending',
    createdAt: order.createdAt || new Date().toISOString(),
  };

  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const existing: Order[] = JSON.parse(raw);
    const updated = [finalOrder, ...existing.filter((o) => o.id !== orderId)];
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving order to file:', err);
  }

  // If Supabase is configured
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('orders').insert([
        {
          order_id: orderId,
          customer_name: finalOrder.customer.fullName,
          customer_phone: finalOrder.customer.phone,
          customer_address: finalOrder.customer.address,
          city_zone: finalOrder.customer.cityZone,
          items: finalOrder.items as any,
          subtotal: finalOrder.subtotal,
          delivery_fee: finalOrder.deliveryFee,
          total_amount: finalOrder.total,
          payment_method: finalOrder.paymentMethod,
          status: finalOrder.status,
        },
      ]);
    } catch (e) {
      console.warn('Supabase save error:', e);
    }
  }

  return { success: true, orderId, order: finalOrder };
}

/**
 * Update order status (pending, confirmed, shipped, delivered, cancelled)
 */
export async function updateOrderStatusServer(orderId: string, status: Order['status']): Promise<boolean> {
  ensureStorage();

  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const orders: Order[] = JSON.parse(raw);
    const idx = orders.findIndex((o) => o.id === orderId);
    if (idx !== -1) {
      orders[idx].status = status;
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
    }

    if (isSupabaseConfigured && supabase) {
      await supabase.from('orders').update({ status }).eq('order_id', orderId);
    }

    return true;
  } catch (err) {
    console.error('Error updating order status:', err);
    return false;
  }
}

/**
 * Delete an order
 */
export async function deleteOrderServer(orderId: string): Promise<boolean> {
  ensureStorage();

  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const orders: Order[] = JSON.parse(raw);
    const filtered = orders.filter((o) => o.id !== orderId);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');

    if (isSupabaseConfigured && supabase) {
      await supabase.from('orders').delete().eq('order_id', orderId);
    }

    return true;
  } catch (err) {
    console.error('Error deleting order:', err);
    return false;
  }
}

export { formatMessengerOrderText } from './messengerFormat';
