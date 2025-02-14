import background from "@/public/about-car.jpg";
import Image from "next/image";
export const metadata = {
  title: "About us",
  description: "We Understand Cars",
};
function page() {
  return (
    <section className="px-4 sm:px-12 pt-16">
      <section className="w-full">
        <h1 className="text-4xl">We Understand Cars</h1>
        <p className="w-full mt-5 text-lg ">
          We love cars and know them inside out. From design and performance to
          the latest trends, we&apos;re here to share our expertise. Whether
          you&apos;re an enthusiast or just curious, join us as we explore
          everything that makes cars special.
        </p>
      </section>
      <section className="grid-flow-col grid mt-48 ">
        <article className="border p-32">
          <h2 className="text-3xl font-bold mb-6">Dependability</h2>
          <p className="text-xl">
            We prioritize reliability above all else, ensuring that you can
            count on us whenever you need support. Our commitment to
            dependability means delivering consistent quality and trusted
            service every time.
          </p>
        </article>
        <article className="border p-32">
          <h2 className="text-3xl font-bold mb-6">Affordability</h2>
          <p className="text-xl">
            Quality doesn&apos;t have to come at a high price. We offer
            competitive pricing and value-driven options, making sure you get
            the best without breaking the bank.
          </p>
        </article>
        <article className="border p-32">
          <h2 className="text-3xl font-bold mb-6">Availability</h2>
          <p className="text-xl">
            We&apos;re always here when you need us. With flexible scheduling
            and round-the-clock support, we&apos;re ready to assist whenever you
            require our services.
          </p>
        </article>
      </section>
      <section className="relative mt-20 ">
        <Image
          src={background}
          alt="car light background image"
          fill
          className="absolute inset-0 z-0 object-cover"
          placeholder="blur"
        />
        <div className="relative z-10 p-10 text-white">
          <h1 className="text-3xl w-[400px] leading-normal mb-10">
            A One-Stop Shop for Automotive Enthusiasts
          </h1>
          <p className="w-1/5 text-lg leading-relaxed mb-24">
            Welcome to the ultimate destination for car enthusiasts! From the
            latest model reviews to expert maintenance tips, we&apos;ve got
            everything you need to fuel your passion. Explore, learn, and
            connect with a community that shares your love for cars.
          </p>

          <ul className="space-y-10 w-96 text-md">
            <li className="flex items-center gap-12">
              <svg
                preserveAspectRatio="none"
                data-bbox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 200 200"
                role="presentation"
                aria-hidden="true"
              >
                <g>
                  <path
                    d="M200 100c0 55.228-44.772 100-100 100S0 155.228 0 100 44.772 0 100 0s100 44.772 100 100z"
                    fill="white"
                  />
                </g>
              </svg>
              <p>Free shipping on all orders over $75</p>
            </li>
            <li className="grid grid-flow-col items-center gap-12">
              <svg
                preserveAspectRatio="none"
                data-bbox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 200 200"
                role="presentation"
                aria-hidden="true"
              >
                <g>
                  <path
                    d="M200 100c0 55.228-44.772 100-100 100S0 155.228 0 100 44.772 0 100 0s100 44.772 100 100z"
                    fill="white"
                  />
                </g>
              </svg>
              <p>
                Tested & proven before any product lands on our shelves,
                it&apos;s thoroughly tested
              </p>
            </li>
            <li className="flex items-center gap-12">
              <svg
                preserveAspectRatio="none"
                data-bbox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 200 200"
                role="presentation"
                aria-hidden="true"
              >
                <g>
                  <path
                    d="M200 100c0 55.228-44.772 100-100 100S0 155.228 0 100 44.772 0 100 0s100 44.772 100 100z"
                    fill="white"
                  />
                </g>
              </svg>
              <p>Customer service available 24/7</p>
            </li>
          </ul>
        </div>
      </section>
      <hr className="opacity-30 mt-20" />
    </section>
  );
}

export default page;
