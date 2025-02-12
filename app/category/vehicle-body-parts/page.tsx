import ProductFilter from "@/app/_lib/ProductFilter";
import { getProducts } from "@/app/actions/getProducts";
import { auth } from "@/app/auth";
import { PageProps, type Product } from "@/app/components/InterfaceType";
import ProductCardContainer from "@/app/components/ProductCardContainer";
export const metadata = {
  title: "Vehicle Body Parts",
  description: "Vehicle Body Parts Page",
};
async function page(props: PageProps) {
  const searchParams = await props.searchParams;
  const products: Product[] = (await getProducts()).filter(
    (product: Product) => product.category === 1
  );
  const filterProducts = ProductFilter({
    searchParams,
    products: products,
  });
  const session = await auth();
  return (
    <div>
      <h1 className="text-6xl mb-10">Vehicle Body Parts</h1>
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

export default page;
