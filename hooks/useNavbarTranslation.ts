// hooks/useNavbarTranslation.ts
"use client";
import { useTranslations } from "next-intl";

// Define the navbar data structure
export interface NavbarLink {
  id: number;
  href: string;
  title: string;
}

/**
 * Custom hook to access Navbar translations from Strapi
 */
export function useNavbarTranslation() {
  let t;
  let error = null;

  try {
    // Access the translations
    t = useTranslations("strapi.navbar");
  } catch (err) {
    error = err;
    console.warn("No Strapi translations found for navbar, using defaults");
    return { t: null, error };
  }

  return { t, error };
}
