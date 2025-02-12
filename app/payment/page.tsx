import { redirect } from "next/navigation";
import { getOrderById } from "../actions/order";
import { createPaymentIntent } from "../actions/payment";
import { type Item } from "../components/InterfaceType";
import PaymentForm from "../components/PaymentForm";
import ProductForm from "../components/ProductForm";

export default async function Payment(props: {
  searchParams: { order: string };
}) {
  const { searchParams } = props;
  const order = await getOrderById(searchParams.order);

  if (order?.data?.paymentStatus !== "Pending") {
    redirect("/");
  }

  const items = order.data.orderItems.map((item: Item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));

  const paymentIntent = await createPaymentIntent({ items: items });
  const clientSecret = paymentIntent.data.client_secret;

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <PaymentForm clientSecret={clientSecret} orderId={order.data.id} />
      <ProductForm orderNumber={searchParams.order} />
    </div>
  );
}
