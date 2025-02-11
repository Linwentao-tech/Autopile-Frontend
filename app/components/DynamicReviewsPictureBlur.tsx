"use client";

import Image from "next/image";

export default function DynamicReviewsPictureBlur({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <div className="relative w-full aspect-[4/3]">
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
