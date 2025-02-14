import { type ReactNode } from "react";

type BrandProps = {
  children: ReactNode;
};

function Brand({ children }: BrandProps) {
  return (
    <section className="relative w-full aspect-square border border-gray-600">
      {children}
    </section>
  );
}

export default Brand;
