import Cart from "./Cart";
import LoginCart from "./LoginCart";
import SearchForm from "./SearchForm";

import DynamicUserIconBlur from "../DynamicUserIconBlur";

function SearchLoginCartHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-7">
      <SearchForm />
      <div className="grid grid-cols-2 gap-3 mt-4 md:grid-cols-3 md:mr-8 lg:hidden">
        <Cart />
        <LoginCart />
        <div className="col-span-2 flex justify-center md:col-span-1 md:mt-1">
          <DynamicUserIconBlur />
        </div>
      </div>

      <div className="hidden lg:flex lg:items-center lg:gap-7">
        <Cart />
        <LoginCart />
        <DynamicUserIconBlur />
      </div>
    </div>
  );
}

export default SearchLoginCartHeader;
