// i18n/request.js
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import {
  getHomePage,
  getNavbar,
  getFooter,
  getContact,
  getPricing,
  getLoginPage,
  getMovingGuide,
} from "../utils/strapiApi";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  try {
    // Fetch dynamic content from Strapi
    const [
      homePageData,
      navbarData,
      footerData,
      contactData,
      pricingData,
      loginData,
      movingGuideData,
    ] = await Promise.allSettled([
      getHomePage(locale),
      getNavbar(locale),
      getFooter(locale),
      getContact(locale),
      getPricing(locale),
      getLoginPage(locale),
      getMovingGuide(locale),
    ]);

    // Get static translations (create empty files if they don't exist yet)
    const globalTranslation = await import(`../messages/${locale}/global.json`)
      .then((module) => module.default)
      .catch(() => ({}));

    const inputsTranslation = await import(`../messages/${locale}/inputs.json`)
      .then((module) => module.default)
      .catch(() => ({}));

    const headerTranslation = await import(`../messages/${locale}/header.json`)
      .then((module) => module.default)
      .catch(() => ({}));

    const footerTranslation = await import(`../messages/${locale}/footer.json`)
      .then((module) => module.default)
      .catch(() => ({}));

    // Import more static translations as needed with error handling

    // Combine static translations with dynamic Strapi content
    const messages = {
      global: {
        ...globalTranslation,
      },
      inputs: {
        ...inputsTranslation,
      },
      header: {
        ...headerTranslation,
      },
      footer: {
        ...footerTranslation,
      },

      // Strapi data
      strapi: {
        homePage:
          homePageData.status === "fulfilled" ? homePageData.value : null,
        navbar: navbarData.status === "fulfilled" ? navbarData.value : null,
        footer: footerData.status === "fulfilled" ? footerData.value : null,
        contact: contactData.status === "fulfilled" ? contactData.value : null,
        pricing: pricingData.status === "fulfilled" ? pricingData.value : null,
        login: loginData.status === "fulfilled" ? loginData.value : null,
        movingGuide:
          movingGuideData.status === "fulfilled" ? movingGuideData.value : null,
      },
    };

    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error("Error setting up translations:", error);

    // Fallback to just static translations if API calls fail
    const globalTranslation = await import(`../messages/${locale}/global.json`)
      .then((module) => module.default)
      .catch(() => ({}));

    // Import more static translations as needed

    return {
      locale,
      messages: {
        global: {
          ...globalTranslation,
        },
        // Add other static translations
      },
    };
  }
});
