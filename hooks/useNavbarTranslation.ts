"use client";
// hooks/useNavbarTranslation.ts
import { useTranslations } from "next-intl";

/**
 * Custom hook to access Navbar translations from Strapi
 */
export function useNavbarTranslation() {
  let navbarData = null;
  let error = null;

  try {
    // Try to access Strapi translation data from next-intl
    const strapiTranslations = useTranslations("strapi.navbar");

    if (strapiTranslations) {
      navbarData = strapiTranslations;
    }
  } catch (err) {
    // If we can't access Strapi translations, fall back to defaults
    error = err;
    console.warn("No Strapi translations found for navbar, using defaults");
  }

  return { navbarData, error };
}
