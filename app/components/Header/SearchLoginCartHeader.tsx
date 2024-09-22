import Cart from "./Cart";
import LoginCart from "./LoginCart";
import SearchForm from "./SearchForm";

function SearchLoginCartHeader() {
  return (
    <div className="flex items-center justify-between gap-7">
      <SearchForm />
      <LoginCart />
      <Cart />
    </div>
  );
}

export default SearchLoginCartHeader;
