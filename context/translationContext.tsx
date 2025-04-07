// context/translationContext.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname, useParams } from "next/navigation";

interface TranslationContextType {
  isLoading: boolean;
  locale: string;
  isReady: boolean;
}

const TranslationContext = createContext<TranslationContextType>({
  isLoading: true,
  locale: "en",
  isReady: false,
});

export const useTranslation = () => useContext(TranslationContext);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const pathname = usePathname();

  useEffect(() => {
    // Reset loading state when locale changes
    setIsLoading(true);
    setIsReady(false);

    // Fake a minimum loading time for better UX
    const minLoadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    // Mark as fully ready after translations should be loaded
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    return () => {
      clearTimeout(minLoadTimer);
      clearTimeout(readyTimer);
    };
  }, [locale, pathname]);

  return (
    <TranslationContext.Provider value={{ isLoading, locale, isReady }}>
      {children}
    </TranslationContext.Provider>
  );
}
