# 🌸 TIARA — Luxury Modest Fashion E-Commerce Website

<div align="center">
  <img src="public/images/tiara-cover.png" alt="TIARA Cover Banner" width="100%" />
</div>

<p align="center">
  <b>TIARA</b> is an elegant, high-conversion modest fashion e-commerce platform tailored specifically for Bangladeshi clients. Built with <b>Next.js (App Router)</b>, <b>TypeScript</b>, <b>React</b>, <b>Tailwind CSS</b>, and <b>Supabase</b>.
</p>

---

## ✨ Key Features

### 🛍️ Tailored for Bangladeshi Customers
- **1-Click "সরাসরি অর্ডার করুন" (Direct Cash on Delivery)**: Frictionless ordering modal requiring only **Name**, **11-digit Phone Number**, and **Delivery Address**.
- **Automated Delivery Fee Calculation**:
  - ঢাকার ভিতরে (Inside Dhaka): **৳ ৭০**
  - ঢাকার বাইরে (Outside Dhaka): **৳ ১৩০**
  - **Free Delivery** on orders of ৳ 3,000 or more.
- **Direct WhatsApp & Messenger Ordering**: Customers can order via Messenger (`m.me/tiarabd`) or WhatsApp with pre-filled product details.
- **Bangladeshi Sizing & BDT Currency**: Modest fashion sizing (`52`, `54`, `56`) and clear BDT (`৳`) pricing with strike-through discounts.

### 🎨 Brand Identity & Aesthetics
- **Palette**: Deep Royal Burgundy (`#590F23`), Hover Wine (`#721631`), Petal Pink (`#FAF1F4`, `#F7D6DE`), and Rose Gold (`#C68E4D`).
- **Floral Damask Watermark**: Handcrafted SVG texture (`public/images/floral-pattern.svg`) matching the brand's horizontal banner applied subtly across backgrounds, banners, and footer.
- **Typography**: Cormorant Garamond serif for luxury titles and Plus Jakarta Sans for clean legibility.

### 📱 Layout & Navigation (Inspired by Anzaar Lifestyle)
- **Top Announcement Bar**: Nationwide Cash on Delivery notices and helpline.
- **Hero Slider**: Interactive carousel showcasing brand banners and seasonal collections.
- **Circular Category Pills**: Quick navigation for Abayas, Festive Gowns, Khimars, Co-ords, and Accessories.
- **Watch & Shop**: Video reels showcase with views count and direct "অর্ডার করুন" buttons.
- **Mobile Bottom Navigation**:
  1. **Home (হোম)**
  2. **Category (ক্যাটাগরি)**
  3. **Cart (ব্যাগ)**
  4. **Facebook / Messenger (মেসেঞ্জার)** anchored in the bottom right.
- **Desktop Floating Messenger Widget**: Direct customer care bubble in bottom right.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling**: [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [Supabase](https://supabase.com/) (with ready-to-run `supabase_schema.sql` and graceful fallback)
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🗄️ Supabase Database Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** -> **New Query**, paste the contents of [`supabase_schema.sql`](supabase_schema.sql), and click **Run**.
3. Copy your project URL and anon public key into `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_MESSENGER_URL=https://m.me/tiarabd
NEXT_PUBLIC_WHATSAPP_NUMBER=8801700000000
```

---

## 📦 Deployment on Vercel

1. Push your repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add your environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Click **Deploy**.

---

© 2026 **TIARA**. All Rights Reserved.
