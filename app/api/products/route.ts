import { NextResponse } from "next/server";

import { Product } from "@/app/components/InterfaceType";
import clientPromise from "@/app/_lib/dbConnect";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("product");

    const products = await db.collection<Product>("product").find({}).toArray();
    console.log(NextResponse.json(products));

    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
