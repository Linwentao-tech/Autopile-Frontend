"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

function DynamicTopSellers({ src, alt }: { src: string; alt: string }) {
  const [blurDataURL, setBlurDataURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlurData = async () => {
      try {
        const response = await fetch(
          `/api/getBlurData?url=${encodeURIComponent(src)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blur data");
        }
        const data = await response.json();
        setBlurDataURL(data.blurDataURL);
      } catch (error) {
        console.error("Error fetching blur data:", error);
      }
    };

    fetchBlurData();
  }, [src]);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
      className=" object-cover"
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL || undefined}
    />
  );
}

export default DynamicTopSellers;
