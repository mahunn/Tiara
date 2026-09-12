'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Sparkles,
  Phone,
  User,
  MapPin,
  Loader2,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '@/lib/store';
import { saveOrder } from '@/lib/supabase';
import { Order, DeliveryZone } from '@/types';
import { MESSENGER_URL } from '@/lib/mockData';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    cartCount, 
    cartSubtotal, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useStore();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cityZone, setCityZone] = useState<DeliveryZone>('chandpur');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ orderId: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 3000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const diffToFree = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const getDeliveryFee = (zone: DeliveryZone) => {
    if (cartSubtotal >= FREE_SHIPPING_THRESHOLD) return 0;
    if (zone === 'chandpur') return 50;
    if (zone === 'dhaka') return 120;
    return 130;
  };

  const deliveryFee = getDeliveryFee(cityZone);
  const grandTotal = cartSubtotal + deliveryFee;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার নাম দিন');
      return;
    }
    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 11) {
      setErrorMsg('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('অনুগ্রহ করে ডেলিভারি ঠিকানা লিখুন');
      return;
    }

    setIsSubmitting(true);

    const newOrder: Order = {
      customer: {
        fullName: fullName.trim(),
        phone: cleanPhone,
        address: address.trim(),
        cityZone,
      },
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.banglaName || item.product.name,
        size: item.selectedSize,
        color: item.selectedColor,
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal: cartSubtotal,
      deliveryFee,
      total: grandTotal,
      paymentMethod: 'cash_on_delivery',
      status: 'pending',
    };

    const res = await saveOrder(newOrder);
    setIsSubmitting(false);

    if (res.success) {
      setOrderSuccess({ orderId: res.orderId });
      clearCart();
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#590F23', '#F7D6DE', '#C68E4D', '#B8A4C9', '#A3C4BC'],
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorMsg('অর্ডার সাবমিট হতে সমস্যা হয়েছে। দয়া করে মেসেঞ্জারে জানান।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#F7D6DE]">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F7D6DE] bg-[#FAF1F4]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#590F23]" />
              <h3 className="font-serif font-bold text-base text-[#241117]">
                শপিং ব্যাগ ({cartCount})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-white text-[#7A5763] transition-colors"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Note */}
          <div className="px-5 py-2.5 bg-[#FDEEF2] border-b border-[#F7D6DE] text-xs">
            <div className="flex items-center justify-between text-[#590F23] font-medium">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                <span>ডেলিভারি: চাঁদপুর সদর ৫০৳ • ঢাকা ১২০৳</span>
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {orderSuccess ? (
              /* Success State */
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-[#FAF1F4] text-[#590F23] rounded-full flex items-center justify-center mx-auto border border-[#F7D6DE]">
                  <CheckCircle2 className="w-10 h-10 text-[#590F23]" />
                </div>
                <h4 className="font-serif font-bold text-xl text-[#241117]">
                  অর্ডার সফল হয়েছে!
                </h4>
                <p className="text-xs text-[#7A5763]">
                  অর্ডার আইডি: #{orderSuccess.orderId}
                </p>
                <p className="text-xs text-[#7A5763] max-w-xs mx-auto">
                  আমাদের প্রতিনিধি শীঘ্রই আপনার নম্বরে কল করে অর্ডারটি কনফার্ম করবেন।
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setOrderSuccess(null);
                      setIsCheckingOut(false);
                      setIsCartOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#590F23] text-white text-xs font-semibold hover:bg-[#721631]"
                  >
                    আরও কেনাকাটা করুন
                  </button>
                  <a
                    href={MESSENGER_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2 rounded-full bg-[#0084FF] text-white text-xs font-semibold hover:bg-[#0070D6] flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>মেসেঞ্জারে ইনবক্স করুন</span>
                  </a>
                </div>
              </div>
            ) : isCheckingOut ? (
              /* Inline Fast Checkout Form */
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#F7D6DE]">
                  <h4 className="font-serif font-bold text-sm text-[#590F23]">ক্যাশ অন ডেলিভারি তথ্য</h4>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-[#7A5763] hover:underline"
                  >
                    ব্যাগে ফিরে যান
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241117] mb-1">
                    আপনার নাম *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A5763]" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="নাম লিখুন"
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF1F4] border border-[#F7D6DE] rounded-xl text-xs text-[#241117] focus:outline-none focus:border-[#590F23]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241117] mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A5763]" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      maxLength={11}
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF1F4] border border-[#F7D6DE] rounded-xl text-xs text-[#241117] focus:outline-none focus:border-[#590F23]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241117] mb-1">
                    ডেলিভারি এলাকা *
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setCityZone('chandpur')}
                      className={`p-2 rounded-xl border text-[11px] font-medium text-center ${
                        cityZone === 'chandpur'
                          ? 'border-[#590F23] bg-[#FAF1F4] text-[#590F23] font-bold'
                          : 'border-[#F7D6DE] bg-white text-[#7A5763]'
                      }`}
                    >
                      চাঁদপুর (৫০৳)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCityZone('dhaka')}
                      className={`p-2 rounded-xl border text-[11px] font-medium text-center ${
                        cityZone === 'dhaka'
                          ? 'border-[#590F23] bg-[#FAF1F4] text-[#590F23] font-bold'
                          : 'border-[#F7D6DE] bg-white text-[#7A5763]'
                      }`}
                    >
                      ঢাকা (১২০৳)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCityZone('outside_dhaka')}
                      className={`p-2 rounded-xl border text-[11px] font-medium text-center ${
                        cityZone === 'outside_dhaka'
                          ? 'border-[#590F23] bg-[#FAF1F4] text-[#590F23] font-bold'
                          : 'border-[#F7D6DE] bg-white text-[#7A5763]'
                      }`}
                    >
                      অন্য জেলা (১৩০৳)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241117] mb-1">
                    সম্পূর্ণ ঠিকানা *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-[#7A5763]" />
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="বাসা নম্বর, রোড, এলাকা, উপজেলা/থানা"
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF1F4] border border-[#F7D6DE] rounded-xl text-xs text-[#241117] focus:outline-none focus:border-[#590F23]"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-xs text-[#590F23] text-center">
                    {errorMsg}
                  </div>
                )}

                <div className="p-3 rounded-xl bg-[#FAF1F4] border border-[#F7D6DE] text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>আইটেম মূল্য:</span>
                    <span>৳ {cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ডেলিভারি চার্জ:</span>
                    <span>৳ {deliveryFee}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#F7D6DE] font-bold text-sm text-[#590F23]">
                    <span>সর্বমোট:</span>
                    <span>৳ {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-[#590F23] text-white font-bold text-sm hover:bg-[#721631] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>কনফার্ম হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <span>অর্ডার প্লেস করুন (ক্যাশ অন ডেলিভারি)</span>
                    </>
                  )}
                </button>
              </form>
            ) : cart.length === 0 ? (
              /* Empty State */
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-[#FAF1F4] rounded-full flex items-center justify-center mx-auto text-[#7A5763]">
                  <ShoppingBag className="w-8 h-8 opacity-50" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#241117]">
                  আপনার শপিং ব্যাগটি খালি
                </h4>
                <p className="text-xs text-[#7A5763] max-w-xs mx-auto">
                  বেক্সি বয়েল নামাজের হিজাব দেখতে কালেকশনে ঘুরে আসুন
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2 rounded-full bg-[#590F23] text-white text-xs font-semibold hover:bg-[#721631]"
                >
                  কালেকশন দেখুন
                </button>
              </div>
            ) : (
              /* Cart Items List */
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-3 p-3 rounded-2xl bg-[#FAF1F4] border border-[#F7D6DE] relative"
                  >
                    <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-[#F7D6DE]">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#241117] truncate">
                        {item.product.banglaName || item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#7A5763] mt-0.5">
                        কালার: <span className="font-medium text-[#241117]">{item.selectedColor}</span>
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs sm:text-sm font-bold text-[#590F23]">
                          ৳ {(item.product.price * item.quantity).toLocaleString()}
                        </span>

                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#F7D6DE] bg-white rounded-lg px-2 py-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity - 1
                              )
                            }
                            className="text-xs px-1 text-[#590F23] font-bold"
                          >
                            -
                          </button>
                          <span className="text-xs px-2 font-semibold text-[#241117]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity + 1
                              )
                            }
                            className="text-xs px-1 text-[#590F23] font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
                      }
                      className="absolute top-2.5 right-2.5 text-[#7A5763] hover:text-rose-600 p-1"
                      aria-label="আইটেম মুছুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer / Checkout CTA */}
          {cart.length > 0 && !isCheckingOut && !orderSuccess && (
            <div className="p-4 border-t border-[#F7D6DE] bg-[#FAF1F4] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#7A5763]">
                <span>সাবটোটাল:</span>
                <span className="text-sm font-bold text-[#241117]">৳ {cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#7A5763]">
                <span>ডেলিভারি চার্জ:</span>
                <span>চাঁদপুর সদর ৫০৳ • ঢাকা ১২০৳</span>
              </div>
              <div className="pt-2 border-t border-[#F7D6DE] flex items-baseline justify-between">
                <span className="font-serif font-bold text-sm text-[#241117]">মোট প্রদেয়:</span>
                <span className="text-lg font-bold text-[#590F23]">৳ {cartSubtotal.toLocaleString()}</span>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 rounded-2xl bg-[#590F23] hover:bg-[#721631] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
              >
                <span>ক্যাশ অন ডেলিভারিতে অর্ডার করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
