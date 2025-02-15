import { ChildrenProps } from "@/app/components/InterfaceType";
import ProductSideBar from "@/app/components/ProductSideBar";
import { Suspense } from "react";

function Layout({ children }: ChildrenProps) {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col  md:flex-row gap-12 p-4 sm:p-6 md:p-8">
        <aside className="w-full md:w-72 lg:w-80 flex-shrink-0">
          <div className="md:sticky md:top-8">
            <Suspense>
              <ProductSideBar />
            </Suspense>
          </div>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
