import { Order } from '../types';

/**
 * Helper to generate pre-formatted Messenger confirmation text
 * Contains Product Name, Color, Sizing, Customer Name, Address, Phone, Price
 */
export function formatMessengerOrderText(order: Order, isFromCustomer = false): string {
  const zoneName = 
    order.customer.cityZone === 'chandpur' 
      ? 'চাঁদপুর সদর (৫০৳)' 
      : order.customer.cityZone === 'dhaka' 
      ? 'ঢাকা সিটি (১২০৳)' 
      : 'সারা বাংলাদেশ (১৩০৳)';

  const itemsList = order.items.map((item, i) => {
    return `${order.items.length > 1 ? `${i + 1}. ` : ''}• পণ্য: ${item.productName}\n  কালার: ${item.color || 'স্ট্যান্ডার্ড'}\n  সাইজ: ${item.size || 'ফ্রি সাইজ'}\n  পরিমাণ: ${item.quantity}টি\n  মূল্য: ৳${item.price.toLocaleString()}`;
  }).join('\n\n');

  if (isFromCustomer) {
    return (
      `🌸 TIARA অর্ডার কনফার্মেশন রিকুয়েস্ট 🌸\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `অর্ডার আইডি: #${order.id}\n` +
      `নাম: ${order.customer.fullName}\n` +
      `মোবাইল: ${order.customer.phone}\n` +
      `ঠিকানা: ${order.customer.address}\n` +
      `ডেলিভারি এলাকা: ${zoneName}\n\n` +
      `${itemsList}\n\n` +
      `ডেলিভারি চার্জ: ৳${order.deliveryFee}\n` +
      `মোট প্রদেয় বিল: ৳${order.total.toLocaleString()} (ক্যাশ অন ডেলিভারি)\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `আমি এই অর্ডারটি কনফার্ম করতে চাই। অনুগ্রহ করে রিসিভ করুন।`
    );
  }

  // Admin confirmation message to send to customer
  return (
    `আসসালামু আলাইকুম ${order.customer.fullName} আপু/ভাইয়া, 🌸\n` +
    `TIARA (টিয়ারা)-তে আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।\n\n` +
    `📋 অর্ডারের বিবরণ:\n` +
    `━━━━━━━━━━━━━━━━━━\n` +
    `অর্ডার আইডি: #${order.id}\n` +
    `${itemsList}\n\n` +
    `📦 ডেলিভারি ঠিকানা:\n` +
    `${order.customer.address}\n` +
    `এলাকা: ${zoneName}\n` +
    `মোবাইল নম্বর: ${order.customer.phone}\n\n` +
    `💰 মোট প্রদেয় টাকা: ৳${order.total.toLocaleString()} (ক্যাশ অন ডেলিভারি)\n` +
    `━━━━━━━━━━━━━━━━━━\n` +
    `আপনার এই অর্ডারটি কি কনফার্ম করব? একটি রিপ্লাই দিলে আমরা দ্রুত পার্সেল ডেলিভারিতে পাঠিয়ে দেব ইনশাআল্লাহ। ❤️`
  );
}
