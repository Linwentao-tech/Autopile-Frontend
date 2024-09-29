import TopSeller from "./TopSeller";
import { ProductFetcher } from "@/app/_lib/DatabaseFetcher";

async function TopSellerContainer() {
  const Products = await ProductFetcher();
  const bestSellerProducts = Products.filter(
    (product) => product.ribbon === "Best Seller"
  );
  const serializedProducts = bestSellerProducts.map((product) =>
    JSON.parse(JSON.stringify(product))
  );

  return <TopSeller products={serializedProducts} />;
}

export default TopSellerContainer;
