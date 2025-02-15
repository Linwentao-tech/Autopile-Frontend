import background from "@/public/about-car.jpg";
import Image from "next/image";
export const metadata = {
  title: "About us",
  description: "We Understand Cars",
};
function page() {
  return (
    <section className="px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-16">
      <section className="w-full">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl">We Understand Cars</h1>
        <p className="w-full mt-3 sm:mt-4 lg:mt-5 text-base sm:text-lg lg:text-xl">
          We love cars and know them inside out. From design and performance to
          the latest trends, we&apos;re here to share our expertise. Whether
          you&apos;re an enthusiast or just curious, join us as we explore
          everything that makes cars special.
        </p>
      </section>

      <section className="mt-16 sm:mt-24 lg:mt-48 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        <article className="border p-6 sm:p-8 lg:p-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6">
            Dependability
          </h2>
          <p className="text-base sm:text-lg lg:text-xl">
            We prioritize reliability above all else, ensuring that you can
            count on us whenever you need support. Our commitment to
            dependability means delivering consistent quality and trusted
            service every time.
          </p>
        </article>
        <article className="border p-6 sm:p-8 lg:p-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6">
            Affordability
          </h2>
          <p className="text-base sm:text-lg lg:text-xl">
            Quality doesn&apos;t have to come at a high price. We offer
            competitive pricing and value-driven options, making sure you get
            the best without breaking the bank.
          </p>
        </article>
        <article className="border p-6 sm:p-8 lg:p-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6">
            Availability
          </h2>
          <p className="text-base sm:text-lg lg:text-xl">
            We&apos;re always here when you need us. With flexible scheduling
            and round-the-clock support, we&apos;re ready to assist whenever you
            require our services.
          </p>
        </article>
      </section>

      <section className="relative mt-10 sm:mt-16 lg:mt-20">
        <Image
          src={background}
          alt="car light background image"
          fill
          className="absolute inset-0 z-0 object-cover"
          placeholder="blur"
        />
        <div className="relative z-10 p-4 sm:p-6 lg:p-10 text-white">
          <h1 className="text-xl sm:text-2xl lg:text-3xl max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] leading-normal mb-6 sm:mb-8 lg:mb-10">
            A One-Stop Shop for Automotive Enthusiasts
          </h1>
          <p className="w-full sm:w-2/3 lg:w-1/5 text-base sm:text-lg leading-relaxed mb-12 sm:mb-16 lg:mb-24">
            Welcome to the ultimate destination for car enthusiasts! From the
            latest model reviews to expert maintenance tips, we&apos;ve got
            everything you need to fuel your passion. Explore, learn, and
            connect with a community that shares your love for cars.
          </p>

          <ul className="space-y-6 sm:space-y-8 lg:space-y-10 max-w-[280px] sm:max-w-[340px] lg:max-w-[384px] text-sm sm:text-base lg:text-md">
            <li className="flex items-center gap-6 sm:gap-8 lg:gap-12">
              <svg
                preserveAspectRatio="none"
                data-bbox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 200 200"
                role="presentation"
                aria-hidden="true"
                className="sm:w-[15px] sm:h-[15px]"
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
            <li className="flex items-center gap-6 sm:gap-8 lg:gap-12">
              <svg
                preserveAspectRatio="none"
                data-bbox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 200 200"
                role="presentation"
                aria-hidden="true"
                className="sm:w-[15px] sm:h-[15px]"
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
            <li className="flex items-center gap-6 sm:gap-8 lg:gap-12">
              <svg
                preserveAspectRatio="none"
                data-bbox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 200 200"
                role="presentation"
                aria-hidden="true"
                className="sm:w-[15px] sm:h-[15px]"
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
      <hr className="opacity-30 mt-10 sm:mt-16 lg:mt-20" />
    </section>
  );
}

export default page;
