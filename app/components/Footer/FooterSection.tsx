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
    <section className="space-y-2 text-sm flex-1">
      <h2 className="mb-7 text-xl">Contact Us</h2>
      <Link href="mailto:info@autopile.com" className="opacity-45">
        info@autopile.com
      </Link>
      <address className="opacity-45 leading-relaxed">
        <Link
          href="https://www.google.com/maps/place/Autopile/@-41.0323272,145.8129355,19z/data=!3m1!4b1!4m6!3m5!1s0xaa7bec33fd6fdbbf:0x2d2c61e710085a10!8m2!3d-41.0323282!4d145.8135792!16s%2Fg%2F11vq2r3256?entry=ttu&g_ep=EgoyMDI0MDkyOS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-inherit"
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
    <>
      {footerLinks.map((section) => {
        return (
          <section key={section.title} className="space-y-2 text-sm flex-1">
            <p className="mb-7 text-xl">{section.title}</p>
            {section.links.map((link) => {
              return (
                <div key={link.href} className="mb-2">
                  <Link href={link.href} className="cursor-pointer opacity-45">
                    {link.text}
                  </Link>
                </div>
              );
            })}
          </section>
        );
      })}
      <ContactSection />
    </>
  );
}

export default FooterSection;
