import { getProducts } from "@/app/actions/getProducts";
import ProductFilter from "@/app/_lib/ProductFilter";
import { PageProps, Product } from "@/app/components/InterfaceType";
import ProductCardContainer from "@/app/components/ProductCardContainer";
import { auth } from "@/app/auth";
export const metadata = {
  title: "Wholesale",
  description: "Wholesale Page",
};
async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const products: Product[] = (await getProducts()).filter(
    (product: Product) => product.ribbon === 0
  );
  const filterProducts = ProductFilter({
    searchParams,
    products: products,
  });
  const session = await auth();
  return (
    <div className="bg-red">
      <h1 className="text-6xl mb-10">Wholesale</h1>
      <p className="mb-10">{filterProducts.length} products</p>
      <div className="grid grid-cols-4 gap-9">
        <ProductCardContainer
          products={filterProducts}
          isLoggedIn={session?.user ? true : false}
        />
      </div>
    </div>
  );
}

export default Page;
