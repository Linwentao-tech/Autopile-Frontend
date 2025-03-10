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

// Add generateStaticParams
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product: Product) => ({
    productname: product.name
      .toLowerCase()
      .split(" ")
      .filter((word: string) => word.trim() !== "")
      .join("-"),
  }));
}

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="text-sm mb-4 sm:mb-6 lg:mb-8">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        <div className="flex flex-col space-y-6 sm:space-y-8">
          <DynamicProductPageBlur src={productMedias[0].fullUrl} name={name} />
          <p className="text-base sm:text-lg text-zinc-300 px-4 sm:px-6 lg:px-8">
            {productDescription}
          </p>
        </div>
        <div className="flex flex-col space-y-5 w-full lg:w-4/5 px-4 sm:px-6">
          <h1
            className={`${
              name.toLowerCase() === "gps" ? "uppercase" : ""
            } text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold`}
          >
            {name}
          </h1>
          <span className="text-xl sm:text-2xl lg:text-3xl text-orange-500">
            ${comparePrice ? comparePrice : price}
          </span>
          <span className="text-sm sm:text-base text-zinc-400">Quantity</span>
          <ProductSubmitComponent
            id={id}
            name={name}
            media={productMedias}
            formattedComparePrice={comparePrice}
            formattedPrice={price}
            isLoggedIn={session?.user?.email ? true : false}
          />
          <ProductSectionContainer productInfo={productInfo} />
        </div>
      </div>
      <section className="mt-12 sm:mt-16 lg:mt-20">
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
