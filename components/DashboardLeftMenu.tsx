"use client";
// next
import { useRouter, usePathname } from "next/navigation";

// context
import { useProgress } from "@/context/progressContext";

// components
import Checkbox from "./Checkbox";

export default function DashboardLeftMenu({
  translationData,
}: {
  translationData?: any;
}) {
  // Default guides if translations are not available
  const defaultGuides = [
    { id: 1, title: "Add Search buddy" },
    { id: 2, title: "Activate WhatsApp notifications" },
    { id: 3, title: "Prepare your standard response" },
    { id: 4, title: "Collect all necessary documents" },
    { id: 5, title: "Spread the word" },
    { id: 6, title: "Write an introduction letter" },
    { id: 7, title: "Sign up for facebook groups" },
    { id: 8, title: "Sign up for new construction projects" },
    { id: 9, title: "Clean up your online presence" },
    { id: 10, title: "Read our viewing tips" },
  ];

  // Create guides array from translations or use defaults
  const guides = translationData
    ? [
        { id: 1, title: translationData.first_guide || defaultGuides[0].title },
        {
          id: 2,
          title: translationData.second_guide || defaultGuides[1].title,
        },
        { id: 3, title: translationData.third_guide || defaultGuides[2].title },
        { id: 4, title: translationData.forth_guide || defaultGuides[3].title },
        { id: 5, title: translationData.fifth_guide || defaultGuides[4].title },
        { id: 6, title: translationData.sixth_guide || defaultGuides[5].title },
        {
          id: 7,
          title: translationData.seventh_guide || defaultGuides[6].title,
        },
        {
          id: 8,
          title: translationData.eighth_guide || defaultGuides[7].title,
        },
        { id: 9, title: translationData.ninth_guide || defaultGuides[8].title },
        {
          id: 10,
          title: translationData.tenth_guide || defaultGuides[9].title,
        },
      ]
    : defaultGuides;

  const router = useRouter();
  const pathname = usePathname();
  const { goTo } = useProgress();

  // Extract the current locale from the path
  const getLocale = () => {
    const pathParts = pathname.split("/");
    return pathParts.length > 1 ? pathParts[1] : "en"; // Default to 'en' if no locale found
  };

  function handleMovingGuide() {
    const locale = getLocale();
    router.push(`/${locale}/moving-guide`);
    goTo(0);
  }

  return (
    <div className="border border-[#AEAEAE] h-max rounded-lg p-5">
      <div className="flex flex-col gap-6 border-b border-[#AEAEAE] pb-6">
        <h1 className="font-bold text-4xl text-[#19191A]">
          {translationData?.title || "Moving Guide"}
        </h1>
        <p className="text-[#19191A] text-[16px] leading-[24px] max-w-[700px]">
          {translationData?.text ||
            "Finding a new rental home is not easy. Based on our experience and insights from other Winkwing users that successfully found a house, we created 10 tips to increase your chances of finding a home."}
        </p>
      </div>
      <div className="flex flex-col gap-6 py-6">
        {guides.map((guide) => (
          <label key={guide.id} className="flex items-center gap-3 relative">
            <Checkbox id={String(guide.id)} />
            <span className="font-bold text-sm sm:text-lg text-black cursor-pointer">
              {guide.title}
            </span>
          </label>
        ))}
      </div>
      <button
        onClick={handleMovingGuide}
        className="bg-main border border-main rounded-lg py-3 font-semibold text-lg text-white w-full xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
      >
        {translationData?.button || "Continue the guide"}
      </button>
    </div>
  );
}
