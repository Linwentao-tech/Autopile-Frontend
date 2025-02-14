import Navigation from "./Navigation";
import SvgLogo from "./SvgLogo";

function NavigationSection() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full pt-3 px-4 sm:px-6 gap-8 ">
      <SvgLogo width={60} height={60} type="logo" />
      <Navigation />
    </div>
  );
}

export default NavigationSection;
