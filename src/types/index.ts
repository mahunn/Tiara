export interface Product {
  id: string;
  name: string;
  banglaName?: string;
  slug: string;
  category: 'prayer-hijab' | 'inner-cap' | 'hijab-pins';
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  images: string[];
  description: string;
  bulletPoints?: string[];
  fabric?: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  rating: number;
  reviewCount: number;
}

export interface Category {
  id: 'prayer-hijab' | 'inner-cap' | 'hijab-pins';
  name: string;
  banglaName: string;
  slug: string;
  image: string;
  itemCount: number;
  description?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export type DeliveryZone = 'chandpur' | 'dhaka' | 'outside_dhaka';

export interface OrderCustomer {
  fullName: string;
  phone: string;
  address: string;
  cityZone: DeliveryZone;
  notes?: string;
}

export interface Order {
  id?: string;
  customer: OrderCustomer;
  items: {
    productId: string;
    productName: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'cash_on_delivery' | 'bkash' | 'nagad';
  status?: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  productName: string;
  avatar: string;
}
