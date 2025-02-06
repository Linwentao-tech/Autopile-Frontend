import { Metadata } from "next";
import { getProducts } from "../actions/getProducts";
import { getShoppingCartItems } from "../actions/shoppingCartItem";
import CartTable from "../components/CartPage/CartTable";

export const metadata: Metadata = {
  title: "Cart",
  description: "Cart page",
};
export default async function CartPage() {
  const products = await getProducts();
  const cartItems = await getShoppingCartItems();
  console.log(cartItems);

  return (
    <div className="m-12">
      <CartTable products={products} cartItems={cartItems} />
    </div>
  );
}

export const revalidate = 0;
