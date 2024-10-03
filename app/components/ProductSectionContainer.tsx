import ProductSection from "./ProductSection";

function ProductSectionContainer({ productInfo }: { productInfo: string }) {
  return (
    <div>
      <ProductSection title={"Product Info"} info={productInfo} />
      <ProductSection
        title={"Return and Refund Policy"}
        info={
          "We offer a 30-day return policy for unused items in original packaging. Refunds will be issued to the original payment method within 5-10 business days of receiving the returned item. Shipping costs are non-refundable. Damaged or defective items may be exchanged for identical products. We reserve the right to deny returns that don't meet our criteria. Contact customer service for return authorization before shipping items back."
        }
      />
      <ProductSection
        title={"Shipping Info"}
        info={
          "We deliver Australia-wide via Australia Post. Standard shipping takes 3-7 business days. Express shipping available for 1-3 business days delivery. Rural areas may experience delays. Tracking provided for all orders. Free shipping on orders over $75. International shipping not available. Order by 2 PM AEST for same-day dispatch on business days. Contact us for bulk orders."
        }
      />
    </div>
  );
}

export default ProductSectionContainer;
