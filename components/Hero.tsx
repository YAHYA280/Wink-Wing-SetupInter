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
    <div className="bg-hero bg-center bg-cover mb-4 md:mb-8 mx-2 md:mx-[30px] rounded-2xl">
      <div className="max-w-[1164px] mx-auto px-3 md:px-6 py-8 md:py-32 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
        {/* hero content */}
        <div className="flex flex-col gap-3 md:gap-[55px] max-w-[600px]">
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[#fff] leading-tight">
            {heroContent.title}
          </h1>
          
          {/* Services section */}
          <div className="flex flex-col gap-2 md:gap-5">
            {/* Mobile: Condensed services */}
            <div className="md:hidden">
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src={heroContent.services[0].icon}
                  alt="Service Icon"
                  width={20}
                  height={20}
                />
                <h2 className="font-bold text-sm text-white">
                  {heroContent.services[0].title}
                </h2>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src={heroContent.services[1].icon}
                  alt="Service Icon"
                  width={20}
                  height={20}
                />
                <h2 className="font-bold text-sm text-white">
                  {heroContent.services[1].title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={heroContent.services[2].icon}
                  alt="Service Icon"
                  width={20}
                  height={20}
                />
                <h2 className="font-bold text-sm text-white">
                  {heroContent.services[2].title}
                </h2>
              </div>
            </div>
            
            {/* Desktop: Full services with descriptions */}
            <div className="hidden md:flex md:flex-col md:gap-5">
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
          </div>
          
          <Link
            className="bg-main border border-main rounded-lg py-2 md:py-5 font-semibold text-sm sm:text-base md:text-xl text-white text-center xl:hover:bg-transparent xl:hover:text-main transition-all duration-300 mt-2 md:mt-0"
            href={localizedHref("/how-it-works")}
          >
            {heroContent.button}
          </Link>
        </div>
      </div>
    </div>
  );
}