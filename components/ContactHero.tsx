// next
import Image from "next/image";

export default function ContactHero() {
  // an array of contact info
  const contactInfo = [
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
  return (
    <div className="py-24 px-2 max-w-[1164px] mx-auto lg:px-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <h5 className="text-main text-[16px] leading-[24px] text-center md:mt-[70px]">
          Contact Winkwing
        </h5>
        <h1 className="font-bold font-arial text-[30px] text-[#003956] sm:text-[48px] leading-[32px] sm:leading-[48px] text-center lg:mb-[96px]">
          How can we <span className="text-main">help?</span>
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
          <p className="text-[16px] leading-[24px] text-center lg:text-left sm:max-w-[540px]">
            If you have any questions regarding our service, your subscription
            or you just want to send us a kind email to catch up, be sure to
            shoot a message.
          </p>
          <p className="text-[16px] leading-[24px] text-center lg:text-left sm:max-w-[540px]">
            Our team is always ready to answer your questions during (and
            sometimes after) opening hours.
          </p>
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
