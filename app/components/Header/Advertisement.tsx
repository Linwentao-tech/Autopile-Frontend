import Button from "../Button";
import SvgLogo from "./SvgLogo";

function Advertisement() {
  return (
    <div className="mt-10 pb-10 m-12 ">
      <p className="text-2xl">Shop Our Premium Auto Parts</p>
      <h1 className="text-2xl  md:text-5xl lg:text-6xl font-bold mt-6 lg:mt-8 mb-6 sm:mb-8 lg:mb-10">
        Build Your Dream Car Today.
        <br className="hidden sm:block" />
        <span className="block sm:inline">Now 15% Off On All Items.</span>
      </h1>
      <Button type={{ type: "orange_button", subtype: "shop_now" }}>
        Shop Now
      </Button>
      <div className="w-full overflow-x-auto">
        <div className="lg:flex lg:space-x-16 lg:flex-row   md:flex md:space-x-4 lg:text-lg md:text-md text-sm flex flex-col">
          <SvgLogo
            width={50}
            height={50}
            type="iconA"
            text={["Free Shipping", "On all orders over 75$"]}
          />
          <SvgLogo
            width={50}
            height={50}
            type="iconB"
            text={["Tested & Proven", "Highest quality testing standards"]}
          />
          <SvgLogo
            width={50}
            height={50}
            type="iconC"
            text={["Customer Service", "Available 24/7"]}
          />
        </div>
      </div>
    </div>
  );
}

export default Advertisement;
