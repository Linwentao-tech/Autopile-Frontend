import { getProducts } from "../actions/getProducts";
import { PageProps, Product } from "../components/InterfaceType";
import ProductCardContainer from "../components/ProductCardContainer";
export default async function SearchPage(props: PageProps) {
  const searchParams = props.searchParams;
  const productName = searchParams.productName;
  console.log(productName);
  const products = await getProducts();
  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(productName!.toLowerCase())
  );
  if (filteredProducts.length === 0) {
    return (
      <h1 className=" text-3xl mb-10 mx-12 text-center">No products found</h1>
    );
  }
  return (
    <div>
      <div className="mx-56">
        <h1 className=" text-6xl mb-10">Search Results</h1>
        <p className="mb-10">{filteredProducts.length} products</p>
        <div className="grid grid-cols-4 gap-9 ">
          <ProductCardContainer products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
