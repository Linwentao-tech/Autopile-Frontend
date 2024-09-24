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
          <h1 className="text-5xl mb-24 font-smibold ">
            The One-Stop Shop for <br />
            Automotive Enthusiasts
          </h1>
          <Table />
          <div className="mb-24 ">
            <Button type="orange_button">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LearnMore;
