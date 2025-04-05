"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

// Define supported languages with their flags
const languages = [
  { code: "en", name: "English", flag: "/en-flag.png" },
  { code: "nl", name: "Nederlands", flag: "/nl-flag.png" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extract the current locale from the pathname
  const currentLocale = pathname.split("/")[1];

  // Find the current language object
  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Create path for the target locale
  const createPathForLocale = (locale: string) => {
    const pathSegments = pathname.split("/");
    pathSegments[1] = locale; // Replace the locale part
    return pathSegments.join("/");
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* Current Language Button */}
      <button
        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 transition-all"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label="Change language"
      >
        <Image
          src={currentLanguage.flag}
          alt={currentLanguage.name}
          width={24}
          height={24}
          className="rounded-sm"
        />
        <span className="text-sm font-medium hidden sm:inline">
          {currentLanguage.name}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50">
          {languages.map((language) => (
            <Link
              key={language.code}
              href={createPathForLocale(language.code)}
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left
                ${
                  language.code === currentLocale
                    ? "bg-gray-50 font-medium"
                    : ""
                }
              `}
            >
              <Image
                src={language.flag}
                alt={language.name}
                width={20}
                height={20}
                className="rounded-sm"
              />
              <span>{language.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
