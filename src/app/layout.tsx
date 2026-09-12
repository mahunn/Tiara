import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import MessengerWidget from '@/components/MessengerWidget';
import QuickOrderModal from '@/components/QuickOrderModal';
import CartDrawer from '@/components/CartDrawer';
import CategoryDrawer from '@/components/CategoryDrawer';
import QuickViewModal from '@/components/QuickViewModal';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TIARA | প্রিমিয়াম আবায়া, গাউন ও শালীন ফ্যাশন কালেকশন',
  description: 'TIARA - এক্সক্লুসিভ দুবাই চেরি সিল্ক আবায়া, ফেস্টিভ গাউন এবং ফ্রেঞ্চ শিফন খিমার। সারা বাংলাদেশে দ্রুত ক্যাশ অন ডেলিভারি।',
  keywords: 'TIARA, Abaya Bangladesh, Borka, Hijab, Khimar, Modest Fashion, Eid Collection, ক্যাশ অন ডেলিভারি বোরকা',
  openGraph: {
    title: 'TIARA | Luxury Modest Fashion Bangladesh',
    description: 'প্রিমিয়াম শালীন ফ্যাশন ও এক্সক্লুসিভ কারচুপি আবায়া কালেকশন।',
    url: 'https://tiara.com.bd',
    siteName: 'TIARA',
    images: [
      {
        url: '/images/tiara-cover.png',
        width: 1200,
        height: 630,
        alt: 'TIARA Modest Fashion',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased text-[#241117] bg-[#FAF1F4] flex flex-col min-h-screen selection:bg-[#F7D6DE] selection:text-[#590F23]">
        <StoreProvider>
          {/* Main Top Header with Announcement */}
          <Header />

          {/* Dynamic Page Content */}
          <main className="flex-1 pb-16 sm:pb-0">{children}</main>

          {/* Luxury Brand Footer */}
          <Footer />

          {/* Mobile Bottom Navigation (Home, Category, Cart, Messenger) */}
          <BottomNav />

          {/* Desktop Floating Messenger Button */}
          <MessengerWidget />

          {/* Interactive Drawers & Modals */}
          <QuickOrderModal />
          <CartDrawer />
          <CategoryDrawer />
          <QuickViewModal />
        </StoreProvider>
      </body>
    </html>
  );
}
