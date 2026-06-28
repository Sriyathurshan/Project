export interface ApiError {
  message?: string;
}

export interface User {
  _id: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
}

export interface ProductImage {
  url: string;
  altText?: string;
}

export interface Product {
  _id: string | number;
  name?: string;
  brand?: string;
  images: ProductImage[];
  price?: number;
  discountedPrice?: number;
  originalPrice?: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
  material?: string;
  [key: string]: unknown;
}

export interface Order {
  _id: string;
  createdAt: string;
  user?: User;
  orderItems: CartProduct[];
  shippingAddress: ShippingAddress;
  isPaid: boolean;
  isDelivered?: boolean;
  status?: string;
  paymentMethod?: string;
  shippingMethod?: string;
  totalPrice?: number;
  [key: string]: unknown;
}

export interface ShippingAddress {
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  [key: string]: unknown;
}

export interface Checkout {
  _id: string;
  createdAt: string;
  items: CartProduct[];
  shippingAddress: ShippingAddress;
  [key: string]: unknown;
}

export interface Cart {
  products: CartProduct[];
  totalPrice?: number;
  [key: string]: unknown;
}

export interface CartProduct {
  productId?: string | number;
  _id?: string | number;
  name?: string;
  image?: string;
  imageUrl?: string;
  color?: string;
  size?: string;
  quantity: number;
  price?: number;
  [key: string]: unknown;
}

export interface ProductFilters {
  category?: string;
  size?: string;
  color?: string;
  gender?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  search?: string;
  material?: string;
  collection?: string;
  limit?: string | number;
}
