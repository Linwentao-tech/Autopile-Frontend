import clientPromise from "@/app/_lib/dbConnect";
import { Product, Review } from "../components/InterfaceType";
import { type MongoClient } from "mongodb";
export async function ReviewsFetcher(): Promise<Review[]> {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db("product");
    const reviews: Review[] = await db
      .collection<Review>("reviews")
      .find({})
      .toArray();
    return reviews;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    throw error;
  }
}

export async function ProductFetcher(): Promise<Product[]> {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db("product");
    const products: Product[] = await db
      .collection<Product>("product")
      .find({})
      .toArray();
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}
