"use client";

// next
import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

// icons
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

// components
import FooterDropDown from "./FooterDropdown";
import LanguageSwitcher from "./LanguageSwitcher";

// service for translations
import { useFooterData } from "@/services/translationService";

// Default footer content (fallback)
const defaultFooterContent = {
  language: "Language",
  country: "Country",
  Links: {
    id: 1,
    title: "More WinkWing",
    links: [
      {
        id: 1,
        title: "How it works",
        href: "/how-it-works",
      },
      {
        id: 2,
        title: "Reviews",
        href: "/reviews",
      },
      {
        id: 3,
        title: "Pricing",
        href: "/pricing",
      },
      {
        id: 4,
        title: "Guides",
        href: "/guides",
      },
      {
        id: 5,
        title: "Contact",
        href: "/contact",
      },
    ],
  },
  Cities: [
    {
      id: 1,
      title: "Find your next home in",
      cities: [
        {
          id: 1,
          title: "Amsterdam",
        },
        {
          id: 2,
          title: "Rotterdam",
        },
        {
          id: 3,
          title: "Utrecht",
        },
        {
          id: 4,
          title: "Haarlem",
        },
        {
          id: 5,
          title: "Den Haag",
        },
      ],
    },
  ],
  Socials: {
    id: 1,
    title: "Follow us",
    socials: [
      {
        id: 1,
        title: "Instagram",
        icon: "FaInstagram",
        href: "https://www.instagram.com/winkwingwinkwing/",
      },
      {
        id: 2,
        title: "X",
        icon: "RiTwitterXFill",
        href: "https://x.com/winkwing",
      },
      {
        id: 3,
        title: "Tiktok",
        icon: "FaTiktok",
        href: "https://www.tiktok.com/@winkwingwinkwing",
      },
      {
        id: 4,
        title: "Facebook",
        icon: "FaFacebookF",
        href: "https://www.facebook.com/winkwingwink/",
      },
    ],
  },
};

// Helper function to get social icon component
const getSocialIcon = (iconName: string) => {
  switch (iconName) {
    case "FaInstagram":
      return <FaInstagram fill="#fff" />;
    case "RiTwitterXFill":
      return <RiTwitterXFill fill="#fff" />;
    case "FaTiktok":
      return <FaTiktok fill="#fff" />;
    case "FaFacebookF":
      return <FaFacebookF fill="#fff" />;
    default:
      return <FaInstagram fill="#fff" />;
  }
};

export default function Footer() {
  // Get translations
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  const { data: footerData, status } = useFooterData();

  // Merge API data with defaults using useMemo
  const footerContent = useMemo(() => {
    if (status === "success" && footerData) {
      return {
        language: footerData.language || defaultFooterContent.language,
        country: footerData.country || defaultFooterContent.country,
        Links: footerData.Links || defaultFooterContent.Links,
        Cities: footerData.Cities || defaultFooterContent.Cities,
        Socials: footerData.Socials || defaultFooterContent.Socials,
      };
    }
    return defaultFooterContent;
  }, [footerData, status]);

  return (
    <footer className="py-24 bg-[#1E1E1E] px-2 md:px-20">
      <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:flex-wrap md:items-start">
        {/* Footer links section */}
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-8">
          <h1 className="font-bold text-[20px] text-white">
            {footerContent.Links.title}
          </h1>
          <div className="flex flex-col justify-center items-start md:items-start md:justify-start">
            {footerContent.Links.links.map((link) => (
              <Link
                className="text-lg text-white xl:hover:underline"
                key={link.id}
                href={`/${locale}${link.href}`}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Cities section */}
        {footerContent.Cities.map((citySection) => (
          <div
            key={citySection.id}
            className="flex flex-col items-center justify-center md:items-start md:justify-start gap-8"
          >
            <h1 className="font-bold text-[20px] text-white">
              {citySection.title}
            </h1>
            <div className="flex flex-col justify-center items-start md:justify-start">
              {citySection.cities.map((city) => (
                <span className="text-lg text-white" key={city.id}>
                  {city.title}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Socials section */}
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-8">
          <h1 className="font-bold text-[20px] text-white">
            {footerContent.Socials.title}
          </h1>
          <div className="flex flex-col justify-center items-start md:justify-start">
            {footerContent.Socials.socials.map((social) => (
              <a
                className="flex items-center gap-5 text-lg text-white xl:hover:underline"
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{getSocialIcon(social.icon)}</span> {social.title}
              </a>
            ))}
          </div>
        </div>

        {/* Language and Country section */}
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-8 ml-8">
          <div className="flex flex-col items-center justify-center md:items-start gap-7">
            <h1 className="font-bold text-[20px] text-white">
              {footerContent.language}
            </h1>
            <LanguageSwitcher />
          </div>
          <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-7 text-white">
            <h1 className="font-bold text-[20px] text-white">
              {footerContent.country}
            </h1>
            <FooterDropDown />
          </div>
        </div>
      </div>
    </footer>
  );
}
