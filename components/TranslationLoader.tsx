"use client";
import { useState, useEffect } from "react";
import { usePathname, useParams } from "next/navigation";

// Define translations for different languages
const translations: Record<string, { loading: string; translation: string }> = {
  en: { loading: "Loading...", translation: "English translation" },
  nl: { loading: "Laden...", translation: "Nederlandse vertaling" },
  es: { loading: "Cargando...", translation: "Traducción española" },
  fr: { loading: "Chargement...", translation: "Traduction française" },
  ar: { loading: "جاري التحميل...", translation: "الترجمة العربية" },
  zh: { loading: "加载中...", translation: "中文翻译" },
  pt: { loading: "Carregando...", translation: "Tradução portuguesa" },
  hi: { loading: "लोड हो रहा है...", translation: "हिंदी अनुवाद" }
};

export default function TranslationLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingLocale, setLoadingLocale] = useState<string | null>(null);
  const pathname = usePathname();
  const params = useParams();

  // Store the last seen pathname to detect navigation
  useEffect(() => {
    // Create a data attribute on the body to trigger CSS animations
    // based on navigation state
    if (isLoading) {
      document.body.setAttribute("data-loading-translations", "true");
    } else {
      document.body.removeAttribute("data-loading-translations");
    }

    // Start loading when component mounts
    setIsLoading(true);
    setLoadingLocale(params.locale as string);

    // End loading after a minimum time (for animation smoothness)
    // and when data is likely ready
    const timer = setTimeout(() => {
      setIsLoading(false);
      setLoadingLocale(null);
    }, 800); // Minimum loading time for visual feedback

    return () => clearTimeout(timer);
  }, [params.locale, pathname]);

  if (!isLoading) return null;

  // Get the translation for the current locale, fallback to English if not found
  const locale = loadingLocale || "en";
  const { loading, translation } = translations[locale] || translations.en;

  // For RTL languages (like Arabic), we could add a special class
  const isRTL = locale === "ar";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm transition-opacity duration-300">
      <div className={`flex flex-col items-center ${isRTL ? "rtl" : "ltr"}`}>
        <div className="relative">
          {/* Main spinning logo */}
          <img
            src="/winkwing-logo.svg"
            alt="Loading"
            className="w-32 h-auto opacity-90 animate-pulse"
          />

          {/* Circular loading spinner */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-t-main border-main/30 rounded-full animate-spin"></div>
          </div>
        </div>

        <p className="mt-6 text-[#003956] font-semibold text-lg animate-pulse">
          {loading}
        </p>

        {/* Show which locale is being loaded */}
        <p className="mt-2 text-[#003956]/60 text-sm">
          {translation}
        </p>
      </div>
    </div>
  );
}