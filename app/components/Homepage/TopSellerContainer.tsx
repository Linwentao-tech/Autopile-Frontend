import clientPromise from "@/app/_lib/dbConnect";
import { Product } from "../InterfaceType";
import TopSeller from "./TopSeller";

async function TopSellerContainer() {
  const client = await clientPromise;
  const db = client.db("product");
  const bestSellerProducts = await db
    .collection<Product>("product")
    .find({ ribbon: "Best Seller" })
    .toArray();

  const serializedProducts = bestSellerProducts.map((product) =>
    JSON.parse(JSON.stringify(product))
  );

  return <TopSeller products={serializedProducts} />;
}

export default TopSellerContainer;
