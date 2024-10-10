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
  productInfo: string;
  productDescription: string;
  id: string;
  options: [];
  customTextFields: [];
  productType: string;
  ribbon: string | null;
  price: number;
  comparePrice: number | null;
  sku: string;
  isInStock: boolean;
  urlPart: string;
  formattedComparePrice: string | null;
  formattedPrice: string;
  pricePerUnit: null | number;
  formattedPricePerUnit: null | string;
  pricePerUnitData: null;
  itemDiscount: null;
  digitalProductFileItems: [];
  name: string;
  media: {
    url: string;
    fullUrl: string;
    index: number;
    width: number;
    mediaType: string;
    altText: string | null;
    title: string;
    height: number;
  }[];
  isManageProductItems: boolean;
  productItemsPreOrderAvailability: string;
  isTrackingInventory: boolean;
  inventory: {
    status: string;
    quantity: number;
    availableForPreOrder: boolean;
    preOrderInfoView: {
      limit: null | number;
    };
  };
  subscriptionPlans: {
    list: [];
  };
  discount: {
    mode: string;
    value: number;
  } | null;
}

export interface Review {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  design: string;
  tags: string[];
  stun: string;
  inspire: string;
  imageUrl: string;
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
  productRibbon: string | null;
  productComparePrice: string | null;
  productPrice: string;
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
}

export interface SearchParams {
  minPrice?: string;
  maxPrice?: string;
}

export interface PageProps {
  searchParams: SearchParams;
}
