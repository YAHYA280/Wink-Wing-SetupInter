"use client";
// components
import SearchMenu from "./SearchMenu";
import ServicesCard from "./ServicesCard";

export default function SearchLocation() {
  // Array containing details of services offered, including titles and descriptions
  const services = [
    {
      id: 1,
      title: "Automate your search",
      text: "Tell us what type of house you are looking for and sit back while we scan more than 750+ rental websites to find your ideal home.",
      icon: "/search-icon-1.svg",
    },
    {
      id: 2,
      title: "Receive real-time alerts",
      text: "When we find a house that matches your preferences, you receive a notification on WhatsApp or e-mail within seconds.",
      icon: "/search-icon-2.svg",
    },
    {
      id: 3,
      title: "Less stress, more viewings",
      text: "Tell us what type of house you are looking for and sit back while we scan more than 750+ rental websites to find your ideal home.",
      icon: "/search-icon-3.svg",
    },
  ];

  return (
    <div className="w-full bg-searchLocation bg-cover bg-center relative z-30">
      <div className="flex flex-col items-center justify-center gap-[60px] px-2 py-24">
        <h1 className="font-extrabold text-4xl md:text-[44px] leading-[44px] text-center">
          Stay one step ahead!
        </h1>
        <div className="flex flex-col items-center justify-center gap-12 px-2 md:flex-row md:flex-wrap">
          {services.map((service) => (
            <ServicesCard key={service.id} service={service} />
          ))}
        </div>
        <SearchMenu />
      </div>
    </div>
  );
}
