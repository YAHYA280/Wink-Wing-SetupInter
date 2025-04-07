"use client";
// next
import { useRouter, usePathname } from "next/navigation";

// context
import { useProgress } from "@/context/progressContext";

export default function DashboardInfoViewingRes() {
  const router = useRouter();
  const pathname = usePathname();
  const { goTo } = useProgress();

  // Extract the current locale from the path
  const getLocale = () => {
    const pathParts = pathname.split("/");
    return pathParts.length > 1 ? pathParts[1] : "en"; // Default to 'en' if no locale found
  };

  function handleViewingRes() {
    const locale = getLocale();
    router.push(`/${locale}/moving-guide`);
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
