"use client";
import { ChangeEvent, useState } from "react";
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
  isLoggedIn: boolean;
}

function ProductSubmitComponent({
  id,
  isLoggedIn,
}: ProductSubmitComponentProps) {
  const [inputValue, setInputValue] = useState("1");
  const [quantity, setQuantity] = useState(1);
  const [warning, setWarning] = useState<string>("");

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue === "") {
      setWarning("");
      return;
    }

    const value = parseInt(newValue, 10);

    if (isNaN(value)) {
      setWarning("Please enter a valid number.");
    } else if (value < 1) {
      setWarning("Minimum quantity is 1.");
    } else if (value > 10) {
      setWarning("Maximum quantity is 10.");
    } else {
      setQuantity(value);
      setWarning("");
    }
  };

  const handleBlur = () => {
    const value = parseInt(inputValue, 10);
    if (inputValue === "" || isNaN(value) || value < 1) {
      setQuantity(1);
      setInputValue("1");
      setWarning("Minimum quantity is 1.");
    } else if (value > 10) {
      setQuantity(10);
      setInputValue("10");
      setWarning("Maximum quantity is 10.");
    } else {
      setQuantity(value);
      setInputValue(value.toString());
      setWarning("");
    }
  };

  return (
    <>
      <div className="space-y-4">
        <input
          value={inputValue}
          onChange={handleQuantityChange}
          onBlur={handleBlur}
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
        quantity={quantity}
        isLoggedIn={isLoggedIn}
      >
        Add to cart
      </Button>
    </>
  );
}
export default ProductSubmitComponent;
