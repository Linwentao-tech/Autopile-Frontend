import SvgLogo from "@/app/components/Header/SvgLogo";
import FooterSection from "@/app/components/Footer/FooterSection";
import PaymentMethodsSection from "@/app/components/Footer/PaymentMethodsSection";

function Footer() {
  return (
    <section className="mx-4 md:mx-8 lg:mx-16">
      <div className="lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-44">
        <div className="lg:flex-shrink-0 mt-8 lg:mt-0">
          <SvgLogo width={60} height={60} type="logo" />
        </div>
        <FooterSection />
      </div>
      <hr className="border border-gray-600" />
      <PaymentMethodsSection />
    </section>
  );
}

export default Footer;
