import Form from "@/app/components/PremiumPage/Form";
import { ScrollToTop } from "@/app/components/ScrollTop";
export const metadata = {
  title: "Premium Area",
  description: "Premium Area Page",
};
function page() {
  return (
    <section className="px-12 pt-24 grid-cols-2 grid">
      <ScrollToTop />
      <div>
        <h1 className="text-4xl leading-normal">
          Sign up today and get
          <br />
          exclusive club member
          <br />
          benefits
        </h1>
        <h2 className="text-xl mt-5 leading-normal">
          Our premium membership will give you <br />
          exclusive access to our early-bird sales,
          <br /> new arrivals and other special offers.{" "}
        </h2>
      </div>
      <Form />
    </section>
  );
}

export default page;
