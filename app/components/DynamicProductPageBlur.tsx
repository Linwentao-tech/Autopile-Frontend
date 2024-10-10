import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

async function DynamicProductPageBlur({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  const buffer = await fetch(src).then(async (res) => {
    return Buffer.from(await res.arrayBuffer());
  });

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className="flex justify-center items-start">
      <Image
        src={src}
        alt={`${name} image`}
        width={600}
        height={900}
        quality={100}
        className="w-full h-auto px-16"
        placeholder="blur"
        blurDataURL={base64}
      />
    </div>
  );
}

export default DynamicProductPageBlur;
