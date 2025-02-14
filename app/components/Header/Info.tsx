import { Suspense } from "react";
import SearchLoginCartHeader from "./SearchLoginCartHeader";

function Info() {
  return (
    <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row items-center justify-between border-b border-white pb-9 md:pb-6 sm:pb-4">
      <p className="text-xs md:text-base lg:text-lg">
        Free shipping on orders over $75. Call us 123-456-789
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchLoginCartHeader />
      </Suspense>
    </div>
  );
}

export default Info;
