import Button from "../Button";
import SvgLogo from "./SvgLogo";

function Advertisement() {
  return (
    <div className="mt-10 pb-10 m-12">
      <p className="text-4xl">Shop Our Premium Auto Parts</p>
      <p className="text-7xl font-bold mt-8 mb-10">
        Build Your Dream Car Today.
        <br />
        Now 15% Off On All Items.
      </p>
      <Button type={{ type: "orange_button", subtype: "shop_now" }}>
        Shop Now
      </Button>
      <div className="flex items-center gap-9">
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
  );
}

export default Advertisement;
