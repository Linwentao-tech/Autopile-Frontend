import { Metadata } from "next";
import { getProducts } from "../actions/getProducts";
import { getShoppingCartItems } from "../actions/shoppingCartItem";
import CartTable from "../components/CartPage/CartTable";
import { auth } from "../auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Cart",
  description: "Cart page",
};
export default async function CartPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  const products = await getProducts();
  const cartItems = await getShoppingCartItems();

  return (
    <div className="m-12">
      <CartTable products={products} cartItems={cartItems} />
    </div>
  );
}

export const revalidate = 0;
