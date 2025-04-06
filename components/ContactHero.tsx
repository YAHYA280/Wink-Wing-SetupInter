"use client";
// next
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useContactData } from "@/services/translationService";

export default function ContactHero() {
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  const { data: contactData, status } = useContactData();

  // Default contact info that will be used as a fallback
  const defaultContactInfo = [
    {
      id: 1,
      title: "Email us",
      text: "info@winkwing.com",
      icon: "/contact-info-1.svg",
      href: "#!",
    },
    {
      id: 2,
      title: "Opening hours",
      text: "9 - 18 Mon/Fri",
      icon: "/contact-info-3.svg",
      href: "#",
    },
  ];

  // Use the data from the API or fall back to default values
  const contactInfo = useMemo(() => {
    if (status === "success" && contactData?.info) {
      return contactData.info;
    }
    return defaultContactInfo;
  }, [contactData, status]);

  // Extract content from the API data with fallbacks
  const subtitle = contactData?.subtitle || "Contact Winkwing";
  const title = contactData?.title || "How can we <help>?";
  const paragraphs = contactData?.text
    ? contactData.text.split("\n\n")
    : [
        "If you have any questions regarding our service, your subscription or you just want to send us a kind email to catch up, be sure to shoot a message.",
        "Our team is always ready to answer your questions during (and sometimes after) opening hours.",
      ];

  // Process the title to handle any HTML-like formatting
  const formattedTitle = title.includes("<help>") ? (
    <>
      {title.split("<help>")[0]}
      <span className="text-main">help</span>
      {title.split("<help>")[1] || "?"}
    </>
  ) : (
    title
  );

  return (
    <div className="py-24 px-2 max-w-[1164px] mx-auto lg:px-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <h5 className="text-main text-[16px] leading-[24px] text-center md:mt-[70px]">
          {subtitle}
        </h5>
        <h1 className="font-bold font-arial text-[30px] text-[#003956] sm:text-[48px] leading-[32px] sm:leading-[48px] text-center lg:mb-[96px]">
          {formattedTitle}
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 lg:flex-row-reverse lg:justify-between">
        <div className="mt-12 lg:mt-0">
          <Image
            src="/contact-img.png"
            alt="Contact Img"
            width={357}
            height={357}
          />
        </div>
        <div className="flex flex-col gap-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[16px] leading-[24px] text-center lg:text-left sm:max-w-[540px]"
            >
              {paragraph}
            </p>
          ))}
          <div className="flex flex-col items-center justify-center gap-4">
            {contactInfo.map((contact) => (
              <a
                href={contact.href}
                target="_blank"
                className="flex gap-2 bg-[#F8F8F8] rounded-2xl p-5 w-full sm:w-[540px]"
                key={contact.id}
              >
                <img src={contact.icon} alt="Icon of Contact Info" />
                <div>
                  <h1 className="text-[16px] font-bold leading-[24px]">
                    {contact.title}
                  </h1>
                  <p className="text-[16px] leading-[24px]">{contact.text}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
