import { ProductFetcher } from "@/app/_lib/DatabaseFetcher";
import { Product } from "@/app/components/InterfaceType";
import ProductCardContainer from "@/app/components/ProductCardContainer";

async function page() {
  const products: Product[] = await ProductFetcher();
  const wholesaleProducts: Product[] = products.filter(
    (product) => product.ribbon === "Sale"
  );

  return (
    <div className="bg-red">
      <h1 className="text-6xl mb-10">Wholesale</h1>
      <p className="mb-10">{wholesaleProducts.length} products</p>
      <div className="grid grid-cols-4 gap-9 ">
        <ProductCardContainer products={wholesaleProducts} />
      </div>
    </div>
  );
}

export default page;
