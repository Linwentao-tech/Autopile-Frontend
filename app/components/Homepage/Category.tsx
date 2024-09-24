import Button from "../Button";
import image1 from "../../../public/image1.webp";
import image2 from "../../../public/image2.webp";
import image3 from "../../../public/image3.webp";
import image4 from "../../../public/image4.webp";
import Image from "next/image";

function Category() {
  return (
    <div className="mx-4 sm:mx-8 md:mx-12">
      <header className="flex flex-col sm:flex-row items-center justify-between mb-6 ">
        <h1 className="text-2xl sm:text-3xl mb-4 sm:mb-0">Shop by Category</h1>
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
  );
}

export default Category;
