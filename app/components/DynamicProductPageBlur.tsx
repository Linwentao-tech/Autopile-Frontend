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
        quality={100}
        className="w-full h-auto px-16"
      />
    </div>
  );
}
