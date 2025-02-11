"use client";
import React, { useState } from "react";
import type { Product } from "../InterfaceType";
import Button from "../Button";
import DynamicTopSellers from "../DynamicTopSellers";

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
      <h1 className="text-4xl mb-6 px-4 mx-8">Top Sellers</h1>
      <div className="relative">
        {currentPage === 1 && (
          <button
            onClick={prevPage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/80 hover:bg-black rounded-full p-2 shadow-lg z-10 transition-colors duration-200"
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
                <div className="flex flex-col items-center group">
                  <div className="relative w-full pt-[140%] overflow-hidden rounded-lg">
                    <DynamicTopSellers
                      src={product.productMedias[0].fullUrl}
                      alt={product.name}
                    />
                    <div className="absolute top-0 left-0 bg-orange-500 text-white px-3 py-1.5 text-sm font-semibold z-10 rounded-br-lg shadow-md">
                      Best Seller
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="w-full text-center mt-4 space-y-2">
                    <h2 className="text-2xl font-medium text-white group-hover:text-orange-500 transition-colors duration-300">
                      {product.name}
                    </h2>
                    <p className="text-gray-300 text-xl">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Button
                        type="Add_to_cart_productPage"
                        productId={product.id}
                        quantity={1}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {currentPage === 0 && (
          <button
            onClick={nextPage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-lg z-10 bg-black/80 hover:bg-black transition-colors duration-200"
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
