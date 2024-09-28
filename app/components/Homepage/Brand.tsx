import { type ReactNode } from "react";

type BrandProps = {
  children: ReactNode;
};

function Brand({ children }: BrandProps) {
  return (
    <section className="border border-gray-600 relative w-[700px] h-[260px]">
      {children}
    </section>
  );
}

export default Brand;
