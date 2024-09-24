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
