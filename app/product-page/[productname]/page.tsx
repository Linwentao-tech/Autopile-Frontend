import categoryConverter from "@/app/_lib/utils/categoryConverter";
import { getProducts } from "@/app/actions/getProducts";
import DynamicProductPageBlur from "@/app/components/DynamicProductPageBlur";
import { Product } from "@/app/components/InterfaceType";
import ProductSectionContainer from "@/app/components/ProductSectionContainer";
import ProductSubmitComponent from "@/app/components/ProductSubmitComponent";
import Link from "next/link";
import ProductReviewSection from "@/app/components/ProductReviewSection";
import { auth } from "@/app/auth";
import { getReviews } from "@/app/actions/Review";
export async function generateMetadata(props: {
  params: Promise<{ productname: string }>;
}) {
  const params = await props.params;
  const products = await getProducts();
  const productName = reverseFormat(params.productname);

  const product = products.find(
    (product: Product) => product.name === productName
  );
  if (product?.name === "gps") {
    product.name = "GPS";
  }

  return {
    title: product ? `${product.name}` : "Product Not Found",
    description: product ? product.productDescription : "Product not found",
  };
}
function reverseFormat(input: string) {
  if (input === "gps") {
    return "GPS";
  }
  return input
    .split("-")
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : ""))
    .join(" ");
}

async function ProductPage(props: {
  params: Promise<{ productname: string }>;
}) {
  const session = await auth();
  console.log(session);

  const params = await props.params;
  const products = await getProducts();
  const product = products.find(
    (product: Product) => product.name === reverseFormat(params.productname)
  );

  if (!product) {
    return (
      <div className="flex items-center justify-center p-12 text-7xl">
        Product not found
      </div>
    );
  }

  const {
    id,
    name,
    category,
    productMedias,
    productDescription,
    comparePrice,
    price,
    productInfo,
  } = product;

  const reviews = await getReviews(id);

  return (
    <div className="container mx-auto px-4">
      <nav className="text-sm mb-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/category/${categoryConverter(category)}`}
          className="hover:underline capitalize"
        >
          {categoryConverter(category)}
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
          <DynamicProductPageBlur src={productMedias[0].fullUrl} name={name} />
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
          <span className="text-2xl">
            ${comparePrice ? comparePrice : price}
          </span>
          <span className="text-sm">Quantity</span>
          <ProductSubmitComponent
            id={id}
            name={name}
            media={productMedias}
            formattedComparePrice={comparePrice}
            formattedPrice={price}
          />
          <ProductSectionContainer productInfo={productInfo} />
        </div>
      </div>
      <section className="mx-16 mt-16">
        <ProductReviewSection
          userId={session?.user?.id}
          productId={id}
          reviews={reviews}
        />
      </section>
    </div>
  );
}

export default ProductPage;
