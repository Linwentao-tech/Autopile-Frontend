import ReviewSection from "../components/ReviewPage/ReviewSection";

function page() {
  return (
    <div className="mx-12 mt-20">
      <section>
        <h1 className="text-6xl">Recommended Products</h1>
        <h2 className="mt-4 text-2xl">Let the community help you shop</h2>
      </section>
      <section>
        <ReviewSection />
      </section>
    </div>
  );
}

export default page;
