import Image from "next/image";
import background from "../../../public/carbackground2.jpg";
import Button from "../Button";

function ClubJoin() {
  return (
    <section className="relative">
      <Image
        className="object-cover"
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
          <h1 className="text-5xl  mb-10 font-smibold mt-40 ">
            Join Our <br />
            Premium Club
          </h1>
          <hr className="my-4 border-t border-white  w-[700px] " />
          <p className="text-2xl mb-10 mt-10">
            Our premium membership will give you exclusive access to <br /> our
            early-bird sales, new arrivals and other special offers.{" "}
          </p>
          <div className="mb-40">
            <Button type="orange_button">Join Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClubJoin;
