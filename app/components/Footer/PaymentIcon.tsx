import Image from "next/image";
import { type PaymentIconProp } from "@/app/components/InterfaceType";

function PaymentIcon({ src }: PaymentIconProp) {
  return <Image src={src} alt={`${src} icon`} quality={70} />;
}

export default PaymentIcon;
