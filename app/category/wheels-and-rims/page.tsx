import { getProducts } from "@/app/actions/getProducts";
import ProductFilter from "@/app/_lib/ProductFilter";
import { PageProps, type Product } from "@/app/components/InterfaceType";
import ProductCardContainer from "@/app/components/ProductCardContainer";
export const metadata = {
  title: "Wheels & Rims",
  description: "Wheels & Rims Page",
};
async function page(props: PageProps) {
  const searchParams = await props.searchParams;
  const products: Product[] = (await getProducts()).filter(
    (product: Product) => product.category === 2
  );
  const filterProducts = ProductFilter({
    searchParams,
    products: products,
  });

  return (
    <div>
      <h1 className="text-6xl mb-10">Wheels & Rims</h1>
      <p className="mb-10">{filterProducts.length} products</p>
      <div className="grid grid-cols-4 gap-9 ">
        <ProductCardContainer products={filterProducts} />
      </div>
    </div>
  );
}

export default page;
