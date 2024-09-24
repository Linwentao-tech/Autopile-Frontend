import Category from "@/app/components/Homepage/Category";
import LearnMore from "@/app/components/Homepage/LearnMore";
import TopSellerContainer from "@/app/components/Homepage/TopSellerContainer";
import ClubJoin from "@/app/components/Homepage/ClubJoin";
import PageReview from "@/app/components/Homepage/PageReview";
function Page() {
  return (
    <div>
      <Category />
      <LearnMore />
      <TopSellerContainer />
      <ClubJoin />
      <PageReview />
    </div>
  );
}

export default Page;
