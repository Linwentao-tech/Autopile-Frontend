import { type ProductCardProps } from "./InterfaceType";
import Button from "./Button";
import DynamicProductsBlur from "./DynamicProductsBlur";
import Link from "next/link";
import convertRibbon from "../_lib/utils/ribbonConverter";
import { memo } from "react";

function formatProductName(productName: string) {
  return productName
    .toLowerCase()
    .split(" ")
    .filter((word) => word.trim() !== "")
    .join("-");
}

function ProductCard({
  product,
  isLoggedIn,
}: {
  product: ProductCardProps;
  isLoggedIn: boolean;
}) {
  const {
    productName,
    productImage,
    productRibbon,
    productComparePrice,
    productPrice,
    productId,
  } = product;

  return (
    <div className="relative w-full cursor-pointer group ">
      <Link
        href={`/product-page/${formatProductName(productName)}`}
        className="block"
      >
        <DynamicProductsBlur src={productImage} name={productName} />
        {convertRibbon(productRibbon)}
        <div className="w-full">
          <div>
            <h1 className="text-lg mb-1 mt-2">{productName}</h1>
            <p>
              {productComparePrice ? (
                <>
                  <s>${productPrice}</s> ${productComparePrice}
                </>
              ) : (
                <>${productPrice}</>
              )}
            </p>
          </div>
        </div>
      </Link>
      <div className="w-full justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Button
          type="Add_to_cart_productPage"
          productId={productId}
          quantity={1}
          isLoggedIn={isLoggedIn}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(ProductCard);
