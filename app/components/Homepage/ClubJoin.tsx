import Image from "next/image";
import background from "../../../public/carbackground2.jpg";
import Button from "../Button";

function ClubJoin() {
  return (
    <section className="relative">
      <Image
        className="object-cover w-screen"
        src={background}
        alt="car background image"
        quality={100}
        placeholder="blur"
        fill
        sizes="100vw"
        priority
      />
      <div className="relative z-10 p-6 text-white">
        <div className="relative ml-5 ">
          <h1 className="lg:text-5xl md:text-4xl text-3xl mb-10 font-smibold mt-40 ">
            Join Our <br />
            Premium Club
          </h1>
          <hr className="my-4 border-t border-white  w-full " />
          <p className="lg:text-2xl md:text-xl text-lg mb-10 mt-10">
            Our premium membership will give you exclusive access to <br /> our
            early-bird sales, new arrivals and other special offers.{" "}
          </p>
          <div className="mb-40">
            <Button type={{ type: "orange_button", subtype: "premium_area" }}>
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClubJoin;
