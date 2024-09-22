import Navigation from "./Navigation";
import SvgLogo from "./SvgLogo";

function NavigationSection() {
  return (
    <div className="flex justify-between items-center w-full pt-3">
      <SvgLogo width={50} height={50} />
      <Navigation />
    </div>
  );
}

export default NavigationSection;
