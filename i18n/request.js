// i18n/request.js
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import {
  getHomePage,
  getNavbar,
  getFooter,
  getContact,
  getPricing,
  getLogin,
  getSignup,
  getHowItWork,
  getMovingGuide,
  getReviews,
  getSearchCity,
  getDashboard,
  getDeleteAccount,
  getChangePassword,
  getForgotPassword,
  getOTPCode,
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
      signupData,
      howItWorkData,
      movingGuideData,
      reviewsData,
      searchCityData,
      dashboardData,
      deleteAccountData,
      changePasswordData,
      forgotPasswordData,
      otpCodeData,
    ] = await Promise.allSettled([
      getHomePage(locale),
      getNavbar(locale),
      getFooter(locale),
      getContact(locale),
      getPricing(locale),
      getLogin(locale),
      getSignup(locale),
      getHowItWork(locale),
      getMovingGuide(locale),
      getReviews(locale),
      getSearchCity(locale),
      getDashboard(locale),
      getDeleteAccount(locale),
      getChangePassword(locale),
      getForgotPassword(locale),
      getOTPCode(locale),
    ]);

    // Create fallback static translation files if needed
    const globalTranslation = await import(`../messages/${locale}/global.json`)
      .then((module) => module.default)
      .catch(() => ({}));

    // Combine static translations with dynamic Strapi content
    const messages = {
      global: {
        ...globalTranslation,
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
        signup: signupData.status === "fulfilled" ? signupData.value : null,
        howItWork:
          howItWorkData.status === "fulfilled" ? howItWorkData.value : null,
        movingGuide:
          movingGuideData.status === "fulfilled" ? movingGuideData.value : null,
        reviews: reviewsData.status === "fulfilled" ? reviewsData.value : null,
        searchCity:
          searchCityData.status === "fulfilled" ? searchCityData.value : null,
        dashboard:
          dashboardData.status === "fulfilled" ? dashboardData.value : null,
        deleteAccount:
          deleteAccountData.status === "fulfilled"
            ? deleteAccountData.value
            : null,
        changePassword:
          changePasswordData.status === "fulfilled"
            ? changePasswordData.value
            : null,
        forgotPassword:
          forgotPasswordData.status === "fulfilled"
            ? forgotPasswordData.value
            : null,
        otpCode: otpCodeData.status === "fulfilled" ? otpCodeData.value : null,
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

    return {
      locale,
      messages: {
        global: {
          ...globalTranslation,
        },
      },
    };
  }
});
