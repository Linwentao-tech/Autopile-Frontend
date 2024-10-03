import { ProductFetcher } from "@/app/_lib/DatabaseFetcher";
import Button from "@/app/components/Button";
import DynamicProductPageBlur from "@/app/components/DynamicProductPageBlur";
import ProductSectionContainer from "@/app/components/ProductSectionContainer";

import Link from "next/link";

function reverseFormat(input: string) {
  return input
    .split("-")
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : ""))
    .join(" ");
}

async function ProductPage({ params }: { params: { productname: string } }) {
  const products = await ProductFetcher();
  const product = products.find(
    (product) => product.name === reverseFormat(params.productname)
  );

  if (!product) {
    return (
      <div className="flex items-center justify-center p-12 text-7xl">
        Product not found
      </div>
    );
  }

  const {
    name,
    productType,
    media,
    productDescription,
    formattedComparePrice,
    formattedPrice,
    productInfo,
  } = product;

  return (
    <div className="container mx-auto px-4">
      <nav className="text-sm mb-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/category/${productType
            .toLowerCase()
            .replace(/\s+&\s+/g, "-and-")
            .replace(/\s+/g, "-")}`}
          className="hover:underline capitalize"
        >
          {productType}
        </Link>
        <span className="mx-2">/</span>
        <span
          className={`${
            name.toLowerCase() === "gps" ? "uppercase" : ""
          } opacity-60`}
        >
          {name}
        </span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-8">
          <DynamicProductPageBlur src={media[0].fullUrl} name={name} />
          <p className="text-base mx-16">{productDescription}</p>
        </div>
        <div className="flex flex-col justify-start space-y-5 w-1/2">
          <h1
            className={`${
              name.toLowerCase() === "gps" ? "uppercase" : ""
            } text-4xl mb-4`}
          >
            {name}
          </h1>
          <span className="text-lg opacity-70">
            {formattedComparePrice ? (
              <>
                <s>{formattedPrice}</s> {formattedComparePrice}
              </>
            ) : (
              formattedPrice
            )}
          </span>
          <span className="text-sm">Quantity</span>
          <input
            defaultValue="1"
            type="number"
            className="w-20 text-white px-4 py-2 bg-black border-2 border-white rounded-lg hover:border-orange-500 focus:outline-none focus:border-orange-500 transition-colors duration-300"
            max="10"
            min="1"
          ></input>
          <Button type="Add_to_cart_productPage">Add to cart</Button>
          <Button type="Buy_now">Buy Now</Button>
          <ProductSectionContainer productInfo={productInfo} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
