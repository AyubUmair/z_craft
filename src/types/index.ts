// ============================================================
// Z Craft — Core Type Definitions
// ============================================================

export type Category =
  | 'quran-covers'
  | 'wedding-gifts'
  | 'wooden-crafts'
  | 'photo-frames'
  | 'gift-boxes'
  | 'nikah-nama'
  | 'resin-art'
  | 'hampers';

export interface CategoryInfo {
  slug: Category;
  name: string;
  description: string;
  color: string;       // jewel-tone hex
  colorName: string;
  icon: string;        // emoji or icon name
  image: string;       // category hero image path
}

export type CustomizationFieldType = 'text' | 'textarea' | 'swatch' | 'select' | 'number' | 'image';

export interface SwatchOption {
  value: string;
  label: string;
  hex: string;
}

export interface CustomizationField {
  key: string;
  label: string;
  type: CustomizationFieldType;
  placeholder?: string;
  maxLength?: number;
  options?: SwatchOption[] | string[];
  optional?: boolean;
  defaultValue?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  description: string;
  longDescription?: string;
  basePrice: number;       // LKR
  priceNote?: string;
  images: string[];
  customizationFields: CustomizationField[];
  featured: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  tags: string[];
  occasions?: string[];
  colors?: string[];
  rating?: number;
  reviewCount?: number;
  deliveryEstimate?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations: Record<string, string>;
  id: string;              // unique cart item id (product can appear multiple times with different customizations)
}

export interface OrderItem {
  productId: string;
  productName: string;
  customizations: Record<string, string>;
  quantity: number;
  priceAtOrder: number;
}

export type OrderStatus = 'new' | 'confirmed' | 'in_production' | 'ready' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  items: OrderItem[];
  status: OrderStatus;
  deliveryAddress: string;
  depositPaid: boolean;
  depositAmount?: number;
  paymentRef?: string;
  notes?: string;
  totalEstimate: number;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  category?: Category;
  featured: boolean;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  imageUrl: string;
  year: number;
  description: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  text: string;
  rating: number;
  imageUrl?: string;
  productCategory?: Category;
  date: string;
}

export interface CustomOrderRequest {
  occasion: string;
  itemType: string;
  description: string;
  referenceImages?: string[];
  budgetRange: string;
  customerName: string;
  phone: string;
  email: string;
  deliveryDate?: string;
  notes?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}
