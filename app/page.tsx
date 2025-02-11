import Category from "@/app/components/Homepage/Category";
import LearnMore from "@/app/components/Homepage/LearnMore";
import TopSellerContainer from "@/app/components/Homepage/TopSellerContainer";
import ClubJoin from "@/app/components/Homepage/ClubJoin";

import Brands from "./components/Homepage/Brands";

async function Page() {
  return (
    <div>
      <Category />
      <LearnMore />
      <TopSellerContainer />
      <ClubJoin />
      <Brands />
    </div>
  );
}

export default Page;
