"use client";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useHomePageData } from "@/services/translationService";

const defaultRentalHeroContent = {
  title: "Find your next rental home.",
  subtitle: "Let WinkWing Help",
  text: "Moving is stressful. WinkWing helps you by searching for apartments, scanning 750+ websites every minute. The only thing you still have to do is respond to all your matches.",
  button: "Discover all benefits",
};

export default function RentalHero({ bg }: { bg: string }) {
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);

  const { data: homePageData, status } = useHomePageData();

  const content = useMemo(() => {
    if (
      status === "success" &&
      homePageData?.RentalHero &&
      homePageData.RentalHero.length > 0
    ) {
      const rentalHero = homePageData.RentalHero[0];
      return {
        title: rentalHero.title || defaultRentalHeroContent.title,
        subtitle: rentalHero.subtitle || defaultRentalHeroContent.subtitle,
        text: rentalHero.text || defaultRentalHeroContent.text,
        button: rentalHero.button || defaultRentalHeroContent.button,
      };
    }
    return defaultRentalHeroContent;
  }, [homePageData, status]);

  const localizedHref = (href: string) =>
    href.startsWith("/") ? `/${locale}${href}` : href;

  // Parse subtitle to separate parts around the "WinkWing" string if present
  const subtitleParts = useMemo(() => {
    const parts = content.subtitle.split("WinkWing");
    return {
      before: parts[0] || "",
      after: parts.length > 1 ? parts[1] : "",
    };
  }, [content.subtitle]);

  return (
    <div className={`bg-[${bg}] py-24 relative z-20`}>
      <div className="flex flex-col items-center justify-center gap-[60px] lg:flex-row lg:justify-between px-2 max-w-[1164px] mx-auto">
        <Image
          src="/rentalhero.png"
          alt="Hero Image"
          width={1920}
          height={1080}
          layout="responsive"
          loading="lazy"
          priority={false}
        />

        <div className="flex flex-col items-center justify-center text-center gap-7 lg:min-w-[600px]">
          <div>
            <h1 className="font-extrabold text-center text-4xl  text-[#003956] md:text-[50px] md:leading-[60px]">
              {content.title}
            </h1>

            <h1 className="flex items-center justify-center font-extrabold  text-4xl md:text-[60px] md:leading-[70px] text-[#0485C6]">
              Let
              <Image
                className="w-[200px] mx-3 mt-2"
                src="/winkwing-logo.svg"
                alt="Logo"
                width={200}
                height={41}
                loading="lazy"
              />
              help.
            </h1>
          </div>

          {/* text */}
          <p className="text-[16px] leading-[24px] max-w-[520px]">
            {content.text}
          </p>
          {/* button */}
          <Link
            href="/how-it-works"
            className="bg-main text-white border border-main text-[20px] py-2 px-[50px] font-semibold  xl:hover:bg-transparent xl:hover:text-main rounded-lg transition-all duration-300 ease-in-out"
          >
            {content.button}
          </Link>
        </div>
      </div>
    </div>
  );
}
