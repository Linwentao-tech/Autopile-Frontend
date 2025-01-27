import { getProducts } from "@/app/actions/getProducts";
import TopSeller from "./TopSeller";
import type { Product } from "../InterfaceType";

async function TopSellerContainer() {
  const Products = await getProducts();
  const bestSellerProducts = Products.filter(
    (product: Product) => product.ribbon === 1
  );
  const serializedProducts = bestSellerProducts.map((product: Product) =>
    JSON.parse(JSON.stringify(product))
  );

  return <TopSeller products={serializedProducts} />;
}

export default TopSellerContainer;
