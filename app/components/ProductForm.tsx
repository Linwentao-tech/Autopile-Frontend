import { getOrderById } from "@/app/actions/order";
import { getProducts } from "@/app/actions/getProducts";
import Image from "next/image";

interface OrderItem {
  productId: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  productMedias: {
    fullUrl: string;
  }[];
}

export default async function ProductForm({
  orderNumber,
}: {
  orderNumber: string;
}) {
  const [orderResponse, productsResponse] = await Promise.all([
    getOrderById(orderNumber),
    getProducts(),
  ]);

  const order = orderResponse.data;
  const products = productsResponse;

  const getProductDetails = (productId: string) => {
    return products.find((product: Product) => product.id === productId);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6">
      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800">
        <h2 className="text-xl font-medium text-white mb-6">Order Summary</h2>

        <div className="space-y-4">
          {order.orderItems.map((item: OrderItem) => {
            const product = getProductDetails(item.productId);
            if (!product) return null;

            return (
              <div
                key={item.productId}
                className="flex items-center gap-4 bg-black/20 p-4 rounded-lg"
              >
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image
                    src={product.productMedias[0].fullUrl}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">
                    {product.name}
                  </h4>
                  <p className="text-zinc-400">Quantity: {item.quantity}</p>
                  <p className="text-white">
                    ${(product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-zinc-800">
          <div className="space-y-2">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span>${order.subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Delivery Fee</span>
              <span>${order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-medium text-white pt-2 border-t border-zinc-800">
              <span>Total</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
