import Image from "next/image";
import { type ProductCardProps } from "./InterfaceType";
import Button from "./Button";

function ProductCard({ product }: { product: ProductCardProps }) {
  const {
    productName,
    productImage,
    productRibbon,
    productComparePrice,
    productPrice,
  } = product;
  return (
    <div className="relative w-full cursor-pointer group">
      <div className="overflow-hidden w-full ">
        <Image
          src={productImage}
          alt={`${productName} image`}
          width={600}
          height={600}
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      {productRibbon && (
        <div className="absolute top-0 left-0 bg-orange-500 text-white px-2 py-1 text-sm font-semibold z-10">
          {productRibbon}
        </div>
      )}
      <div className="w-full">
        <div>
          <h1 className="text-lg mb-1 mt-2">{productName}</h1>
          <p>
            {productComparePrice ? (
              <>
                <s>{productComparePrice}</s> {productPrice}
              </>
            ) : (
              productPrice
            )}
          </p>
          <div className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ">
            <Button type="Add_to_cart_productPage">Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
