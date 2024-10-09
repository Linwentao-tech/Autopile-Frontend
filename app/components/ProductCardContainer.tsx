import {
  type Product,
  type ProductCardContainerProps,
  type ProductCardProps,
} from "./InterfaceType";
import ProductCard from "./ProductCard";

function ProductCardContainer({ products }: ProductCardContainerProps) {
  return (
    <>
      {products.map((el: Product) => {
        const product: ProductCardProps = {
          productName: el.name,
          productImage: el.media[0].fullUrl,
          productRibbon: el.ribbon,
          productComparePrice: el.formattedComparePrice,
          productPrice: el.formattedPrice,
          productId: el.id,
        };
        return <ProductCard key={el.id} product={product} />;
      })}
    </>
  );
}

export default ProductCardContainer;
