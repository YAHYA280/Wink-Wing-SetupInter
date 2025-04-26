"use client";
// next
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

// translation service
import { useCopyrightData } from "@/services/translationService";

export default function Copyright() {
  // Get the current locale and fetch translations
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  const { data: copyrightData, status } = useCopyrightData();

  // Default content for fallback
  const defaultCopyrightContent = {
    copyright_text: "© 2024 - Winkwing B.V.",
    coc_text: "CoC: 63794144",
    email: "info@winkwing.com",
    links: {
      privacy: "Privacy",
      terms: "Terms",
      cookies: "Cookies",
    }
  };

  // Merge API data with defaults using useMemo
  const content = useMemo(() => {
    if (status === "success" && copyrightData) {
      return {
        ...defaultCopyrightContent,
        ...copyrightData,
      };
    }
    return defaultCopyrightContent;
  }, [copyrightData, status]);

  return (
    <div className="bg-[#1e1e1e] text-white">
      <div className="flex flex-wrap items-center justify-center gap-3 py-8 px-2">
        <span className="text-white text-[20px]">
          {content.copyright_text}
        </span>
        <span className="text-white text-[20px]">{content.coc_text}</span>
        <span className="text-white text-[20px]">{content.email}</span>
        <Link className="text-white text-[20px]" href="/">
          {content.links.privacy}
        </Link>
        <Link className="text-white text-[20px]" href="/">
          {content.links.terms}
        </Link>
        <Link className="text-white text-[20px]" href="/">
          {content.links.cookies}
        </Link>
      </div>
    </div>
  );
}