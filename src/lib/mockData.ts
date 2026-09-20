import { Category, Product } from '@/types';

export const FB_PROFILE_URL = 'https://www.facebook.com/profile.php?id=61594225684008';
export const MESSENGER_URL = 'https://m.me/61594225684008';

export const CATEGORIES: Category[] = [
  {
    id: 'hijab',
    name: 'Hijabs',
    banglaName: 'হিজাব',
    slug: 'hijab',
    image: '/images/products/hijabs/cotton-hijab-1/Main.jpg',
    description: 'প্রিমিয়াম ক্রেপ কটন টেসেল হিজাব ও খাঁটি বেক্সি বয়েল নামাজের হিজাব কালেকশন',
  },
  {
    id: 'inner-cap',
    name: 'Lace Inner Caps',
    banglaName: 'লেইস ইনার ক্যাপ',
    slug: 'inner-cap',
    image: '/images/products/inner-cap-lace.jpg',
    description: 'বাতাস চলাচল-উপযোগী প্রসারনযোগ্য লেইসের ইনার ক্যাপ',
  },
  {
    id: 'hijab-pins',
    name: 'Hijab Pins',
    banglaName: 'হিজাব পিন',
    slug: 'hijab-pins',
    image: '/images/products/hijab-pins.jpg',
    description: 'প্রিমিয়াম স্টেইনলেস স্টিল বল হেড হিজাব পিন',
  },
];

export const PRODUCTS: Product[] = [
  // --- Category: HIJAB -> SubCategory: CREPE COTTON TASSEL HIJAB (SINGLE PRODUCT WITH ALL COLORS) ---
  {
    id: 'tiara-crepe-cotton-tassel-hijab',
    name: 'Crepe Cotton Tassel Hijab',
    banglaName: 'ক্রেপ কটন টেসেল হিজাব',
    slug: 'crepe-cotton-tassel-hijab',
    category: 'hijab',
    subCategory: 'cotton-tassel',
    price: 550,
    originalPrice: 650,
    discountBadge: 'নতুন কালেকশন',
    images: [
      '/images/products/hijabs/cotton-hijab-1/Main.jpg',
      '/images/products/hijabs/cotton-hijab-1/809107193_122103017367474189_5145764325827666920_n.jpg', // কপার
      '/images/products/hijabs/cotton-hijab-1/808906212_122103017445474189_252953491325379641_n.jpg', // লাইট পার্পল
      '/images/products/hijabs/cotton-hijab-1/809287715_122103017493474189_3489721490452916852_n.jpg', // ডাস্টি স্টিল ব্লু
      '/images/products/hijabs/cotton-hijab-1/809287713_122103017541474189_9075465898999134866_n.jpg', // বার্নট অরেঞ্জ
      '/images/products/hijabs/cotton-hijab-1/809226194_122103017631474189_2087344796169135232_n.jpg', // নুড
      '/images/products/hijabs/cotton-hijab-1/809226188_122103017679474189_8239502074856793273_n.jpg', // ডার্ক অলিভ গ্রিন
      '/images/products/hijabs/cotton-hijab-1/809183973_122103017763474189_8162013407180928971_n.jpg', // লাইট পিঙ্ক
      '/images/products/hijabs/cotton-hijab-1/808929684_122103017811474189_4365912930907122933_n.jpg', // ডাস্টি ল্যাভেন্ডার
      '/images/products/hijabs/cotton-hijab-1/809876218_122103017853474189_2351211431782359701_n.jpg', // চকলেট ব্রাউন
      '/images/products/hijabs/cotton-hijab-1/809107193_122103017895474189_3647366001408501052_n.jpg', // সেজ গ্রিন
      '/images/products/hijabs/cotton-hijab-1/809386660_122103017943474189_4744208286755777131_n.jpg', // ডার্ক ব্রাউন
      '/images/products/hijabs/cotton-hijab-1/809910046_122103018075474189_2661548758024193552_n.jpg', // নেভি ব্লু
    ],
    description: 'নরম ও আরামদায়ক ১০০% খাঁটি কটন ফেব্রিকের বড় সাইজের হিজাব, সাথে প্রিমিয়াম কাঠের পুঁতি ও আকর্ষণীয় টেসেল ডিজাইন।',
    bulletPoints: [
      '১০০% খাঁটি পিওর কটন ফেব্রিক',
      'বড় সাইজ (১৯৫/৮৫ সেমি)',
      'কাঠের পুঁতি ও আকর্ষণীয় টেসেল ডিজাইন',
      '১২টি প্রিমিয়াম কালার অপশন',
      'চাঁদপুর সদর ৫০৳ | চাঁদপুরের বাহিরে ১২০৳',
      'অফার প্রাইজ: ৫৫০৳',
    ],
    fabric: '১০০% খাঁটি পিওর কটন',
    sizes: ['বড় সাইজ (১৯৫/৮৫)'],
    colors: [
      { 
        name: 'কপার (Copper)', 
        hex: '#B86B35',
        image: '/images/products/hijabs/cotton-hijab-1/809107193_122103017367474189_5145764325827666920_n.jpg'
      },
      { 
        name: 'লাইট পার্পল (Light Purple)', 
        hex: '#B497B9',
        image: '/images/products/hijabs/cotton-hijab-1/808906212_122103017445474189_252953491325379641_n.jpg'
      },
      { 
        name: 'ডাস্টি স্টিল ব্লু (Dusty Steel Blue)', 
        hex: '#5B6B7C',
        image: '/images/products/hijabs/cotton-hijab-1/809287715_122103017493474189_3489721490452916852_n.jpg'
      },
      { 
        name: 'বার্নট অরেঞ্জ (Burnt Orange)', 
        hex: '#C86432',
        image: '/images/products/hijabs/cotton-hijab-1/809287713_122103017541474189_9075465898999134866_n.jpg'
      },
      { 
        name: 'নুড (Nude)', 
        hex: '#CDB39B',
        image: '/images/products/hijabs/cotton-hijab-1/809226194_122103017631474189_2087344796169135232_n.jpg'
      },
      { 
        name: 'ডার্ক অলিভ গ্রিন (Dark Olive Green)', 
        hex: '#33432A',
        image: '/images/products/hijabs/cotton-hijab-1/809226188_122103017679474189_8239502074856793273_n.jpg'
      },
      { 
        name: 'লাইট পিঙ্ক (Light Pink)', 
        hex: '#E8BAC5',
        image: '/images/products/hijabs/cotton-hijab-1/809183973_122103017763474189_8162013407180928971_n.jpg'
      },
      { 
        name: 'ডাস্টি ল্যাভেন্ডার (Dusty Lavender)', 
        hex: '#766487',
        image: '/images/products/hijabs/cotton-hijab-1/808929684_122103017811474189_4365912930907122933_n.jpg'
      },
      { 
        name: 'চকলেট ব্রাউন (Chocolate Brown)', 
        hex: '#5A3825',
        image: '/images/products/hijabs/cotton-hijab-1/809876218_122103017853474189_2351211431782359701_n.jpg'
      },
      { 
        name: 'সেজ গ্রিন (Sage Green)', 
        hex: '#829574',
        image: '/images/products/hijabs/cotton-hijab-1/809107193_122103017895474189_3647366001408501052_n.jpg'
      },
      { 
        name: 'ডার্ক ব্রাউন (Dark Brown)', 
        hex: '#331F17',
        image: '/images/products/hijabs/cotton-hijab-1/809386660_122103017943474189_4744208286755777131_n.jpg'
      },
      { 
        name: 'নেভি ব্লু (Navy Blue)', 
        hex: '#1D2A44',
        image: '/images/products/hijabs/cotton-hijab-1/809910046_122103018075474189_2661548758024193552_n.jpg'
      },
    ],
    inStock: true,
    isFeatured: true,
    isTrending: true,
    rating: 5.0,
    reviewCount: 38,
  },

  // --- Category: HIJAB -> SubCategory: LEOPARD PRINT PLEATED HIJAB ---
  {
    id: 'tiara-leopard-print-pleated-hijab',
    name: 'Leopard Print Pleated Hijab',
    banglaName: 'লেপার্ড প্রিন্ট প্লিটেড হিজাব',
    slug: 'leopard-print-pleated-hijab',
    category: 'hijab',
    subCategory: 'leopard-pleated',
    price: 430,
    originalPrice: 500,
    discountBadge: 'নতুন কালেকশন',
    images: [
      '/images/products/hijabs/hijab-2/main1.jpg',
      '/images/products/hijabs/hijab-2/main2.jpg',
      '/images/products/hijabs/hijab-2/812281491_122105232981474189_4002699563093095095_n.jpg', // গ্রে
      '/images/products/hijabs/hijab-2/818365373_122109108261474189_5076329462444274233_n.jpg', // লাইট পিঙ্ক
      '/images/products/hijabs/hijab-2/813976079_122106609501474189_4481969818791192951_n.jpg', // ব্লু
      '/images/products/hijabs/hijab-2/813976094_122106389841474189_4925519081958406781_n.jpg', // ডার্টি ইয়েলো
      '/images/products/hijabs/hijab-2/814034503_122107470915474189_6684429904752533218_n.jpg', // ক্যামেল
    ],
    description: 'আকর্ষণীয় লেপার্ড এনিমেল প্রিন্ট ও ক্রাঞ্চ প্লিটেড ডিজাইনের বড় সাইজের হিজাব। নরম ও আরামদায়ক প্রিমিয়াম ফেব্রিক, যা সহজে সেট থাকে এবং পরলে দারুণ পরিপাটি লুক দেয়।',
    bulletPoints: [
      'প্রিমিয়াম সফট প্লিটেড ফেব্রিক',
      'সাইজ: ১৯০/৯০ সিএম',
      'আকর্ষণীয় লেপার্ড প্রিন্ট ও পরিপাটি লুক',
      '৭টি নজরকাড়া কালার অপশন',
      'ডেলিভারি চার্জ: চাঁদপুর সদর ৫০৳ | চাঁদপুরের বাহিরে ১২০৳',
      'প্রাইস: ৪৩০ টাকা',
    ],
    fabric: 'সফট প্লিটেড ফেব্রিক',
    sizes: ['বড় সাইজ (১৯০/৯০ সিএম)'],
    colors: [
      { 
        name: 'গ্রে (Grey)', 
        hex: '#7D838A',
        image: '/images/products/hijabs/hijab-2/812281491_122105232981474189_4002699563093095095_n.jpg'
      },
      { 
        name: 'লাইট পিঙ্ক (Light Pink)', 
        hex: '#E5A8B8',
        image: '/images/products/hijabs/hijab-2/818365373_122109108261474189_5076329462444274233_n.jpg'
      },
      { 
        name: 'ব্লু (Blue)', 
        hex: '#275CA8',
        image: '/images/products/hijabs/hijab-2/813976079_122106609501474189_4481969818791192951_n.jpg'
      },
      { 
        name: 'ডার্টি ইয়েলো (Dirty Yellow)', 
        hex: '#D4B843',
        image: '/images/products/hijabs/hijab-2/813976094_122106389841474189_4925519081958406781_n.jpg'
      },
      { 
        name: 'ক্যামেল (Camel)', 
        hex: '#C48B47',
        image: '/images/products/hijabs/hijab-2/814034503_122107470915474189_6684429904752533218_n.jpg'
      },
      { 
        name: 'ট্যান (Tan)', 
        hex: '#D8A878',
        image: '/images/products/hijabs/hijab-2/main2.jpg'
      },
      { 
        name: 'ডার্ক ট্যান (Dark Tan)', 
        hex: '#8C5338',
        image: '/images/products/hijabs/hijab-2/main1.jpg'
      },
    ],
    inStock: true,
    isFeatured: true,
    isTrending: true,
    rating: 5.0,
    reviewCount: 24,
  },

  // --- Category: HIJAB -> SubCategory: PRAYER HIJAB (SINGLE PRODUCT WITH ALL COLORS) ---
  {
    id: 'tiara-bexi-boil-prayer-hijab',
    name: 'Bexi Boil Prayer Hijab',
    banglaName: 'বেক্সি বয়েল নামাজের হিজাব',
    slug: 'bexi-boil-prayer-hijab',
    category: 'hijab',
    subCategory: 'prayer-hijab',
    price: 550,
    originalPrice: 650,
    discountBadge: '১০০% খাঁটি বেক্সি',
    images: [
      '/images/products/prayer-hijab-all-1.jpg',
      '/images/products/prayer-hijab-all-2.jpg',
      '/images/products/prayer-hijab-lavender.jpg',
      '/images/products/prayer-hijab-mint.jpg',
      '/images/products/prayer-hijab-peach.jpg',
    ],
    description: 'খাঁটি বেক্সি বয়েল কাপড়ে তৈরি বাতাস চলাচল-সহায়ক ও পরম আরামদায়ক নামাজের হিজাব। মাপ অনুযায়ী ফিতা দিয়ে সহজে এডজাস্টেবল ও শালীন ফুল কাভারেজ।',
    bulletPoints: [
      '১০০% খাঁটি বেক্সি বয়েল সুতি কাপড়',
      'বাতাস চলাচল-সহায়ক ও পরম আরামদায়ক',
      'মাপ অনুযায়ী ফিতা দিয়ে এডজাস্টেবল (Adjustable)',
      'ফুল কাভারেজ ও শালীন ডিজাইন',
      '১ পিস ৫৫০৳ | ৩ কালার কম্বো ১৫৫০৳',
      'চাঁদপুর সদর ৫০৳ | ঢাকা ১২০৳',
    ],
    fabric: '১০০% খাঁটি বেক্সি বয়েল সুতি',
    sizes: ['ফ্রি সাইজ (এডজাস্টেবল)'],
    colors: [
      {
        name: 'ল্যাভেন্ডার ফ্লোরাল (Lavender)',
        hex: '#B8A4C9',
        image: '/images/products/prayer-hijab-lavender.jpg',
        price: 550,
        originalPrice: 650,
      },
      {
        name: 'মিন্ট গ্রিন ফ্লোরাল (Mint Green)',
        hex: '#A3C4BC',
        image: '/images/products/prayer-hijab-mint.jpg',
        price: 550,
        originalPrice: 650,
      },
      {
        name: 'সফট পিচ ফ্লোরাল (Soft Peach)',
        hex: '#F3C4B6',
        image: '/images/products/prayer-hijab-peach.jpg',
        price: 550,
        originalPrice: 650,
      },
      {
        name: '৩ কালার কম্বো সেট (ল্যাভেন্ডার, মিন্ট, পিচ)',
        hex: '#7A5763',
        image: '/images/products/prayer-hijab-all-1.jpg',
        price: 1550,
        originalPrice: 1650,
      },
    ],
    inStock: true,
    isFeatured: true,
    isTrending: true,
    rating: 5.0,
    reviewCount: 58,
  },

  // --- Category: INNER CAP ---
  {
    id: 'tiara-lace-inner-cap',
    name: 'Breathable Lace Inner Cap',
    banglaName: 'বাতাস চলাচল-উপযোগী লেইস ইনার ক্যাপ',
    slug: 'breathable-lace-inner-cap',
    category: 'inner-cap',
    price: 80,
    originalPrice: 100,
    images: [
      '/images/products/inner-cap-lace.jpg',
    ],
    description: 'বাতাস চলাচল-উপযোগী লেইসের ইনার ক্যাপ। লেইস দিয়ে তৈরি, প্রসারনযোগ্য ও হিজাব ঠিক জায়গায় স্থির রাখতে সহায়ক। ১টির দাম ৮০ টাকা, ২টি ১৫০ টাকা।',
    bulletPoints: [
      'লেইস দিয়ে তৈরি',
      'প্রসারনযোগ্য ও বাতাস চলাচল-উপযোগী',
      'হিজাব ঠিক জায়গায় স্থির থাকে',
      '১টি ৮০ টাকা | ২টি ১৫০ টাকা',
      'চাঁদপুর সদর ৫০৳ | ঢাকা ১২০৳',
    ],
    fabric: 'প্রিমিয়াম প্রসারনযোগ্য লেইস',
    sizes: ['ফ্রি সাইজ'],
    colors: [
      { name: 'ডিপ গ্রিন (Deep Green)', hex: '#234E3E' },
      { name: 'ব্ল্যাক (Black)', hex: '#1A1A1A' },
    ],
    inStock: true,
    isFeatured: true,
    isTrending: true,
    rating: 5.0,
    reviewCount: 24,
  },

  // --- Category: HIJAB PINS ---
  {
    id: 'tiara-dressmaker-hijab-pins',
    name: 'Stainless Steel Ball Hijab Pins',
    banglaName: 'স্টেইনলেস স্টিল বল হিজাব পিন বক্স',
    slug: 'stainless-steel-hijab-pins',
    category: 'hijab-pins',
    price: 150,
    originalPrice: 180,
    images: [
      '/images/products/hijab-pins.jpg',
    ],
    description: 'মসৃণ ও প্রিমিয়াম স্টেইনলেস স্টিল হেড বল পিন। কাপড়ে কোনো দাগ ফেলে না বা সুতো টানে না। নিরাপদ প্লাস্টিক বক্স সহ।',
    bulletPoints: [
      'স্টেইনলেস স্টিল মেটেরিয়াল',
      'কাপড়ে দাগ পড়ে না ও মসৃণ',
      'প্লাস্টিক স্টোরেজ বক্স সহ (১ বক্স ১৫০৳)',
      'চাঁদপুর সদর ৫০৳ | ঢাকা ১২০৳',
    ],
    fabric: 'স্টেইনলেস স্টিল',
    sizes: ['১ বক্স'],
    colors: [
      { name: 'গোল্ডেন (Gold)', hex: '#D4AF37' },
      { name: 'সিলভার (Silver)', hex: '#C0C0C0' },
      { name: 'রোজ গোল্ড (Rose Gold)', hex: '#B76E79' },
      { name: 'গানমেটাল (Gunmetal)', hex: '#4A4A4A' },
    ],
    inStock: true,
    isFeatured: true,
    isTrending: true,
    rating: 5.0,
    reviewCount: 19,
  },
];
