import { type ProductCardProps } from "./InterfaceType";
import Button from "./Button";
import DynamicProductsBlur from "./DynamicProductsBlur";

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
      <DynamicProductsBlur src={productImage} name={productName} />
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
                <s>{productPrice}</s> {productComparePrice}
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
