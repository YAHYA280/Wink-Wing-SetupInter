// next
import Link from "next/link";

// icons
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

// components
import FooterDropDown from "./FooterDropdown";

export default function Footer() {
  // an array of footer links
  const footerLinks = [
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
  ];

  // an array of cities
  const cities = [
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
  ];

  // an array of social medias
  const socials = [
    {
      id: 1,
      title: "Instagram",
      icon: <FaInstagram fill="#fff" />,
      href: "https://www.instagram.com/winkwingwinkwing/ ",
    },
    {
      id: 2,
      title: "X",
      icon: <RiTwitterXFill fill="#fff" />,
      href: "https://x.com/winkwing ",
    },
    {
      id: 3,
      title: "Tiktok",
      icon: <FaTiktok fill="#fff" />,
      href: "https://www.tiktok.com/@winkwingwinkwing ",
    },
    {
      id: 4,
      title: "Facebook",
      icon: <FaFacebookF fill="#fff" />,
      href: "https://www.facebook.com/winkwingwink/",
    },
  ];
  return (
    <footer className="py-24 bg-[#1E1E1E] px-2 md:px-20">
      <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:flex-wrap md:items-start">
        {/* Footer links section */}
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-8">
          <h1 className="font-bold text-[20px] text-white">More WinkWing</h1>
          <div className="flex flex-col justify-center items-start md:items-start md:justify-start">
            {footerLinks.map((link) => (
              <Link
                className="text-lg text-white xl:hover:underline"
                key={link.id}
                href={link.href}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Cities section */}
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-8">
          <h1 className="font-bold text-[20px] text-white">
            Find your next home in
          </h1>
          <div className="flex flex-col justify-center items-start md:justify-start">
            {cities.map((link) => (
              <span className="text-lg text-white" key={link.id}>
                {link.title}
              </span>
            ))}
          </div>
        </div>

        {/* Socials section */}
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-8">
          <h1 className="font-bold text-[20px] text-white">Follow us</h1>
          <div className="flex flex-col justify-center items-start md:justify-start">
            {socials.map((link) => (
              <a
                className="flex items-center gap-5 text-lg text-white xl:hover:underline"
                key={link.id}
                href={link.href}
                target="_blank"
              >
                <span>{link.icon}</span> {link.title}
              </a>
            ))}
          </div>
        </div>

        {/* Language and Country section */}
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-8 ml-8">
          <div className="flex flex-col items-center justify-center md:items-start gap-7">
            <h1 className="font-bold text-[20px] text-white">Language</h1>
            <FooterDropDown />
          </div>
          <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-7 text-white">
            <h1 className="font-bold text-[20px] text-white">Country</h1>
            <FooterDropDown />
          </div>
        </div>
      </div>
    </footer>
  );
}
