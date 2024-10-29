import { ProductFetcher } from "@/app/_lib/DatabaseFetcher";
import ProductFilter from "@/app/_lib/ProductFilter";
import { PageProps, type Product } from "@/app/components/InterfaceType";
import ProductCardContainer from "@/app/components/ProductCardContainer";
export const metadata = {
  title: "Best Seller",
  description: "Page of best seller",
};
async function page({ searchParams }: PageProps) {
  const products: Product[] = (await ProductFetcher()).filter(
    (product) => product.ribbon === "Best Seller"
  );
  const filterProducts = ProductFilter({
    searchParams,
    products: products,
  });

  return (
    <div>
      <h1 className="text-6xl mb-10">Best Seller</h1>
      <p className="mb-10">{filterProducts.length} products</p>
      <div className="grid grid-cols-4 gap-9 ">
        <ProductCardContainer products={filterProducts} />
      </div>
    </div>
  );
}

export default page;
