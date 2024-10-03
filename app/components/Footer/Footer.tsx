import SvgLogo from "@/app/components/Header/SvgLogo";
import FooterSection from "@/app/components/Footer/FooterSection";

import PaymentMethodsSection from "@/app/components/Footer/PaymentMethodsSection";

function Footer() {
  return (
    <section className="mx-12 mb-14 mt-32">
      <div className="grid grid-flow-col mb-16 gap-72 ">
        <SvgLogo width={60} height={60} type="logo" />
        <FooterSection />
      </div>
      <hr className="border border-gray-600 mt-10" />
      <PaymentMethodsSection />
    </section>
  );
}

export default Footer;
