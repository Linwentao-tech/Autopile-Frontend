import Image from "next/image";
import Button from "./components/Button";
import image1 from "../public/image1.webp";
import image2 from "../public/image2.webp";
import image3 from "../public/image3.webp";
import image4 from "../public/image4.webp";
import background from "../public/carbackground.jpg";
function Page() {
  return (
    <div>
      <div className="mx-4 sm:mx-8 md:mx-12">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-6 ">
          <p className="text-2xl sm:text-3xl mb-4 sm:mb-0">Shop by Category</p>
          <Button type="transparent-button">Shop</Button>
        </header>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 ">
          {[image1, image2, image3, image4].map((image, index) => (
            <div
              key={index}
              className="relative w-full aspect-[4/4] overflow-hidden"
            >
              <Image
                src={image}
                alt={`Category ${index + 1}`}
                placeholder="blur"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </div>
          ))}
        </section>
      </div>

      <section className="relative">
        <Image
          className="object-cover"
          src={background}
          alt="car background image"
          placeholder="blur"
          fill
          sizes="100vw"
          priority
        />
        <div className="relative z-10 p-6 text-white">
          <div className="relative ml-5 ">
            <p className="text-5xl mb-24 font-smibold ">
              The One-Stop Shop for <br />
              Automotive Enthusiasts
            </p>
            <table className="table-auto border border-white border-collapse text-sm mb-12">
              <tbody>
                <tr>
                  <td className="border-white border py-9 pl-9 pr-44">
                    Free in-store or <br /> curbside pickup
                  </td>
                  <td className="border-white border py-9 pl-9 pr-44">
                    Personalized care including <br />
                    battery testing and installation
                  </td>
                </tr>
                <tr>
                  <td className="border-white border py-9 pl-9 pr-44">
                    Certified <br />
                    technicians only
                  </td>
                  <td className="border-white border py-9 pl-9 pr-44">
                    Get points for every purchase.
                    <br />
                    Redeem points for rewards
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mb-28">
              <Button type="orange_button">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
