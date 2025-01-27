import ProductTag from "@/app/components/ProductTag";

export default function convertRibbon(ribbon: number) {
  if (ribbon === 0) {
    return <ProductTag content="sale" />;
  }
  if (ribbon === 1) {
    return <ProductTag content="best seller" />;
  }
}
