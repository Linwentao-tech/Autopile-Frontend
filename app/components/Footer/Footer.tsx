import SvgLogo from "@/app/components/Header/SvgLogo";
import FooterSection from "@/app/components/Footer/FooterSection";
import PolicySection from "@/app/components/Footer/PolicySection";
import PaymentMethodsSection from "@/app/components/Footer/PaymentMethodsSection";

function Footer() {
  const sections = [
    {
      title: "Shop",
      items: [
        "Shop Parts",
        "Wheels & Rims",
        "Engine",
        "Vehicle Body Parts",
        "Accessories",
        "Wholesale",
      ],
    },
    {
      title: "The Company",
      items: ["About Us", "Reviews", "Premium Area", "FAQ"],
    },
    {
      title: "Contact Us",
      items: [
        "info@mysite.com",
        "500 Terry Francine St.",
        "San Francisco,",
        "CA 94158",
        "Tel: 123-456-7890",
      ],
    },
    {
      title: "Follow Us",
      items: ["Facebook", "Instagram", "Youtube", "Twitter"],
    },
  ];

  return (
    <section className="mx-12 mt-36 mb-14">
      <div className="grid grid-cols-5 items-start justify-items-center mb-20">
        <SvgLogo width={60} height={60} type="logo" />
        {sections.map((section, index) => (
          <FooterSection
            key={index}
            title={section.title}
            items={section.items}
          />
        ))}
      </div>
      <PolicySection />
      <PaymentMethodsSection />
    </section>
  );
}

export default Footer;
