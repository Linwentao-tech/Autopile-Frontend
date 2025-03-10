import Image from "next/image";

export default function DynamicProductsBlur({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  return (
    <div className="overflow-hidden w-full">
      <Image
        src={src}
        alt={`${name} image`}
        width={0}
        height={0}
        sizes="100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-110 w-full h-auto"
      />
    </div>
  );
}
