import { ProductFetcher } from "@/app/_lib/DatabaseFetcher";
import { type Product } from "@/app/components/InterfaceType";
import ProductCardContainer from "@/app/components/ProductCardContainer";

async function page() {
  const products: Product[] = await ProductFetcher();

  return (
    <div className="bg-red">
      <h1 className="text-6xl mb-10">All Products</h1>
      <p className="mb-10">{products.length} products</p>
      <div className="grid grid-cols-4 gap-9 ">
        <ProductCardContainer products={products} />
      </div>
    </div>
  );
}

export default page;
