"use client";
import { useState } from "react";
import Image from "next/image";
import { ReviewCardProps } from "../InterfaceType";

function ReviewCard({ id, img, title, subtitle, type }: ReviewCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  if (type == "homepage") {
    if (id !== 4) {
      return (
        <section className="border border-gray-800 max-w-sm">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={img}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <section className="px-6">
            <h1 className="text-lg font-bold my-6 break-words">{title}</h1>
            <h2 className="my-6 break-words text-sm">
              {subtitle.split(" ").slice(0, 10).join(" ")}
              {subtitle.split(" ").length > 10 ? "..." : ""}
            </h2>
            <hr className="border-gray-800" />
            <div className="py-4 flex items-center justify-between">
              <section className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                0
              </section>
              <section
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked ? "1" : "0"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-6 transition-all duration-300 ease-in-out ${
                    isLiked
                      ? "fill-red-600 text-red-600 scale-125"
                      : "fill-none text-current scale-100"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </section>
            </div>
          </section>
        </section>
      );
    }
  } else {
    return (
      <section className="border border-gray-800 max-w-sm">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <section className="px-6">
          <h1 className="text-lg font-bold my-6 break-words">{title}</h1>
          <h2 className="my-6 break-words text-sm">
            {subtitle.split(" ").slice(0, 10).join(" ")}
            {subtitle.split(" ").length > 10 ? "..." : ""}
          </h2>
          <hr className="border-gray-800" />
          <div className="py-4 flex items-center justify-between">
            <section className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              0
            </section>
            <section
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setIsLiked(!isLiked)}
            >
              {isLiked ? "1" : "0"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-6 transition-all duration-300 ease-in-out ${
                  isLiked
                    ? "fill-red-600 text-red-600 scale-125"
                    : "fill-none text-current scale-100"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </section>
          </div>
        </section>
      </section>
    );
  }
}

export default ReviewCard;
