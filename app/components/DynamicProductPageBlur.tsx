import Image from "next/image";

export default function DynamicProductPageBlur({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  return (
    <div className="flex justify-center items-start">
      <Image
        src={src}
        alt={`${name} image`}
        width={600}
        height={900}
        quality={85}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjkwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyMjIyIi8+PC9zdmc+"
        className="w-full h-auto px-16"
      />
    </div>
  );
}
