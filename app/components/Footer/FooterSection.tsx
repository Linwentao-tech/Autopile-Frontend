import Link from "next/link";

function FooterSection() {
  return (
    <>
      <ul className="space-y-2 text-sm flex-1">
        <li className="mb-7 text-xl">Shop</li>
        <li className="cursor-pointer opacity-45">Shop Parts</li>
        <li className="cursor-pointer opacity-45">Wheels & Rims</li>
        <li className="cursor-pointer opacity-45">Engine</li>
        <li className="cursor-pointer opacity-45">Vehicle Body Parts</li>
        <li className="cursor-pointer opacity-45">Accessories</li>
        <li className="cursor-pointer opacity-45">Wholesale</li>
      </ul>
      <section className="text-sm space-y-2">
        <p className="mb-7 text-xl">The Company</p>
        <div className="mb-2">
          <Link href="/about-us" className="cursor-pointer opacity-45">
            About Us
          </Link>
        </div>
        <div className="mb-2">
          <Link href="/reviews" className="cursor-pointer opacity-45">
            Reviews
          </Link>
        </div>
        <div className="mb-2">
          <Link href="/premium-area" className="cursor-pointer opacity-45">
            Premium Area
          </Link>
        </div>
      </section>
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
    </>
  );
}

export default FooterSection;
