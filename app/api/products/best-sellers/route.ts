import { NextResponse } from "next/server";
import clientPromise from "@/app/_lib/dbConnect";
import { Product } from "@/app/components/InterfaceType";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("product");

    const bestSellerProducts = await db
      .collection<Product>("product")
      .find({ ribbon: "Best Seller" })
      .toArray();

    if (bestSellerProducts.length === 0) {
      return NextResponse.json(
        { message: "No best seller products found" },
        { status: 404 }
      );
    }

    return NextResponse.json(bestSellerProducts);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch best seller products" },
      { status: 500 }
    );
  }
}
