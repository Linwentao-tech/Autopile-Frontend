import Image from "next/image";
import Brand from "./Brand";
import Drivilux from "@/public/Drivilux.png";
import Drivery from "@/public/Drivery.png";
import Autopartse from "@/public/Autopartse.png";
import Wheelbu from "@/public/Wheelbu.png";
import Motorks from "@/public/Motorks.png";
function Brands() {
  return (
    <section className="mx-12">
      <h1 className="text-4xl mb-10">Brands We Trust</h1>
      <section className="flex items-center justify-center mb-14">
        <Brand>
          <Image
            src={Drivilux}
            alt="Drivilux brand"
            fill
            placeholder="blur"
            className="p-20 object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Brand>
        <Brand>
          <Image
            src={Autopartse}
            alt="Autopartse brand"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            className="p-20 object-contain"
          />
        </Brand>
        <Brand>
          <Image
            src={Wheelbu}
            alt="Wheelbu brand"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            className="p-20 object-contain"
          />
        </Brand>
        <Brand>
          <Image
            src={Motorks}
            alt="Motorks brand"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            className="p-20 object-contain"
          />
        </Brand>
        <Brand>
          <Image
            src={Drivery}
            alt="Drivery brand"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            className="p-20 object-contain"
          />
        </Brand>
      </section>
    </section>
  );
}

export default Brands;
