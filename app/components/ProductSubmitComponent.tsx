"use client";
import React, { useState } from "react";
import Button from "./Button";

type media = {
  url: string;
  fullUrl: string;
  index: number;
  width: number;
  mediaType: string;
  altText: string | null;
  title: string;
  height: number;
};

interface ProductSubmitComponentProps {
  id: string;
  name: string;
  media: media[];
  formattedComparePrice: string | null;
  formattedPrice: string;
}

function ProductSubmitComponent({
  id,
  name,
  media,
  formattedComparePrice,
  formattedPrice,
}: ProductSubmitComponentProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  return (
    <>
      <input
        value={quantity}
        onChange={handleQuantityChange}
        type="number"
        className="w-20 text-white px-4 py-2 bg-black border-2 border-white rounded-lg hover:border-orange-500 focus:outline-none focus:border-orange-500 transition-colors duration-300"
        max="10"
        min="1"
      />
      <Button
        type="Add_to_cart_productPage"
        productId={id}
        productName={name}
        productImage={media[0].fullUrl}
        productPrice={
          formattedComparePrice ? formattedComparePrice : formattedPrice
        }
        quantity={quantity}
      >
        Add to cart
      </Button>
      <Button type="Buy_now">Buy Now</Button>
    </>
  );
}

export default ProductSubmitComponent;
