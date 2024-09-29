import PriceRangeComponent from "./SideBarExpand";

function ProductSideBar() {
  return (
    <div>
      <h2 className="text-xl">Browse by</h2>
      <hr className="border border-gray-600 my-4 w-56" />
      <ul className="text-md space-y-1.5">
        <li>All Products</li>
        <li>Accessories</li>
        <li>Best Seller</li>
        <li>Engine</li>
        <li>Vehicle Body Parts</li>
        <li>Wheels & Rims</li>
        <li>Wholesale</li>
      </ul>
      <h2 className="text-xl mt-10">Filter by</h2>
      <hr className="border border-gray-600 my-4 w-56" />
      <PriceRangeComponent />
    </div>
  );
}

export default ProductSideBar;
