import Link from "next/link";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { href: "/category/all-products", text: "Shop Parts" },
      { href: "/category/wheels-and-rims", text: "Wheels & Rims" },
      { href: "/category/engine", text: "Engine" },
      { href: "/category/vehicle-body-parts", text: "Vehicle Body Parts" },
      { href: "/category/accessories", text: "Accessories" },
      { href: "/category/wholesale", text: "Wholesale" },
    ],
  },
  {
    title: "The Company",
    links: [
      { href: "/about-us", text: "About Us" },
      { href: "/reviews", text: "Reviews" },
      { href: "/premium-area", text: "Premium Area" },
    ],
  },
];

function ContactSection() {
  return (
    <section className="space-y-2 text-sm w-full md:flex-1 lg:text-left">
      <h2 className="md-4 md:mb-7 text-lg md:text-xl">Contact Us</h2>
      <Link
        href="mailto:info@autopile.com"
        className="block opacity-45 hover:opacity-75 transition-opacity"
      >
        info@autopile.com
      </Link>
      <address className="opacity-45 leading-relaxed not-italic">
        <Link
          href="https://www.google.com/maps/place/Autopile/@-41.0323272,145.8129355,19z/"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-inherit hover:opacity-75 transition-opacity"
        >
          10 Fairlands Dr,
          <br />
          Somerset
          <br />
          TAS 7322
        </Link>
      </address>
    </section>
  );
}

function FooterSection() {
  return (
    <div className="flex flex-row items-center justify-center my-10 lg:w-full lg:justify-end">
      <div className="inline-grid grid-cols-1 space-y-8 md:space-y-0 text-center md:grid-cols-3 md:gap-12 lg:grid-cols-4 lg:gap-16 lg:w-3/4">
        {footerLinks.map((section) => (
          <section key={section.title} className="text-sm lg:text-left">
            <p className="mb-4 md:mb-7 text-lg md:text-xl">{section.title}</p>
            <div className="space-y-2">
              {section.links.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="cursor-pointer opacity-45 hover:opacity-75 transition-opacity"
                  >
                    {link.text}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))}
        <ContactSection />
      </div>
    </div>
  );
}

export default FooterSection;
