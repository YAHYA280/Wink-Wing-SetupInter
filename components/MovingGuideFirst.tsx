"use client";

import { useMovingGuideData } from "@/services/translationService";

export default function MovingGuideFirst() {
  const { data: translations } = useMovingGuideData();

  // Use fallback values if translations aren't loaded yet
  const title = translations?.AddSearchBuddy?.title || "1. Add Search buddy";
  const text =
    translations?.AddSearchBuddy?.text ||
    "Respond faster together! Enter the email address of your partner, friend, or brother, and receive notifications about new properties together. We only send notifications via email.";
  const buttonText = translations?.AddSearchBuddy?.btn || "Add search buddy";

  return (
    <div className="flex flex-col gap-4 py-4">
      <h1 className="font-bold text-[24px] leading-[24px]">{title}</h1>
      <p className="text-[16px] leading-[24px]">{text}</p>
      <form className="flex flex-wrap items-center justify-center sm:justify-start gap-6">
        <input
          className="border border-[#CED4D9] rounded-lg py-2 px-3"
          type="text"
        />
        <button className="bg-main border border-main rounded-lg py-2 px-10 text-white font-semibold text-lg xl:hover:bg-transparent xl:hover:text-main transition-all duration-300">
          {buttonText}
        </button>
      </form>
    </div>
  );
}
