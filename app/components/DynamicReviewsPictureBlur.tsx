"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function DynamicReviewsPictureBlur({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
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
    <div className="relative w-full aspect-[4/3]">
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL || undefined}
      />
    </div>
  );
}

export default DynamicReviewsPictureBlur;
