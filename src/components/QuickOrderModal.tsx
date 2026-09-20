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
  Loader2,
  Check,
  Copy,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '@/lib/store';
import { saveOrder } from '@/lib/supabase';
import { Order, DeliveryZone } from '@/types';
import { FB_PROFILE_URL, MESSENGER_URL } from '@/lib/mockData';

export default function QuickOrderModal() {
  const { quickOrderProduct, quickOrderOptions, closeQuickOrder } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cityZone, setCityZone] = useState<DeliveryZone>('chandpur');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ orderId: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [copiedMessage, setCopiedMessage] = useState(false);

  React.useEffect(() => {
    if (quickOrderProduct) {
      setSelectedSize(quickOrderOptions.size || quickOrderProduct.sizes[0] || 'ফ্রি সাইজ');
      setSelectedColor(quickOrderOptions.color || quickOrderProduct.colors[0]?.name || 'স্ট্যান্ডার্ড');
      setOrderSuccess(null);
      setErrorMsg('');
      setCopiedMessage(false);
    }
  }, [quickOrderProduct, quickOrderOptions]);

  if (!quickOrderProduct) return null;

  // Delivery fee calculation according to client specifications:
  // চাঁদপুরে ৫০ টাকা {চাঁদপুর সদর}
  // ঢাকায় ১২০ টাকা
  // সারা বাংলাদেশ ১৩০ টাকা
  const getDeliveryFee = (zone: DeliveryZone) => {
    switch (zone) {
      case 'chandpur':
        return 50;
      case 'dhaka':
        return 120;
      case 'outside_dhaka':
      default:
        return 130;
    }
  };

  const selectedColorObj = quickOrderProduct.colors.find((c) => c.name === selectedColor);
  const activePrice = selectedColorObj?.price || quickOrderProduct.price;
  const activeOriginalPrice = selectedColorObj?.originalPrice || quickOrderProduct.originalPrice;

  const deliveryFee = getDeliveryFee(cityZone);
  const itemTotal = activePrice * quantity;
  const grandTotal = itemTotal + deliveryFee;

  const getMessengerText = (orderId: string) => {
    const zoneName = 
      cityZone === 'chandpur' 
        ? 'চাঁদপুর সদর (৫০৳)' 
        : cityZone === 'dhaka' 
        ? 'ঢাকা সিটি (১২০৳)' 
        : 'সারা বাংলাদেশ (১৩০৳)';

    return (
      `🌸 TIARA ক্যাশ অন ডেলিভারি অর্ডার 🌸\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `অর্ডার আইডি: #${orderId}\n` +
      `নাম: ${fullName.trim()}\n` +
      `মোবাইল: ${phone.trim()}\n` +
      `ঠিকানা: ${address.trim()}\n` +
      `ডেলিভারি এলাকা: ${zoneName}\n\n` +
      `• পণ্য: ${quickOrderProduct.banglaName || quickOrderProduct.name}\n` +
      `  কালার: ${selectedColor}\n` +
      `  সাইজ: ${selectedSize}\n` +
      `  পরিমাণ: ${quantity}টি\n` +
      `  মূল্য: ৳${activePrice.toLocaleString()}\n\n` +
      `ডেলিভারি চার্জ: ৳${deliveryFee}\n` +
      `মোট প্রদেয় টাকা: ৳${grandTotal.toLocaleString()} (ক্যাশ অন ডেলিভারি)\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `আমি এই অর্ডারটি কনফার্ম করতে চাই।`
    );
  };

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
      setErrorMsg('অনুগ্রহ করে সম্পূর্ণ ঠিকানা লিখুন (যেমন: বাড়ি/রোড/এলাকা)');
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
          price: activePrice,
          image: selectedColorObj?.image || quickOrderProduct.images[0],
        },
      ],
      subtotal: itemTotal,
      deliveryFee,
      total: grandTotal,
      paymentMethod: 'cash_on_delivery',
      status: 'pending',
    };

    let generatedOrderId = `TR-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const apiRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
      const data = await apiRes.json();
      if (data.success && data.orderId) {
        generatedOrderId = data.orderId;
      }
    } catch (e) {
      console.warn('API error, falling back to local storage:', e);
      const res = await saveOrder(newOrder);
      if (res.orderId) generatedOrderId = res.orderId;
    }

    setIsSubmitting(false);
    setOrderSuccess({ orderId: generatedOrderId });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#590F23', '#F7D6DE', '#C68E4D', '#B8A4C9', '#A3C4BC'],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleMessengerOrder = () => {
    if (!orderSuccess) return;
    const text = getMessengerText(orderSuccess.orderId);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedMessage(true);
    }
    setTimeout(() => {
      window.open(MESSENGER_URL, '_blank');
    }, 300);
  };

  const handleCopyOnly = () => {
    if (!orderSuccess) return;
    const text = getMessengerText(orderSuccess.orderId);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 4000);
    }
  };

  const handleWhatsAppOrder = () => {
    if (!orderSuccess) return;
    const text = getMessengerText(orderSuccess.orderId);
    window.open(`https://wa.me/8801700000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#F7D6DE] overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#FAF1F4] to-[#F8DAE1] border-b border-[#F7D6DE]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#590F23] animate-pulse"></span>
            <h3 className="font-serif font-bold text-[#590F23] text-base sm:text-lg">
              সরাসরি অর্ডার করুন (ক্যাশ অন ডেলিভারি)
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
            <div className="text-center py-5 sm:py-7 space-y-4 animate-scaleUp">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-xs">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <span className="inline-block px-3 py-1 bg-[#FAF1F4] text-[#590F23] text-xs font-bold rounded-full border border-[#F7D6DE]">
                  অর্ডার আইডি: #{orderSuccess.orderId}
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#241117] pt-1.5">
                  ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে
                </h4>
                <p className="text-xs sm:text-sm text-[#7A5763] max-w-md mx-auto">
                  আমাদের প্রতিনিধি শীঘ্রই আপনার নম্বরে (<span className="font-semibold text-[#241117]">{phone}</span>) কল করে ডেলিভারির তারিখ ও ঠিকানা নিশ্চিত করবেন।
                </p>
              </div>

              {/* Order Summary Card with Complete Details */}
              <div className="p-4 rounded-2xl bg-[#FAF1F4] border border-[#F7D6DE] max-w-md mx-auto text-left text-xs space-y-1.5 text-[#241117]">
                <div className="flex justify-between font-medium">
                  <span className="text-[#7A5763]">পণ্য:</span>
                  <span className="font-bold text-[#590F23]">{quickOrderProduct.banglaName || quickOrderProduct.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A5763]">কালার / ভ্যারিয়েন্ট:</span>
                  <span className="font-semibold">{selectedColor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A5763]">সাইজ:</span>
                  <span>{selectedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A5763]">ক্রেতার নাম:</span>
                  <span>{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A5763]">ঠিকানা:</span>
                  <span className="truncate max-w-[220px] text-right">{address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A5763]">ডেলিভারি এলাকা:</span>
                  <span>
                    {cityZone === 'chandpur' 
                      ? 'চাঁদপুর সদর (৫০৳)' 
                      : cityZone === 'dhaka' 
                      ? 'ঢাকা সিটি (১২০৳)' 
                      : 'সারা বাংলাদেশ (১৩০৳)'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F7D6DE] font-bold text-sm text-[#590F23]">
                  <span>মোট প্রদেয় টাকা:</span>
                  <span>৳ {grandTotal.toLocaleString()} (ক্যাশ অন ডেলিভারি)</span>
                </div>
              </div>

              {/* Copied Alert Toast */}
              {copiedMessage && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-center gap-2 max-w-md mx-auto animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>অর্ডারের সকল তথ্য কপি হয়েছে! মেসেঞ্জারে গিয়ে পেস্ট (Paste) করে পাঠিয়ে দিন।</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
                <button
                  type="button"
                  onClick={handleMessengerOrder}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#0084FF] hover:bg-[#0070D6] text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>মেসেঞ্জারে ইনবক্স করুন</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyOnly}
                  className="py-3 px-4 rounded-xl bg-white hover:bg-[#FAF1F4] text-[#590F23] border border-[#F7D6DE] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-98 cursor-pointer"
                  title="অর্ডার বিবরণ কপি করুন"
                >
                  {copiedMessage ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedMessage ? 'কপি হয়েছে' : 'তথ্য কপি করুন'}</span>
                </button>
              </div>

              <div className="pt-1 flex items-center justify-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1 underline cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>হোয়াটসঅ্যাপেও কনফার্মেশন পাঠাতে পারেন</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={closeQuickOrder}
                  className="text-xs text-[#7A5763] hover:text-[#590F23] underline"
                >
                  আরও পণ্য দেখুন
                </button>
              </div>
            </div>
          ) : (
            /* Order Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product Preview Card */}
              {(() => {
                const previewImg = quickOrderProduct.colors.find((c) => c.name === selectedColor)?.image || quickOrderProduct.images[0];
                return (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF1F4] border border-[#F7D6DE]">
                    <div className="relative w-18 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-[#F7D6DE]">
                      <Image
                        key={previewImg}
                        src={previewImg}
                        alt={quickOrderProduct.name}
                        fill
                        className="object-cover object-center transition-all duration-300 animate-fadeIn"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-sm text-[#241117] line-clamp-1">
                        {quickOrderProduct.banglaName || quickOrderProduct.name}
                      </h4>
                      <p className="text-[11px] text-emerald-700 font-medium mt-0.5 line-clamp-1">
                        ✓ {quickOrderProduct.fabric || 'প্রিমিয়াম কোয়ালিটি'}
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-base font-bold text-[#590F23]">
                          ৳ {activePrice.toLocaleString()}
                        </span>
                        {activeOriginalPrice && (
                          <span className="text-xs text-[#7A5763] line-through">
                            ৳ {activeOriginalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[11px] text-[#7A5763]">পরিমাণ:</span>
                        <div className="flex items-center border border-[#F7D6DE] bg-white rounded-lg px-2 py-0.5">
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
                );
              })()}

              {/* Color Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#241117] mb-1.5">
                  কালার পছন্দ করুন: <span className="text-[#590F23]">{selectedColor}</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {quickOrderProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl font-medium transition-all border ${
                        selectedColor === c.name
                          ? 'border-[#590F23] bg-[#FAF1F4] text-[#590F23] font-bold shadow-xs ring-1 ring-[#590F23]'
                          : 'border-[#F7D6DE] bg-white text-[#7A5763] hover:bg-[#FAF1F4]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Zone Selection (Chandpur vs Dhaka vs Outside) */}
              <div>
                <label className="block text-xs font-semibold text-[#241117] mb-1.5">
                  ডেলিভারি এলাকা নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Chandpur */}
                  <button
                    type="button"
                    onClick={() => setCityZone('chandpur')}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border text-left transition-all ${
                      cityZone === 'chandpur'
                        ? 'border-[#590F23] bg-[#FAF1F4] ring-1 ring-[#590F23]'
                        : 'border-[#F7D6DE] bg-white hover:bg-[#FAF1F4]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-[#241117]">চাঁদপুর সদর</p>
                      <p className="text-[10px] text-[#7A5763]">চাঁদপুর জেলা</p>
                    </div>
                    <span className="text-xs font-bold text-[#590F23]">৳ ৫০</span>
                  </button>

                  {/* Dhaka */}
                  <button
                    type="button"
                    onClick={() => setCityZone('dhaka')}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border text-left transition-all ${
                      cityZone === 'dhaka'
                        ? 'border-[#590F23] bg-[#FAF1F4] ring-1 ring-[#590F23]'
                        : 'border-[#F7D6DE] bg-white hover:bg-[#FAF1F4]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-[#241117]">ঢাকা সিটি</p>
                      <p className="text-[10px] text-[#7A5763]">হোম ডেলিভারি</p>
                    </div>
                    <span className="text-xs font-bold text-[#590F23]">৳ ১২০</span>
                  </button>

                  {/* Outside Dhaka */}
                  <button
                    type="button"
                    onClick={() => setCityZone('outside_dhaka')}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border text-left transition-all ${
                      cityZone === 'outside_dhaka'
                        ? 'border-[#590F23] bg-[#FAF1F4] ring-1 ring-[#590F23]'
                        : 'border-[#F7D6DE] bg-white hover:bg-[#FAF1F4]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-[#241117]">সারা বাংলাদেশ</p>
                      <p className="text-[10px] text-[#7A5763]">অন্যান্য জেলা</p>
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
                    আপনার নাম *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A5763]" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="যেমন: রাবেয়া খাতুন"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#F7D6DE] rounded-xl text-base sm:text-sm text-[#241117] focus:outline-none focus:border-[#590F23] focus:ring-1 focus:ring-[#590F23]"
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
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#F7D6DE] rounded-xl text-base sm:text-sm text-[#241117] focus:outline-none focus:border-[#590F23] focus:ring-1 focus:ring-[#590F23]"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-xs font-semibold text-[#241117] mb-1">
                    সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা/উপজেলা) *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#7A5763]" />
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="যেমন: নতুন বাজার, চাঁদপুর সদর অথবা রোড ১২, মিরপুর, ঢাকা"
                      className="w-full pl-10 pr-3.5 py-2 bg-white border border-[#F7D6DE] rounded-xl text-base sm:text-sm text-[#241117] focus:outline-none focus:border-[#590F23] focus:ring-1 focus:ring-[#590F23]"
                    />
                  </div>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-3.5 rounded-2xl bg-[#FAF1F4] border border-[#F7D6DE] space-y-1 text-xs text-[#241117]">
                <div className="flex justify-between">
                  <span className="text-[#7A5763]">পণ্যের দাম ({quantity} পিস):</span>
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
                  className="w-full py-3 rounded-2xl bg-[#590F23] hover:bg-[#721631] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 disabled:opacity-75 cursor-pointer"
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

                {/* Direct Messenger Order Option */}
                <button
                  type="button"
                  onClick={handleMessengerOrder}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#0084FF] hover:bg-[#0070D6] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>ফেসবুক মেসেঞ্জারে ইনবক্স করে অর্ডার করুন</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
