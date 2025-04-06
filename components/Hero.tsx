// components/Hero.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useHomePageData } from "@/services/translationService";

// Default hero content as fallback
const defaultHeroContent = {
  title: "Find your next home before the pizza",
  button: "Discover all benefits",
  services: [
    {
      id: 1,
      title: "Receive real-time alerts",
      text: "We send you a notification on WhatsApp or e-mail within 60 seconds.",
      icon: "/hero-services-one.svg",
    },
    {
      id: 2,
      title: "Automate your search",
      text: "We scan 750+ rental websites to find your ideal home.",
      icon: "/hero-services-two.svg",
    },
    {
      id: 3,
      title: "Less stress, more viewings",
      text: "Our tools help you find a home in weeks instead of months.",
      icon: "/hero-services-three.svg",
    },
  ],
};

export default function Hero() {
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);

  // Use our custom hook to fetch the home page data
  const { data: homePageData, status } = useHomePageData();

  // Extract hero data from the response when it's available
  const heroContent = useMemo(() => {
    if (status === "success" && homePageData?.Hero) {
      return {
        title: homePageData.Hero.title || defaultHeroContent.title,
        button: homePageData.Hero.button || defaultHeroContent.button,
        services: homePageData.Hero.services || defaultHeroContent.services,
      };
    }
    return defaultHeroContent;
  }, [homePageData, status]);

  // Helper function to localize href
  const localizedHref = (href: string) =>
    href.startsWith("/") ? `/${locale}${href}` : href;

  return (
    <div className="bg-hero bg-center bg-cover mb-8 mx-2 md:mx-[30px] rounded-2xl pt-12">
      <div className="max-w-[1164px] min-h-screen mx-auto px-2 py-32">
        {/* hero content */}
        <div className="flex flex-col gap-[55px] max-w-[600px]">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#fff]">
            {heroContent.title}
          </h1>
          <div className="flex flex-col gap-5">
            {heroContent.services.map((service) => (
              <div
                className="flex flex-col items-start gap-4 sm:flex-row"
                key={service.id}
              >
                <Image
                  className="text-white"
                  src={service.icon}
                  alt="Service Image"
                  width={30}
                  height={30}
                />
                <div>
                  <h1 className="font-bold text-lg text-white">
                    {service.title}
                  </h1>
                  <p className="text-lg max-w-[480px] text-white">
                    {service.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            className="bg-main border border-main rounded-lg py-5 font-semibold text-lg sm:text-xl text-white text-center xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
            href={localizedHref("/how-it-works")}
          >
            {heroContent.button}
          </Link>
        </div>
      </div>
    </div>
  );
}
