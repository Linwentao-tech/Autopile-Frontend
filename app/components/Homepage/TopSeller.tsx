"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Product } from "../InterfaceType";
import Button from "../Button";

function TopSeller({ products }: { products: Product[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5;

  const nextPage = () => {
    setCurrentPage(
      (prev) => (prev + 1) % Math.ceil(products.length / productsPerPage)
    );
  };

  const prevPage = () => {
    setCurrentPage(
      (prev) =>
        (prev - 1 + Math.ceil(products.length / productsPerPage)) %
        Math.ceil(products.length / productsPerPage)
    );
  };

  return (
    <section className="w-full mt-20 mb-44">
      <h1 className="text-4xl mb-6 px-4">Top Sellers</h1>
      <div className="relative">
        {currentPage === 1 && (
          <button
            onClick={prevPage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black rounded-full p-2 shadow-md z-10"
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        )}
        <div className="overflow-hidden">
          <ul
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {products.map((product: Product) => (
              <li key={product.id} className="flex-none w-1/5 px-2">
                <div className="flex flex-col items-center">
                  <div className="relative w-full pt-[100%] ">
                    <Image
                      src={product.media[0].fullUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                      className="rounded-lg"
                    />
                  </div>
                  <h2 className="mt-2 text-center text-2xl font-medium">
                    {product.name}
                  </h2>
                  <p className="text-gray-300 text-xl mt-2 mb-4">
                    ${product.price.toFixed(2)}
                  </p>
                  <Button type="Add_to_cart_homepage">Add to cart</Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {currentPage === 0 && (
          <button
            onClick={nextPage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-md z-10 bg-black"
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}

export default TopSeller;
