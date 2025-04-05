"use client";
// hooks/useTranslations.ts
import { useTranslations } from "next-intl";

type StrapiPage =
  | "homePage"
  | "navbar"
  | "footer"
  | "contact"
  | "pricing"
  | "login"
  | "signup"
  | "howItWork"
  | "movingGuide"
  | "reviews"
  | "searchCity"
  | "dashboard"
  | "deleteAccount"
  | "changePassword"
  | "forgotPassword"
  | "otpCode";

/**
 * Custom hook to access both static and Strapi translations
 *
 * Usage:
 * const { t, strapi } = useAppTranslations('homePage');
 *
 * // Access static translations
 * <h1>{t('common.title')}</h1>
 *
 * // Access Strapi translations
 * <h1>{strapi?.hero?.title}</h1>
 */
export function useAppTranslations(strapiPage?: StrapiPage) {
  // Access static translations from JSON files
  const t = useTranslations("global");

  // Access Strapi translations if a page is specified
  let strapi = undefined;

  if (strapiPage) {
    try {
      strapi = useTranslations(`strapi.${strapiPage}`);
    } catch (error) {
      console.warn(`No Strapi translations found for page: ${strapiPage}`);
    }
  }

  return { t, strapi };
}
