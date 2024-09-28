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
  id: string;
  name: string;
  productType: string;
  ribbon: string;
  price: number;
  comparePrice: number;
  sku: string;
  isInStock: boolean;
  urlPart: string;
  formattedComparePrice: string;
  formattedPrice: string;
  media: {
    url: string;
    fullUrl: string;
    index: number;
    width: number;
    mediaType: string;
    altText: string;
    title: string;
    height: number;
  }[];
  inventory: {
    status: string;
    quantity: number;
    availableForPreOrder: boolean;
  };
  discount: {
    mode: string;
    value: number;
  };
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

export interface FooterSectionProps {
  title: string;
  items: string[];
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
