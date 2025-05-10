"use client";

// next
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

// icons
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

// components
import LanguageSwitcher from "./LanguageSwitcher";

// service for translations
import { useFooterData } from "@/services/translationService";

// context
import { useUserPreferences } from "@/context/userPreferencesContext";

// Define city coordinates for the Netherlands cities
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  "Amsterdam": { lat: 52.3675734, lng: 4.9041389 },
  "Rotterdam": { lat: 51.9244, lng: 4.4777 },
  "Utrecht": { lat: 52.0907, lng: 5.1214 },
  "Haarlem": { lat: 52.3874, lng: 4.6462 },
  "Den Haag": { lat: 52.0705, lng: 4.3007 },
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
  const router = useRouter();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  const { data: footerData, status } = useFooterData();

  // Get user preferences context
  const {
    setCountry,
    setSelectedCountryValue,
    setSelectedCity,
    setSelectedLat,
    setSelectedLng,
    setSelectedNeighbourhood,
  } = useUserPreferences();

  // Default footer content (fallback)
  const defaultFooterContent = {
    language: "Language",
    country: "Country",
    feedbackTitle: "Let's make WinkWing better together!",
    feedbackLink: "Suggest your ideas.",
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
  // test
  // Merge API data with defaults using useMemo
  const footerContent = useMemo(() => {
    if (status === "success" && footerData) {
      return {
        language: footerData.language || defaultFooterContent.language,
        country: footerData.country || defaultFooterContent.country,
        Links: footerData.Links || defaultFooterContent.Links,
        Cities: footerData.Cities || defaultFooterContent.Cities,
        Socials: footerData.Socials || defaultFooterContent.Socials,
        feedbackTitle: footerData.feedbackTitle || defaultFooterContent.feedbackTitle,
        feedbackLink: footerData.feedbackLink || defaultFooterContent.feedbackLink,
      };
    }
    return defaultFooterContent;
  }, [footerData, status]);

  // Handle city click with improved functionality
  const handleCityClick = (cityName: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Set the country to Netherlands
    setCountry("Netherlands");
    setSelectedCountryValue("NL");
    
    // Set the selected city
    setSelectedCity(cityName);
    
    // Reset neighborhoods
    setSelectedNeighbourhood([]);
    
    // Set map coordinates based on the selected city
    if (cityCoordinates[cityName]) {
      setSelectedLat(cityCoordinates[cityName].lat);
      setSelectedLng(cityCoordinates[cityName].lng);
    }
    
    // Use a unique key with timestamp for reliable scroll trigger
    const scrollKey = `scrollToSearch_${Date.now()}`;
    sessionStorage.setItem(scrollKey, cityName);
    
    // Navigate to homepage
    router.push(`/${locale}?scroll=${scrollKey}`);
  };

  return (
    <footer className="pt-24 pb-8 bg-[#1E1E1E] px-2 md:px-20">
      <div className="max-w-3xl mx-auto">
        {/* Logo Section - Updated for better mobile centering */}
        <div className="flex justify-center mb-5 w-full">
          <Link className="cursor-pointer" href={`/${locale}`}>
            <Image
              src="/Logo_white.svg"
              alt="Logo"
              width={225}
              height={60}
              className="w-[210px] h-auto"
              priority
            />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:flex-wrap md:items-start">
          
          <div className="flex flex-col items-center md:items-start gap-8 w-full md:w-auto">
            <h1 className="font-bold text-[20px] text-white text-center md:text-left w-full">
              {footerContent.Links.title}
            </h1>
            
            <div className="flex flex-col items-center md:items-start w-full">
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
              className="flex flex-col items-center md:items-start gap-8 w-full md:w-auto"
            >
              <h1 className="font-bold text-[20px] text-white text-center md:text-left w-full">
                {citySection.title}
              </h1>
              <div className="flex flex-col items-center md:items-start w-full">
                {citySection.cities.map((city) => (
                  <a 
                    className="text-lg text-white cursor-pointer xl:hover:underline" 
                    key={city.id}
                    href="#"
                    onClick={(e) => handleCityClick(city.title, e)}
                  >
                    {city.title}
                  </a>
                ))}
              </div>
            </div>
          ))}
    
          {/* Socials section */}
          <div className="flex flex-col items-center md:items-start gap-8 w-full md:w-auto">
            <h1 className="font-bold text-[20px] text-white text-center md:text-left w-full">
              {footerContent.Socials.title}
            </h1>
            <div className="flex flex-col items-center md:items-start w-full">
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
          <div className="flex flex-col items-center md:items-start gap-8 w-full md:w-auto md:ml-8">
            <div className="flex flex-col items-center md:items-start gap-7 w-full">
              <h1 className="font-bold text-[20px] text-white text-center md:text-left w-full">
                {footerContent.language}
              </h1>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
        {/* Suggestion banner */}
        <div className="w-full mt-20 pt-6 border-t border-gray-700">
        <div className="flex justify-center">
          <div className="text-white text-center">
           {footerContent.feedbackTitle} <a href="https://winkwing.featurebase.app/" target="_blank" rel="noopener noreferrer" className="text-[#FF4907] hover:underline">{footerContent.feedbackLink}</a>
          </div>
        </div>
      </div>
    </footer>
    );
  }