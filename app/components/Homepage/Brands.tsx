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
      <h1 className="lg:text-4xl md:text-3xl text-2xl mb-10">
        Brands We Trust
      </h1>
      <section className="mb-14 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  items-center justify-center">
          <div className="w-full">
            <Brand>
              <Image
                src={Drivilux}
                alt="Drivilux brand"
                fill
                className="p-4 md:p-8 lg:p-12 object-contain"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              />
            </Brand>
          </div>
          <div className="w-full">
            <Brand>
              <Image
                src={Autopartse}
                alt="Autopartse brand"
                fill
                className="p-4 md:p-8 lg:p-12 object-contain"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              />
            </Brand>
          </div>
          <div className="w-full">
            <Brand>
              <Image
                src={Wheelbu}
                alt="Wheelbu brand"
                fill
                className="p-4 md:p-8 lg:p-12 object-contain"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              />
            </Brand>
          </div>
          <div className="w-full">
            <Brand>
              <Image
                src={Motorks}
                alt="Motorks brand"
                fill
                className="p-4 md:p-8 lg:p-12 object-contain"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              />
            </Brand>
          </div>
          <div className="w-full">
            <Brand>
              <Image
                src={Drivery}
                alt="Drivery brand"
                fill
                className="p-4 md:p-8 lg:p-12 object-contain"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              />
            </Brand>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Brands;
