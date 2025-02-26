import Image from "next/image";
import { type PaymentIconProp } from "@/app/components/InterfaceType";

function PaymentIcon({ src }: PaymentIconProp) {
  return (
    <Image
      src={src}
      alt={`${src} icon`}
      quality={70}
      width={40}
      height={25}
      loading="lazy"
      sizes="40px"
    />
  );
}

export default PaymentIcon;
