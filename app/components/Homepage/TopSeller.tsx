import * as React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Product } from "../InterfaceType";
import ProductCard from "../ProductCard";
import { auth } from "@/app/auth";
export interface Artwork {
  artist: string;
  art: string;
}

export default async function TopSeller({ products }: { products: Product[] }) {
  const session = await auth();

  return (
    <div className="flex flex-col gap-4 mx-10 mb-10">
      <h1 className="text-4xl  mx-10 my-5">Top Seller:</h1>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border ">
        <div className="flex flex-row space-x-10 mt-7 mx-10 w-full mb-10">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard
                product={{
                  productName: product.name,
                  productId: product.id,
                  productImage: product.productMedias[0].fullUrl,
                  productRibbon: product.ribbon,
                  productComparePrice: product.comparePrice,
                  productPrice: product.price,
                }}
                isLoggedIn={session ? true : false}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
