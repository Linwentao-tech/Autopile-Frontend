"use client";

import Image from "next/image";
import { useAppSelector } from "../_lib/hooks";

function CartPage() {
  const items = useAppSelector((state) => state.cart.items);

  return (
    <section className="m-14  min-h-screen">
      <div className="mx-auto w-64">
        <h1 className="text-4xl font-bold text-white mb-5">Your Cart</h1>
        <section>
          {items.map((product) => (
            <div key={product.id}>
              <h1 className="text-xl">{product.name}</h1>
              <Image
                src={product.image}
                alt="product image"
                width={200}
                height={200}
                className="w-auto h-auto object-contain"
              />
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}

export default CartPage;
