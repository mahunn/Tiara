import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';
import { Order } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project')
);

export const supabase = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Save an order to Supabase (or fallback gracefully to local storage / memory)
 */
export async function saveOrder(order: Order): Promise<{ success: boolean; orderId: string; error?: string }> {
  const generatedId = `TR-${Date.now().toString().slice(-6)}`;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            order_id: generatedId,
            customer_name: order.customer.fullName,
            customer_phone: order.customer.phone,
            customer_address: order.customer.address,
            city_zone: order.customer.cityZone,
            items: order.items as any,
            subtotal: order.subtotal,
            delivery_fee: order.deliveryFee,
            total_amount: order.total,
            payment_method: order.paymentMethod,
            status: 'pending',
          },
        ])
        .select();

      if (error) {
        console.warn('Supabase insert warning, saving locally:', error.message);
      } else if (data && data[0]) {
        return { success: true, orderId: data[0].order_id || generatedId };
      }
    } catch (err: unknown) {
      console.error('Supabase connection error:', err);
    }
  }

  // Graceful local persistence fallback
  if (typeof window !== 'undefined') {
    try {
      const existing = JSON.parse(localStorage.getItem('tiara_orders') || '[]');
      existing.unshift({ ...order, id: generatedId, createdAt: new Date().toISOString() });
      localStorage.setItem('tiara_orders', JSON.stringify(existing));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }

  return { success: true, orderId: generatedId };
}
