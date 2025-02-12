import { getProducts } from "@/app/actions/getProducts";
import ProductFilter from "@/app/_lib/ProductFilter";
import { PageProps, type Product } from "@/app/components/InterfaceType";
import ProductCardContainer from "@/app/components/ProductCardContainer";
import { auth } from "@/app/auth";
export const metadata = {
  title: "All Products",
  description: "Page of all of the products",
};
async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const products: Product[] = await getProducts();

  const filterProducts = ProductFilter({
    searchParams,
    products: products,
  });
  const session = await auth();

  return (
    <div className="w-full">
      <h1 className="text-6xl mb-10">All Products</h1>
      <p className="mb-10">{filterProducts.length} products</p>
      <div className="grid grid-cols-4 gap-9 ">
        <ProductCardContainer
          products={filterProducts}
          isLoggedIn={session?.user ? true : false}
        />
      </div>
    </div>
  );
}

export default Page;
