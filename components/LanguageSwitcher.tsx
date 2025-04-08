// components/LanguageSwitcherEnhanced.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import Image from "next/image";

// Define supported languages with their flags
const languages = [
  { code: "en", name: "English", flag: "/GB.svg" },
  { code: "nl", name: "Dutch", flag: "/NL.svg" },
  { code: "fr", name: "Français", flag: "/FR.svg" },
  { code: "ar", name: "العربية", flag: "/AR.svg" },
  { code: "es", name: "Español", flag: "/ES.svg" },
  { code: "pt", name: "Portugués", flag: "/PT.svg" },
  { code: "zh", name: "姓名", flag: "/CN.svg" },
  { code: "hi", name: "हिन्दी", flag: "/HI.svg" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // Get current locale
  const currentLocale = (params.locale as string) || "en";
  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-switcher")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Create localized path
  const createLocalizedPath = (locale: string) => {
    const segments = pathname?.split("/") || [];
    segments[1] = locale;
    return segments.join("/");
  };

  // Handle language change
  const handleLanguageChange = (locale: string) => {
    if (locale === currentLocale || isChanging) return;

    setIsChanging(true);
    setIsOpen(false);

    // Navigate to the new locale path
    router.push(createLocalizedPath(locale));

    // Reset changing state after a reasonable timeout
    // (this is just a failsafe)
    setTimeout(() => setIsChanging(false), 2000);
  };

  return (
    <div className="language-switcher relative z-30">
      {/* Current language button */}
      <button
        onClick={() => !isChanging && setIsOpen(!isOpen)}
        disabled={isChanging}
        className={`
          flex items-center justify-between gap-2 px-4 py-2 
          bg-white rounded-lg w-44 transition-all duration-300
          ${isChanging ? "opacity-70 cursor-wait" : "hover:bg-gray-50"}
          ${isOpen ? "ring-2 ring-main/20" : ""}
        `}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          {isChanging ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-t-main border-main/30 rounded-full animate-spin"></div>
              <span className="text-sm font-medium text-gray-600">
                {currentLocale === "nl" ? "Veranderen..." : "Changing..."}
              </span>
            </div>
          ) : (
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

        {!isChanging && (
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {/* Language dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 animate-fadeIn">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-gray-50
                  ${
                    language.code === currentLocale
                      ? "bg-gray-50 font-medium"
                      : ""
                  }
                  transition-colors duration-200
                `}
              >
                <Image
                  src={language.flag}
                  alt={language.name}
                  width={20}
                  height={20}
                  className="rounded-sm"
                />
                <span className="text-gray-700">{language.name}</span>

                {language.code === currentLocale && (
                  <svg
                    className="w-4 h-4 ml-auto text-main"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
