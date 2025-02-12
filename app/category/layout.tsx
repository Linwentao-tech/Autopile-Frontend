import { ChildrenProps } from "@/app/components/InterfaceType";
import ProductSideBar from "@/app/components/ProductSideBar";
import { Suspense } from "react";

function Layout({ children }: ChildrenProps) {
  return (
    <div className="mx-12 flex justify-start gap-7">
      <Suspense>
        <ProductSideBar />
      </Suspense>
      <main className="w-full">{children}</main>
    </div>
  );
}

export default Layout;
