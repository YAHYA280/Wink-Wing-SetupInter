"use client";
// next
import { useRouter } from "next/navigation";

// context
import { useProgress } from "@/context/progressContext";

// components
import Checkbox from "./Checkbox";

export default function DashboardLeftMenu() {
  const guides = [
    {
      id: 1,
      title: "Add Search buddy",
    },
    {
      id: 2,
      title: "Activate WhatsApp notifications",
    },
    {
      id: 3,
      title: "Prepare your standard response",
    },
    {
      id: 4,
      title: "Collect all necessary documents",
    },
    {
      id: 5,
      title: "Spread the word",
    },
    {
      id: 6,
      title: "Write an introduction letter",
    },
    {
      id: 7,
      title: "Sign up for facebook groups",
    },
    {
      id: 8,
      title: "Sign up for new construction projects",
    },
    {
      id: 9,
      title: "Clean up your online presence",
    },
    {
      id: 10,
      title: "Read our viewing tips",
    },
  ];

  const router = useRouter();
  const { goTo } = useProgress();

  function handleMovingGuide() {
    router.push("/moving-guide");
    goTo(0);
  }

  return (
    <div className="border border-[#AEAEAE] h-max rounded-lg p-5">
      <div className="flex flex-col gap-6 border-b border-[#AEAEAE] pb-6">
        <h1 className="font-bold text-4xl text-[#19191A]">Moving Guide</h1>
        <p className="text-[#19191A] text-[16px] leading-[24px] max-w-[700px]">
          Finding a new rental home is not easy. Based on our experience and
          insights from other Winkwing users that successfully found a house, we
          created 10 tips to increase your chances of finding a home.
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
        Continue the guide
      </button>
    </div>
  );
}
