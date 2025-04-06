"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

// Define supported languages with their flags
const languages = [
  { code: "en", name: "En", flag: "/en-flag.png" },
  { code: "nl", name: "Nl", flag: "/nl-flag.png" },
  { code: "fr", name: "Français", flag: "/fr-flag.png" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extract the current locale from the pathname or default to "en"
  const currentLocale = pathname.split("/")[1] || "en";

  // Check if the current locale is a valid language code
  const isValidLocale = languages.some((lang) => lang.code === currentLocale);

  // Find the current language object or default to English
  const currentLanguage = isValidLocale
    ? languages.find((lang) => lang.code === currentLocale)
    : languages[0];

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
    const segments = pathname.split("/");

    if (isValidLocale) {
      // Replace the locale part in the path
      segments[1] = locale;
    } else {
      // Add the locale if it doesn't exist
      segments.splice(1, 0, locale);
    }

    return segments.join("/");
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Current Language Button */}
      <button
        className="flex items-center justify-between gap-2 px-3 py-2 bg-white rounded-lg w-[190px]"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          {currentLanguage && (
            <>
              <Image
                src={currentLanguage.flag}
                alt={currentLanguage.name}
                width={24}
                height={24}
                className="rounded-sm"
              />
              <span className="text-sm font-medium text-gray-700">
                {currentLanguage.name}
              </span>
            </>
          )}
        </div>
        <svg
          className={`w-5 h-5 ml-2 -mr-1 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 z-10 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 max-h-60 overflow-auto">
            {languages.map((language) => (
              <Link
                key={language.code}
                href={createPathForLocale(language.code)}
                className={`
                  flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left
                  ${
                    language.code === currentLocale
                      ? "bg-gray-50 font-medium"
                      : ""
                  }
                `}
                onClick={() => setIsOpen(false)}
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
        </div>
      )}
    </div>
  );
}
