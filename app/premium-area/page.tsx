import Form from "@/app/components/PremiumPage/Form";
export const metadata = {
  title: "Premium Area",
  description: "Premium Area Page",
};
function page() {
  return (
    <section className="px-4 sm:px-8 lg:px-12 pt-12 sm:pt-16 lg:pt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 justify-center items-center">
      <div className="text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl leading-normal">
          Sign up today and get
          <br className="hidden sm:block" />
          exclusive club member
          <br className="hidden sm:block" />
          benefits
        </h1>
        <h2 className="text-base sm:text-lg lg:text-xl mt-3 sm:mt-4 lg:mt-5 leading-normal">
          Our premium membership will give you{" "}
          <br className="hidden sm:block" />
          exclusive access to our early-bird sales,
          <br className="hidden sm:block" />
          new arrivals and other special offers.
        </h2>
      </div>
      <Form />
    </section>
  );
}

export default page;
