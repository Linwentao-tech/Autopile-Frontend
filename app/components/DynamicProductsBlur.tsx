import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
async function DynamicProductsBlur({
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
    <div className="overflow-hidden w-full ">
      <Image
        src={src}
        alt={`${name} image`}
        width={600}
        height={600}
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        placeholder="blur"
        blurDataURL={base64}
      />
    </div>
  );
}

export default DynamicProductsBlur;
