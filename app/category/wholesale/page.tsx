import { ProductFetcher } from "@/app/_lib/DatabaseFetcher";
import ProductFilter from "@/app/_lib/ProductFilter";
import { PageProps, Product } from "@/app/components/InterfaceType";
import ProductCardContainer from "@/app/components/ProductCardContainer";
export const metadata = {
  title: "Wholesale",
  description: "Wholesale Page",
};
async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const products: Product[] = await ProductFetcher();
  const wholesaleProducts: Product[] = products.filter(
    (product) => product.ribbon === "Sale"
  );
  const filterProducts = ProductFilter({
    searchParams,
    products: wholesaleProducts,
  });

  return (
    <div className="bg-red">
      <h1 className="text-6xl mb-10">Wholesale</h1>
      <p className="mb-10">{filterProducts.length} products</p>
      <div className="grid grid-cols-4 gap-9">
        <ProductCardContainer products={filterProducts} />
      </div>
    </div>
  );
}

export default Page;
