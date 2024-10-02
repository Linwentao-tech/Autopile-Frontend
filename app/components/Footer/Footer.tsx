import SvgLogo from "@/app/components/Header/SvgLogo";
import FooterSection from "@/app/components/Footer/FooterSection";
import PolicySection from "@/app/components/Footer/PolicySection";
import PaymentMethodsSection from "@/app/components/Footer/PaymentMethodsSection";
import Link from "next/link";

function Footer() {
  return (
    <section className="mx-12 mb-14 mt-32">
      <div className="grid grid-flow-col mb-16 gap-72 ">
        <SvgLogo width={60} height={60} type="logo" />
        <FooterSection />
      </div>
      <PolicySection />
      <PaymentMethodsSection />
    </section>
  );
}

export default Footer;
