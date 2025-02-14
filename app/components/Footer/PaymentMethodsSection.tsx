import MasterCard from "@/public/MasterCard.png";
import UnionPay from "@/public/UnionPay.png";
import Diners from "@/public/Diners.png";
import AmericanExpress from "@/public/AmericanExpress.png";
import Discover from "@/public/Discover.png";
import Visa from "@/public/Visa.png";
import PaymentIcon from "./PaymentIcon";

function PaymentMethodsSection() {
  return (
    <>
      <div className="flex justify-center my-4 md:my-6">
        <h3 className="font-bold text-sm md:text-base">Payment Methods</h3>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
        <PaymentIcon src={MasterCard} />
        <PaymentIcon src={UnionPay} />
        <PaymentIcon src={Diners} />
        <PaymentIcon src={AmericanExpress} />
        <PaymentIcon src={Discover} />
        <PaymentIcon src={Visa} />
      </div>
      <hr className="border border-gray-600 mt-6 md:mt-10" />
    </>
  );
}

export default PaymentMethodsSection;
