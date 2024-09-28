import { FooterSectionProps } from "@/app/components/InterfaceType";
function FooterSection({ title, items }: FooterSectionProps) {
  return (
    <section className="pt-5">
      <h3 className="font-bold">{title}</h3>
      <ul className="pt-6 text-sm ">
        {items.map((item, index) => (
          <li className="mb-1.5 text-gray-400" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FooterSection;
