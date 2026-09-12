'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  Phone, 
  MapPin, 
  User, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '@/lib/store';
import { saveOrder } from '@/lib/supabase';
import { Order } from '@/types';

export default function QuickOrderModal() {
  const { quickOrderProduct, quickOrderOptions, closeQuickOrder } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cityZone, setCityZone] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ orderId: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Set initial selected options from store
  React.useEffect(() => {
    if (quickOrderProduct) {
      setSelectedSize(quickOrderOptions.size || quickOrderProduct.sizes[0] || 'Standard');
      setSelectedColor(quickOrderOptions.color || quickOrderProduct.colors[0]?.name || 'Standard');
      setOrderSuccess(null);
      setErrorMsg('');
    }
  }, [quickOrderProduct, quickOrderOptions]);

  if (!quickOrderProduct) return null;

  const deliveryFee = cityZone === 'inside_dhaka' ? 70 : 130;
  const itemTotal = quickOrderProduct.price * quantity;
  const grandTotal = itemTotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার নাম লিখুন');
      return;
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 11) {
      setErrorMsg('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)');
      return;
    }

    if (!address.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার সম্পূর্ণ ঠিকানা লিখুন');
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
      items: [
        {
          productId: quickOrderProduct.id,
          productName: quickOrderProduct.banglaName || quickOrderProduct.name,
          size: selectedSize,
          color: selectedColor,
          quantity,
          price: quickOrderProduct.price,
        },
      ],
      subtotal: itemTotal,
      deliveryFee,
      total: grandTotal,
      paymentMethod: 'cash_on_delivery',
      status: 'pending',
    };

    const res = await saveOrder(newOrder);

    setIsSubmitting(false);

    if (res.success) {
      setOrderSuccess({ orderId: res.orderId });
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#590F23', '#F7D6DE', '#C68E4D', '#E8B4C0'],
        });
      } catch (err) {
        console.log('Confetti effect', err);
      }
    } else {
      setErrorMsg('অর্ডার সাবমিট করতে সমস্যা হয়েছে। দয়া করে পুনরায় চেষ্টা করুন বা সরাসরি কল করুন।');
    }
  };

  const handleWhatsAppOrder = () => {
    const message = `হ্যালো TIARA, আমি এই পণ্যটি অর্ডার করতে চাই:\nপ্রোডাক্ট: ${quickOrderProduct.name}\nসাইজ: ${selectedSize}\nকালার: ${selectedColor}\nমূল্য: ৳${quickOrderProduct.price}\nনাম: ${fullName || '...'}\nফোন: ${phone || '...'}\nঠিকানা: ${address || '...'}`;
    const url = `https://wa.me/8801700000000?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleMessengerOrder = () => {
    window.open('https://m.me/tiarabd', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#F7D6DE] overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#FAF1F4] to-[#F8DAE1] border-b border-[#F7D6DE]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#590F23] animate-pulse"></span>
            <h3 className="font-serif font-bold text-[#590F23] text-base sm:text-lg">
              সহজ সরাসরি অর্ডার (ক্যাশ অন ডেলিভারি)
            </h3>
          </div>
          <button
            onClick={closeQuickOrder}
            className="p-1.5 rounded-full hover:bg-white/80 text-[#7A5763] transition-colors"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {orderSuccess ? (
            /* Success State */
            <div className="text-center py-6 sm:py-8 space-y-4 animate-scaleUp">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FAF1F4] text-[#590F23] rounded-full flex items-center justify-center mx-auto border-2 border-[#F7D6DE] shadow-sm">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#590F23]" />
              </div>
              <div className="space-y-1">
                <span className="inline-block px-3 py-1 bg-[#FAF1F4] text-[#590F23] text-xs font-semibold rounded-full border border-[#F7D6DE]">
                  অর্ডার আইডি: #{orderSuccess.orderId}
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#241117] pt-2">
                  ধন্যবাদ! আপনার অর্ডারটি নিশ্চিত হয়েছে
                </h4>
                <p className="text-xs sm:text-sm text-[#7A5763] max-w-md mx-auto pt-1">
                  আমাদের কাস্টমার কেয়ার প্রতিনিধি শীঘ্রই আপনার নম্বরে ({phone}) ফোন করে অর্ডারটি কনফার্ম করবেন।
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF1F4] border border-[#F7D6DE] max-w-sm mx-auto text-left text-xs space-y-1 text-[#241117]">
                <div className="flex justify-between font-medium">
                  <span>প্রোডাক্ট:</span>
                  <span className="font-bold text-[#590F23]">{quickOrderProduct.banglaName || quickOrderProduct.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>সাইজ ও কালার:</span>
                  <span>{selectedSize} / {selectedColor}</span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি এলাকা:</span>
                  <span>{cityZone === 'inside_dhaka' ? 'ঢাকার ভিতরে (৳৭০)' : 'ঢাকার বাইরে (৳১৩০)'}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F7D6DE] font-bold text-sm text-[#590F23]">
                  <span>মোট প্রদেয় টাকা:</span>
                  <span>৳ {grandTotal.toLocaleString()} (ক্যাশ)</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={closeQuickOrder}
                  className="px-6 py-2.5 rounded-full bg-[#590F23] text-white font-medium text-xs sm:text-sm hover:bg-[#721631] transition-all shadow-md"
                >
                  আরও কেনাকাটা করুন
                </button>
                <button
                  onClick={handleMessengerOrder}
                  className="px-6 py-2.5 rounded-full bg-[#FAF1F4] hover:bg-[#F7D6DE] text-[#590F23] font-medium text-xs sm:text-sm border border-[#F7D6DE] transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>মেসেঞ্জারে নক দিন</span>
                </button>
              </div>
            </div>
          ) : (
            /* Order Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product Preview Card */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF1F4] border border-[#F7D6DE]/80">
                <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-[#F7D6DE]">
                  <Image
                    src={quickOrderProduct.images[0]}
                    alt={quickOrderProduct.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-sm text-[#241117] truncate">
                    {quickOrderProduct.banglaName || quickOrderProduct.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-sm font-bold text-[#590F23]">
                      ৳ {quickOrderProduct.price.toLocaleString()}
                    </span>
                    {quickOrderProduct.originalPrice && (
                      <span className="text-xs text-[#7A5763] line-through">
                        ৳ {quickOrderProduct.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] text-[#7A5763]">পরিমাণ:</span>
                    <div className="flex items-center border border-[#F7D6DE] bg-white rounded-lg px-1.5 py-0.5">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="text-xs px-1 text-[#590F23] font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs px-2 font-semibold text-[#241117]">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="text-xs px-1 text-[#590F23] font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Size & Color Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#241117] mb-1.5">
                    সাইজ বেছে নিন:
                  </label>
                  <div className="flex gap-1.5 flex-wrap">
                    {quickOrderProduct.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all ${
                          selectedSize === s
                            ? 'bg-[#590F23] text-white shadow-xs'
                            : 'bg-[#FAF1F4] text-[#241117] hover:bg-[#F7D6DE] border border-[#F7D6DE]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241117] mb-1.5">
                    কালার:
                  </label>
                  <div className="flex gap-1.5 flex-wrap">
                    {quickOrderProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-xl font-medium transition-all border ${
                          selectedColor === c.name
                            ? 'border-[#590F23] bg-[#FAF1F4] text-[#590F23] font-bold shadow-xs'
                            : 'border-[#F7D6DE] bg-white text-[#7A5763]'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Delivery Zone Selection (Inside / Outside Dhaka) */}
              <div>
                <label className="block text-xs font-semibold text-[#241117] mb-1.5">
                  ডেলিভারি এলাকা নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCityZone('inside_dhaka')}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                      cityZone === 'inside_dhaka'
                        ? 'border-[#590F23] bg-[#FAF1F4] ring-1 ring-[#590F23]'
                        : 'border-[#F7D6DE] bg-white hover:bg-[#FAF1F4]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-[#241117]">ঢাকার ভিতরে</p>
                      <p className="text-[11px] text-[#7A5763]">হোম ডেলিভারি</p>
                    </div>
                    <span className="text-xs font-bold text-[#590F23]">৳ ৭০</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCityZone('outside_dhaka')}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                      cityZone === 'outside_dhaka'
                        ? 'border-[#590F23] bg-[#FAF1F4] ring-1 ring-[#590F23]'
                        : 'border-[#F7D6DE] bg-white hover:bg-[#FAF1F4]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-[#241117]">ঢাকার বাইরে</p>
                      <p className="text-[11px] text-[#7A5763]">সারা বাংলাদেশ</p>
                    </div>
                    <span className="text-xs font-bold text-[#590F23]">৳ ১৩০</span>
                  </button>
                </div>
              </div>

              {/* Customer Info Fields */}
              <div className="space-y-3">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#241117] mb-1">
                    আপনার নাম (Full Name) *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A5763]" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="যেমন: তানজিলা ইসলাম"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#F7D6DE] rounded-xl text-xs sm:text-sm text-[#241117] focus:outline-none focus:border-[#590F23] focus:ring-1 focus:ring-[#590F23]"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-[#241117] mb-1">
                    মোবাইল নম্বর (১১ ডিজিট) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A5763]" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      maxLength={11}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#F7D6DE] rounded-xl text-xs sm:text-sm text-[#241117] focus:outline-none focus:border-[#590F23] focus:ring-1 focus:ring-[#590F23]"
                    />
                  </div>
                </div>

                {/* Full Delivery Address */}
                <div>
                  <label className="block text-xs font-semibold text-[#241117] mb-1">
                    সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা/জেলা) *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#7A5763]" />
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="যেমন: বাসা ১২, রোড ৪, সেক্টর ৭, উত্তরা, ঢাকা"
                      className="w-full pl-10 pr-3.5 py-2 bg-white border border-[#F7D6DE] rounded-xl text-xs sm:text-sm text-[#241117] focus:outline-none focus:border-[#590F23] focus:ring-1 focus:ring-[#590F23]"
                    />
                  </div>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-3.5 rounded-2xl bg-[#FAF1F4] border border-[#F7D6DE] space-y-1 text-xs text-[#241117]">
                <div className="flex justify-between">
                  <span className="text-[#7A5763]">পণ্যের দাম:</span>
                  <span>৳ {itemTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A5763]">ডেলিভারি চার্জ:</span>
                  <span>৳ {deliveryFee}</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-[#F7D6DE] font-bold text-sm text-[#590F23]">
                  <span>সর্বমোট প্রদেয় (ক্যাশ অন ডেলিভারি):</span>
                  <span>৳ {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Badge Note */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>পণ্য হাতে পেয়ে চেক করে সম্পূর্ণ মূল্য পরিশোধ করতে পারবেন।</span>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-rose-50 text-[#590F23] border border-rose-200 text-xs text-center font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-[#590F23] hover:bg-[#721631] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 disabled:opacity-75 cursor-pointer tiara-pulse-ring"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>অর্ডার প্রসেস হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Truck className="w-5 h-5 text-[#E7BA83]" />
                      <span>অর্ডার নিশ্চিত করুন (৳ {grandTotal.toLocaleString()})</span>
                    </>
                  )}
                </button>

                {/* WhatsApp & Messenger Quick Option */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>হোয়াটসঅ্যাপে অর্ডার</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleMessengerOrder}
                    className="py-2 px-3 rounded-xl bg-[#0084FF] hover:bg-[#0070D6] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>মেসেঞ্জারে অর্ডার</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
