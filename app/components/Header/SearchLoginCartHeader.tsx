import Cart from "./Cart";
import LoginCart from "./LoginCart";
import SearchForm from "./SearchForm";

import DynamicUserIconBlur from "../DynamicUserIconBlur";

async function SearchLoginCartHeader() {
  return (
    <div className="flex items-center justify-between gap-7">
      <SearchForm />
      <Cart />
      <LoginCart />
      <DynamicUserIconBlur />
    </div>
  );
}

export default SearchLoginCartHeader;
