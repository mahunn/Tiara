'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle, 
  MessageCircle, 
  Phone, 
  Copy, 
  Check, 
  ExternalLink, 
  Trash2, 
  Lock, 
  Printer, 
  ChevronRight,
  Filter,
  DollarSign,
  Package,
  Calendar,
  MapPin,
  User,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { Order } from '@/types';
import { MESSENGER_URL } from '@/lib/mockData';
import { formatMessengerOrderText } from '@/lib/messengerFormat';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  
  // Modal for Messenger Confirmation Preview
  const [activeMessengerOrder, setActiveMessengerOrder] = useState<Order | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 1. Check server-side session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/admin/session');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Session check failed:', err);
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPasswordInput('');
        showToast('এডমিন প্যানেলে স্বাগতম!');
      } else {
        setLoginError(data.error || 'ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন।');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('সার্ভারে যোগাযোগ করা যায়নি। পুনরায় চেষ্টা করুন।');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    }
    setIsAuthenticated(false);
    showToast('লগআউট সফল হয়েছে');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/orders');
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  // Auto refresh interval
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh) return;
    const interval = setInterval(() => {
      fetchOrders();
    }, 15000);
    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh]);

  // Update order status
  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        showToast(`অর্ডার #${orderId} স্ট্যাটাস আপডেট হয়েছে!`);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Delete order
  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm(`আপনি কি নিশ্চিত যে #${orderId} অর্ডারটি মুছে ফেলতে চান?`)) return;
    try {
      const res = await fetch(`/api/orders?id=${orderId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
        showToast(`অর্ডার #${orderId} সফলভাবে মুছে ফেলা হয়েছে`);
      }
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  // Open Messenger with Order Details copied
  const handleOpenMessenger = (order: Order) => {
    const text = formatMessengerOrderText(order, false);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 3500);
    }
    setActiveMessengerOrder(order);
    showToast('মেসেঞ্জার কনফার্মেশন টেক্সট কপি হয়েছে!');
  };

  // Copy text manually
  const handleCopyText = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(true);
      showToast('টেক্সট ক্লিপবোর্ডে কপি হয়েছে!');
      setTimeout(() => setCopiedText(false), 3500);
    }
  };

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery) ||
      order.customer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((i) => i.productName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesZone = zoneFilter === 'all' || order.customer.cityZone === zoneFilter;

    return matchesSearch && matchesStatus && matchesZone;
  });

  // KPI calculations
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending' || !o.status).length;
  const confirmedOrders = orders.filter((o) => o.status === 'confirmed').length;
  const shippedOrders = orders.filter((o) => o.status === 'shipped').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  // Show loading spinner while checking session
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen tiara-bg-pattern flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#590F23] animate-spin" />
          <p className="text-xs text-[#7A5763] font-medium">এডমিন সেশন যাচাই করা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // If not logged in, show sleek login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen tiara-bg-pattern flex items-center justify-center p-4">
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#F7D6DE] shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#FAF1F4] text-[#590F23] flex items-center justify-center mx-auto border border-[#F7D6DE] shadow-xs">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#590F23]">TIARA অ্যাডমিন পোর্টাল</h2>
            <p className="text-xs text-[#7A5763] mt-1">অর্ডার ড্যাশবোর্ড ও ফেসবুক মেসেঞ্জার নিশ্চিতকরণ</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-[#241117] block">
                এডমিন পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setLoginError('');
                  }}
                  autoFocus
                  placeholder="পাসওয়ার্ড লিখুন (ডিফল্ট: tiara2026)"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#F7D6DE] bg-[#FAF1F4]/40 focus:border-[#590F23] focus:ring-2 focus:ring-[#590F23]/20 outline-none transition-all pr-11 text-[#241117]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5763] hover:text-[#590F23] p-1 cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginError && (
                <p className="text-xs text-rose-600 font-medium pt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{loginError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoggingIn || !passwordInput.trim()}
              className="w-full py-3.5 rounded-xl bg-[#590F23] hover:bg-[#721631] disabled:opacity-60 text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>যাচাই করা হচ্ছে...</span>
                </>
              ) : (
                <span>লগইন করুন</span>
              )}
            </button>
          </form>

          <div className="pt-2 flex flex-col gap-2">
            <p className="text-[11px] text-[#7A5763]">
              🔑 ডিফল্ট পাসওয়ার্ড: <code className="bg-[#FAF1F4] px-1.5 py-0.5 rounded text-[#590F23] font-mono">tiara2026</code> (প্রয়োজনে .env ফাইলে পরিবর্তন করতে পারেন)
            </p>
            <Link href="/" className="text-xs text-[#7A5763] hover:text-[#590F23] underline font-medium">
              ← ওয়েবসাইটে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F8] pb-16">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#241117] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs animate-slideUp">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-white border-b border-[#F7D6DE] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-serif text-xl sm:text-2xl font-black tracking-widest text-[#590F23]">
              TIARA
            </Link>
            <span className="text-xs bg-[#FAF1F4] text-[#590F23] font-bold px-2.5 py-0.5 rounded-full border border-[#F7D6DE]">
              অর্ডার ড্যাশবোর্ড
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`text-xs px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                autoRefresh 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-gray-100 text-gray-500 border-gray-200'
              }`}
              title="স্বয়ংক্রিয় রিফ্রেশ অন/অফ"
            >
              <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
              <span className="hidden sm:inline">{autoRefresh ? 'লাইভ মোড চালু' : 'লাইভ বন্ধ'}</span>
            </button>

            <button
              onClick={fetchOrders}
              disabled={isLoading}
              className="p-2 rounded-xl border border-[#F7D6DE] bg-white hover:bg-[#FAF1F4] text-[#590F23] transition-all cursor-pointer"
              title="রিফ্রেশ করুন"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-[#590F23] hover:underline"
            >
              ওয়েবসাইট দেখুন <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs text-[#7A5763] hover:text-rose-600 px-2 py-1 transition-colors cursor-pointer"
            >
              লগআউট
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#F7D6DE] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#7A5763] font-medium">মোট অর্ডার</p>
              <h3 className="text-2xl font-serif font-bold text-[#241117] mt-0.5">{totalOrders}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#FAF1F4] text-[#590F23] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-700 font-medium">অপেক্ষমান অর্ডার</p>
              <h3 className="text-2xl font-serif font-bold text-amber-700 mt-0.5">{pendingOrders}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-emerald-700 font-medium">নিশ্চিত অর্ডার</p>
              <h3 className="text-2xl font-serif font-bold text-emerald-700 mt-0.5">{confirmedOrders}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#F7D6DE] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs text-[#7A5763] font-medium">মোট ক্যাশ অন ডেলিভারি</p>
              <h3 className="text-2xl font-serif font-bold text-[#590F23] mt-0.5">৳{totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#FAF1F4] text-[#590F23] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#F7D6DE] shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#7A5763] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="অর্ডার আইডি, ক্রেতার নাম, ফোন নম্বর বা ঠিকানা দিয়ে খুঁজুন..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#F7D6DE] focus:border-[#590F23] focus:ring-1 focus:ring-[#590F23] outline-none"
              />
            </div>

            {/* Zone Filter */}
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#F7D6DE] bg-white text-[#241117] outline-none"
            >
              <option value="all">সব ডেলিভারি এলাকা</option>
              <option value="chandpur">চাঁদপুর সদর (৫০৳)</option>
              <option value="dhaka">ঢাকা সিটি (১২০৳)</option>
              <option value="outside_dhaka">সারা বাংলাদেশ (১৩০৳)</option>
            </select>
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {[
              { id: 'all', label: 'সকল অর্ডার', count: totalOrders },
              { id: 'pending', label: '⏳ অপেক্ষমান', count: pendingOrders },
              { id: 'confirmed', label: '✅ নিশ্চিত', count: confirmedOrders },
              { id: 'shipped', label: '🚚 ডেলিভারিতে আছে', count: shippedOrders },
              { id: 'delivered', label: '🎉 সম্পন্ন', count: orders.filter((o) => o.status === 'delivered').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-[#590F23] text-white shadow-xs'
                    : 'bg-[#FAF1F4] text-[#7A5763] hover:bg-[#F7D6DE]'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Orders Listing */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-[#F7D6DE] text-center space-y-3">
            <ShoppingBag className="w-12 h-12 text-[#7A5763]/50 mx-auto" />
            <h4 className="font-serif text-lg font-bold text-[#241117]">কোনো অর্ডার পাওয়া যায়নি</h4>
            <p className="text-xs text-[#7A5763]">সার্চ ফিল্টার পরিবর্তন করুন অথবা নতুন অর্ডারের জন্য অপেক্ষা করুন।</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const zoneLabel = 
                order.customer.cityZone === 'chandpur'
                  ? 'চাঁদপুর সদর (৫০৳)'
                  : order.customer.cityZone === 'dhaka'
                  ? 'ঢাকা সিটি (১২০৳)'
                  : 'সারা বাংলাদেশ (১৩০৳)';

              const statusColor = 
                order.status === 'confirmed' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : order.status === 'shipped'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : order.status === 'delivered'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : order.status === 'cancelled'
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200';

              const cleanPhone = order.customer.phone.replace(/\D/g, '');

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F7D6DE] shadow-sm space-y-4 hover:shadow-md transition-shadow"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F7D6DE]/60">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-sm font-bold text-[#590F23] bg-[#FAF1F4] px-3 py-1 rounded-full border border-[#F7D6DE]">
                        #{order.id}
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                        {order.status === 'confirmed' ? '✅ নিশ্চিত' :
                         order.status === 'shipped' ? '🚚 ডেলিভারিতে আছে' :
                         order.status === 'delivered' ? '🎉 সম্পন্ন' :
                         order.status === 'cancelled' ? '❌ বাতিল' : '⏳ অপেক্ষমান'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#7A5763]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {order.createdAt ? new Date(order.createdAt).toLocaleString('bn-BD', {
                          day: 'numeric',
                          month: 'short',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        }) : 'আজ'}
                      </span>
                      <button
                        onClick={() => handleDeleteOrder(order.id!)}
                        className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                        title="অর্ডার ডিলিট করুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Order Main Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    
                    {/* 1. Customer Information */}
                    <div className="p-3.5 rounded-2xl bg-[#FAF6F8] border border-[#F7D6DE]/70 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-[#241117] pb-1 border-b border-[#F7D6DE]/50">
                        <User className="w-3.5 h-3.5 text-[#590F23]" />
                        <span>ক্রেতার বিবরণ</span>
                      </div>
                      <div>
                        <span className="text-[#7A5763]">নাম: </span>
                        <strong className="text-[#241117]">{order.customer.fullName}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[#7A5763]">মোবাইল: </span>
                          <strong className="text-[#590F23]">{order.customer.phone}</strong>
                        </div>
                        <div className="flex items-center gap-1">
                          <a
                            href={`tel:${order.customer.phone}`}
                            className="p-1 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            title="সরাসরি কল দিন"
                          >
                            <Phone className="w-3 h-3" />
                          </a>
                          <button
                            onClick={() => handleCopyText(order.customer.phone)}
                            className="p-1 rounded-lg bg-white border border-[#F7D6DE] text-[#7A5763] hover:bg-[#FAF1F4]"
                            title="ফোন নম্বর কপি করুন"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <span className="text-[#7A5763]">ঠিকানা: </span>
                        <span className="text-[#241117]">{order.customer.address}</span>
                      </div>
                      <div>
                        <span className="text-[#7A5763]">এলাকা: </span>
                        <span className="font-semibold text-[#590F23]">{zoneLabel}</span>
                      </div>
                    </div>

                    {/* 2. Products & Variation Info */}
                    <div className="p-3.5 rounded-2xl bg-white border border-[#F7D6DE]/70 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-[#241117] pb-1 border-b border-[#F7D6DE]/50">
                        <Package className="w-3.5 h-3.5 text-[#590F23]" />
                        <span>অর্ডারকৃত পণ্য ও ভ্যারিয়েন্ট</span>
                      </div>
                      <div className="space-y-2.5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-2.5 items-center">
                            {item.image && (
                              <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-[#FAF1F4] flex-shrink-0 border border-[#F7D6DE]">
                                <Image src={item.image} alt={item.productName} fill className="object-cover object-top" sizes="48px" />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <h5 className="font-bold text-[#241117] truncate">{item.productName}</h5>
                              <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                                <span className="px-2 py-0.5 rounded-md bg-[#FAF1F4] border border-[#F7D6DE] text-[10px] font-bold text-[#590F23]">
                                  কালার: {item.color}
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-medium text-[#241117]">
                                  সাইজ: {item.size}
                                </span>
                              </div>
                              <div className="text-[11px] text-[#7A5763] mt-0.5">
                                {item.quantity}টি × ৳{item.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Pricing & Status Actions */}
                    <div className="p-3.5 rounded-2xl bg-[#FAF6F8] border border-[#F7D6DE]/70 text-xs flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between pb-1 border-b border-[#F7D6DE]/50 font-bold text-[#241117]">
                          <span>বিলিং বিবরণ</span>
                          <span>ক্যাশ অন ডেলিভারি</span>
                        </div>
                        <div className="space-y-1 pt-1.5">
                          <div className="flex justify-between text-[#7A5763]">
                            <span>সাবটোটাল:</span>
                            <span>৳{order.subtotal?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-[#7A5763]">
                            <span>ডেলিভারি চার্জ:</span>
                            <span>৳{order.deliveryFee?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-bold text-sm text-[#590F23] pt-1 border-t border-[#F7D6DE]/60">
                            <span>মোট প্রদেয়:</span>
                            <span>৳{order.total?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Selector Dropdown */}
                      <div className="pt-3">
                        <label className="text-[10px] font-bold text-[#7A5763] block mb-1">স্ট্যাটাস পরিবর্তন করুন:</label>
                        <select
                          value={order.status || 'pending'}
                          onChange={(e) => handleUpdateStatus(order.id!, e.target.value as Order['status'])}
                          className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#F7D6DE] bg-white font-semibold outline-none"
                        >
                          <option value="pending">⏳ অপেক্ষমান (Pending)</option>
                          <option value="confirmed">✅ নিশ্চিত (Confirmed)</option>
                          <option value="shipped">🚚 ডেলিভারিতে আছে (Shipped)</option>
                          <option value="delivered">🎉 সম্পন্ন (Delivered)</option>
                          <option value="cancelled">❌ বাতিল (Cancelled)</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  {/* Actions Bar: Messenger Confirmation + WhatsApp + Call */}
                  <div className="pt-2 border-t border-[#F7D6DE]/60 flex flex-col sm:flex-row gap-2 justify-between items-center">
                    
                    {/* Left: Quick Confirmation Text Copy Button */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleOpenMessenger(order)}
                        className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-[#0084FF] hover:bg-[#0070D6] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>মেসেঞ্জারে ইনবক্স করুন (অর্ডার তথ্যসহ)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopyText(formatMessengerOrderText(order, false))}
                        className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#FAF1F4] text-[#590F23] border border-[#F7D6DE] font-semibold text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                        title="মেসেঞ্জার টেক্সট কপি করুন"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>কপি টেক্সট</span>
                      </button>
                    </div>

                    {/* Right: WhatsApp & Phone Quick Links */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <a
                        href={`https://wa.me/88${cleanPhone}?text=${encodeURIComponent(formatMessengerOrderText(order, false))}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-initial py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        title="হোয়াটসঅ্যাপে পাঠান"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>হোয়াটসঅ্যাপ</span>
                      </a>

                      <a
                        href={`tel:${order.customer.phone}`}
                        className="py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#241117] font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>কল দিন</span>
                      </a>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Messenger Confirmation Details Modal */}
      {activeMessengerOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#F7D6DE] overflow-hidden my-auto p-5 sm:p-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#F7D6DE]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0084FF] text-white flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#241117] text-sm sm:text-base">
                    মেসেঞ্জার কনফার্মেশন মেসেজ
                  </h4>
                  <p className="text-[11px] text-[#7A5763]">
                    অর্ডার #{activeMessengerOrder.id} • {activeMessengerOrder.customer.fullName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveMessengerOrder(null)}
                className="p-1 rounded-full text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Formatted Message Box */}
            <div className="relative p-3.5 rounded-2xl bg-[#FAF1F4] border border-[#F7D6DE] text-xs text-[#241117] whitespace-pre-wrap font-sans max-h-60 overflow-y-auto">
              {formatMessengerOrderText(activeMessengerOrder, false)}
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>সম্পূর্ণ মেসেজটি কপি করা হয়েছে! ফেসবুক মেসেঞ্জারে গিয়ে পেস্ট (Paste) করুন।</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#0084FF] hover:bg-[#0070D6] text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>ফেসবুক মেসেঞ্জার খুলুন</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  handleUpdateStatus(activeMessengerOrder.id!, 'confirmed');
                  setActiveMessengerOrder(null);
                }}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>অর্ডার নিশ্চিত করুন</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
