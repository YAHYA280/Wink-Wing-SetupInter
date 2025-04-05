"use client";
// next
import { useState } from "react";

// icons
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

type FaqCardProps = {
  title: string;
  content: string;
  i: number;
};

export default function FaqCard({ title, content, i }: FaqCardProps) {
  const [selected, setSelected] = useState<number | null>(null);

  //
  const toggle = (i: number) => {
    if (selected == i) return setSelected(null);

    setSelected(i);
  };
  return (
    <div className="flex flex-col gap-5 bg-[#FFF7F5] p-6 w-full lg:w-[700px] rounded-[8px]">
      <div
        onClick={() => toggle(i)}
        className="flex items-center justify-between cursor-pointer"
      >
        {/* title of faq */}
        <h1 className="font-extrabold text-left text-lg text-[#FF4500]">
          {title}
        </h1>
        {/* logic of faq icon */}
        <span>{selected == i ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </div>
      <div
        className={
          selected == i
            ? "text-[#474747] font-medium text-lg leading-[22px] text-left"
            : "text-[#474747] font-medium text-lg leading-[22px] text-left hidden"
        }
      >
        {content}
      </div>
    </div>
  );
}
