import { type StaticImageData } from "next/image";
import { type ReactNode } from "react";
export interface ChildrenProps {
  children: ReactNode;
}

export interface SvgLogoProps {
  width: number;
  height: number;
}

export interface Product {
  // Fields from the JSON
  id: string;
  name: string;
  productDescription: string;
  productInfo: string;
  sku: string;
  price: number;
  comparePrice: number;
  isInStock: boolean;
  stockQuantity: number;
  ribbon: number;
  createdAt: string;
  updatedAt: string;
  category: number;
  productMedias: {
    url: string;
    fullUrl: string;
    mediaType: string;
    altText: string;
    title: string;
    width: number;
    height: number;
  }[];
}

export interface Review {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  rating: number;
  createdAt: string;
  author: string;
  imageUrl?: string;
  userId: string;
}

export interface ReviewCardProps {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  type?: "homepage";
}

export interface PaymentIconProp {
  src: StaticImageData;
}
export interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subscribe: boolean;
}
export interface ProductCardProps {
  productName: string;
  productImage: string;
  productRibbon: number;
  productComparePrice: number | null;
  productPrice: number;
  productId: string;
}
type OrangeButtonSubtype =
  | "shop_now"
  | "default"
  | "learn_about"
  | "premium_area";
export type ButtonType =
  | { type: "orange_button"; subtype: OrangeButtonSubtype }
  | "transparent-button"
  | "Add_to_cart_homepage"
  | "orange_submit_button"
  | "Add_to_cart_productPage"
  | "Buy_now"
  | "clear_cart";

export interface ProductCardContainerProps {
  products: Product[];
  isLoggedIn: boolean;
}

export interface SearchParams {
  minPrice?: string;
  maxPrice?: string;
  productName?: string;
}

export interface PageProps {
  searchParams: SearchParams;
}
export type Item = {
  id: number;
  productName: string;
  productPrice: string;
  productId: string;
  quantity: number;
  totalPrice: number;
};

export interface userData {
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt: string;
}

type PaymentMethod = "Credit Card" | "PayPal" | "Stripe";

interface OrderItem {
  productId: string;
  quantity: number;
}

export interface CheckoutFormData {
  paymentMethod: PaymentMethod;
  shippingAddress_Line1: string;
  shippingAddress_Line2?: string;
  shippingAddress_City: string;
  shippingAddress_Country: string;
  shippingAddress_State: string;
  shippingAddress_PostalCode: string;
  deliveryFee: number;
  orderItems: OrderItem[];
}

interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: number;
  userId: string;
  orderNumber: string;
  orderDate: string;
  status: number;
  subTotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  stripeSessionId: string | null;
  shippingAddress_Line1: string;
  shippingAddress_Line2: string;
  shippingAddress_City: string;
  shippingAddress_Country: string;
  shippingAddress_State: string;
  shippingAddress_PostalCode: string;
  orderItems: OrderItem[];
}
