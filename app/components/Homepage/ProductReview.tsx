import ReviewCard from "./ReviewCard";
import { Review } from "../InterfaceType";
import { ReviewsFetcher } from "@/app/_lib/DatabaseFetcher";

async function ProductReview() {
  const reviews: Review[] = await ReviewsFetcher();

  return (
    <section className="mx-12 my-16">
      <h1 className="text-4xl">Product Reviews</h1>
      <div className="flex gap-10 items-center mt-9">
        {reviews.map((review) => (
          <ReviewCard
            id={review.id}
            key={review.id}
            img={review.imageUrl}
            title={review.title}
            subtitle={review.subtitle}
            type="homepage"
          />
        ))}
      </div>
    </section>
  );
}

export default ProductReview;
