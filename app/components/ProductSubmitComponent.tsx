"use client";
import { ChangeEvent, useState } from "react";
import Button from "./Button";
import CartWarning from "./CartWarming";

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

  const [warning, setWarning] = useState<string>("");

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    if (isNaN(value)) {
      setQuantity(0);
      setWarning("Please enter a valid number.");
    } else if (value < 1) {
      setQuantity(1);
      setWarning("Minimum quantity is 1.");
    } else if (value > 10) {
      setQuantity(10);
      setWarning("Maximum quantity is 10.");
    } else {
      setQuantity(value);
      setWarning("");
    }
  };

  return (
    <>
      <CartWarning />
      <div className="space-y-4">
        <input
          value={quantity}
          onChange={handleQuantityChange}
          type="number"
          className="w-20 text-white px-4 py-2 bg-black border-2 border-white rounded-lg hover:border-orange-500 focus:outline-none focus:border-orange-500 transition-colors duration-300"
          max="10"
          min="1"
        />
        {warning && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{warning}</span>
          </div>
        )}
      </div>
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
      <Button
        type="Buy_now"
        productId={id}
        productName={name}
        productImage={media[0].fullUrl}
        productPrice={
          formattedComparePrice ? formattedComparePrice : formattedPrice
        }
        quantity={quantity}
      >
        Buy Now
      </Button>
    </>
  );
}

export default ProductSubmitComponent;
