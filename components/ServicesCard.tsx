// next
import Image from "next/image";

// types
import { Services } from "@/types/types";

type ServiceCardProps = { service: Services };

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-[414px]">
      <div className="bg-[#0485C6] rounded-full p-3">
        <Image
          src={service.icon}
          alt="Service Icon"
          width={30}
          height={30}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-2 items-center justify-center text-center">
        <h1 className="font-bold text-[20px] leading-[25px]">
          {service.title}
        </h1>
        <p className="font-medium text-[16px] leading-[25px] max-w-[310px]">
          {service.text}
        </p>
      </div>
    </div>
  );
}
