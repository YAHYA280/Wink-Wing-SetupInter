"use client";
// next
import { useRouter } from "next/navigation";

// context
import { useProgress } from "@/context/progressContext";

export default function DashboardInfoViewingRes() {
  const router = useRouter();
  const { goTo } = useProgress();

  function handleViewingRes() {
    router.push("/moving-guide");
    goTo(3);
  }

  return (
    <div className="flex flex-col gap-4 w-full border-b pb-10 md:border-b-0 md:border-r md:pb-0 border-[#AEAEAE]">
      <h1 className="font-bold text-lg text-[#19191A]">
        Standard viewing Response
      </h1>
      <button
        onClick={handleViewingRes}
        className="w-max text-lg text-[#1C46D9] xl:hover:underline"
      >
        Edit
      </button>
    </div>
  );
}
