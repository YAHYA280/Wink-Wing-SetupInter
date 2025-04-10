"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useWelcomeData } from "@/services/translationService";

// components
import RentalServiceCard from "./RentalServiceCard";

export default function RentalServives() {
  // Get the current locale from the URL
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  
  // Fetch translations
  const { data: welcomeData, status } = useWelcomeData();

  // Default content for fallback
  const defaultContent = {
    title: "Why you'll find your next rental using WinkWing",
    services: {
      features: [
        {
          id: 1,
          title: "Save time searching.",
          text: "Get notifications for new rentals that match your preferences. Stop wasting time refreshing rental websites and never miss a house.",
          icon: "/rentalservices-icon-1.svg",
        },
        {
          id: 2,
          title: "Find more houses.",
          text: "We monitor 750 websites every 60 seconds and notify you when we find a match. You will get matches from reliable websites you never knew existed.",
          icon: "/rentalservices-icon-2.svg",
        },
        {
          id: 3,
          title: "Book more viewings.",
          text: "You will be among the first to respond. Being early increase your chances of booking viewings and renting a house.",
          icon: "/rentalservices-icon-3.svg",
        },
      ]
    }
  };

  // Merge API data with defaults using useMemo
  const content = useMemo(() => {
    if (status === "success" && welcomeData?.retal_service) {
      return welcomeData.retal_service;
    }
    return defaultContent;
  }, [welcomeData, status]);

  return (
    <div className="flex flex-col items-center justify-center gap-24 py-20 px-2">
      <h1 className="font-bold font-arial text-[#003956] text-3xl lg:text-4xl leading-10 text-center">
        {content.title}
      </h1>
      <div className="flex flex-col items-center justify-center gap-12">
        {content.services.features.map((service) => (
          <RentalServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}