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

  // Get current locale from the URL params or default to "en"
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Create a localized path by replacing the first path segment with the locale
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

    // Reset changing state after a reasonable timeout (failsafe)
    setTimeout(() => setIsChanging(false), 2000);
  };

  return (
    <div className="language-switcher relative z-30">
      {/* Simple circle button showing only the flag (or spinner during change) */}
      <button
        onClick={() => !isChanging && setIsOpen(!isOpen)}
        disabled={isChanging}
        className={`
          flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
          ${isChanging ? "opacity-70 cursor-wait" : "hover:bg-gray-50"}
          ${isOpen ? "ring-2 ring-main/20" : ""}
        `}
        aria-expanded={isOpen}
      >
        {isChanging ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-t-main border-main/30 rounded-full animate-spin"></div>
          </div>
        ) : (
          <Image
            src={currentLanguage.flag}
            alt={currentLanguage.name}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
      </button>

      {/* Language dropdown – appears when the circle is clicked */}
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
