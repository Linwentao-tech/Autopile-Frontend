import { getProducts } from "../actions/getProducts";
import { PageProps, Product } from "../components/InterfaceType";
import ProductCardContainer from "../components/ProductCardContainer";
import { auth } from "../auth";

export default async function SearchPage(props: PageProps) {
  const searchParams = props.searchParams;
  const productName = searchParams.productName;
  const session = await auth();

  const products = await getProducts();
  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(productName!.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return (
      <h1 className="text-3xl mb-10 mx-12 text-center">No products found</h1>
    );
  }

  return (
    <div>
      <div className="mx-4 sm:mx-8 lg:mx-56">
        <h1 className="text-4xl sm:text-6xl mb-6 sm:mb-10">Search Results</h1>
        <div className="mb-6 sm:mb-10">{filteredProducts.length} products</div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-7 w-full max-w-screen-2xl mx-auto">
            <ProductCardContainer
              products={filteredProducts}
              isLoggedIn={!!session?.user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
