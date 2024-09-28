import Category from "@/app/components/Homepage/Category";
import LearnMore from "@/app/components/Homepage/LearnMore";
import TopSellerContainer from "@/app/components/Homepage/TopSellerContainer";
import ClubJoin from "@/app/components/Homepage/ClubJoin";
import ProductReview from "@/app/components/Homepage/ProductReview";
import Brands from "./components/Homepage/Brands";
function Page() {
  return (
    <div>
      <Category />
      <LearnMore />
      <TopSellerContainer />
      <ClubJoin />
      <ProductReview />
      <Brands />
    </div>
  );
}

export default Page;
