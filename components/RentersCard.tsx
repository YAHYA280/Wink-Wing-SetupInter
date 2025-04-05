// next
import Image from "next/image";

// types
import { Renter } from "@/types/types";

type RentersCardProps = {
  renter: Renter;
};

export default function RentersCard({ renter }: RentersCardProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center w-[275px]">
        <Image
          className="w-full  object-cover rounded-t-[8px] rounded-b-none"
          src={renter.image}
          alt="Image of a renter"
          width={275}
          height={380}
          loading="lazy"
        />
        <div className="flex flex-col gap-[15px] py-3 bg-[#F8F8F8] rounded-t-none rounded-b-[8px] p-2">
          <h1 className="font-semibold text-lg font-poppins leading-[27px]">
            {renter.name}
          </h1>
          {renter.rating === 5 && (
            <Image
              className="mx-auto"
              src="/renter-rating.svg"
              alt="Rating"
              width={250}
              height={15}
              loading="lazy"
            />
          )}
          <p className="text-[14px]">{renter.text}</p>
        </div>
      </div>
    </>
  );
}
