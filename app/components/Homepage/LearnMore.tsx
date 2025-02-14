import Image from "next/image";
import background from "../../../public/carbackground.jpg";
import Button from "../Button";
import Table from "./Table";

function LearnMore() {
  return (
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
          <h1 className="lg:text-5xl mb-12 font-smibold lg:pt-40 pt-20 text-2xl w-full lg:w-1/3 md:w-1/2 md:text-3xl">
            The One-Stop Shop for Automotive Enthusiasts
          </h1>
          <Table />
          <div className="mb-24 ">
            <Button type={{ type: "orange_button", subtype: "learn_about" }}>
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LearnMore;
