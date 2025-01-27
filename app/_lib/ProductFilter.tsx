import { PageProps, Product } from "../components/InterfaceType";

function ProductFilter({
  searchParams,
  products,
}: PageProps & { products: Product[] }) {
  const minPrice: number | undefined =
    Number(searchParams?.minPrice) || undefined;
  const maxPrice: number | undefined =
    Number(searchParams?.maxPrice) || undefined;

  return products.filter((product: Product) => {
    const price = product.comparePrice || product.price;
    if (minPrice && maxPrice) {
      return price >= minPrice && price <= maxPrice;
    } else if (minPrice) {
      return price >= minPrice;
    } else if (maxPrice) {
      return price <= maxPrice;
    } else {
      return true;
    }
  });
}

export default ProductFilter;
