import {
  type Product,
  type ProductCardContainerProps,
  type ProductCardProps,
} from "./InterfaceType";
import ProductCard from "./ProductCard";

function ProductCardContainer({
  products,
  isLoggedIn,
}: ProductCardContainerProps) {
  return (
    <>
      {products.map((el: Product) => {
        const product: ProductCardProps = {
          productName: el.name,
          productImage: el.productMedias[0].fullUrl,
          productRibbon: el.ribbon,
          productComparePrice: el.comparePrice,
          productPrice: el.price,
          productId: el.id,
        };
        return (
          <ProductCard key={el.id} product={product} isLoggedIn={isLoggedIn} />
        );
      })}
    </>
  );
}

export default ProductCardContainer;
