import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  // Get all files depending on naming
  const globalTranslation = (await import(`../messages/${locale}/global.json`))
    .default;

  // Inputs
  const inputsTranslation = (await import(`../messages/${locale}/inputs.json`))
    .default;

  // Header
  const headerTranslation = (await import(`../messages/${locale}/header.json`))
    .default;

  // Footer
  const footerTranslation = (await import(`../messages/${locale}/footer.json`))
    .default;

  const privacyPolicyTranslation = (
    await import(`../messages/${locale}/privacy_policy.json`)
  ).default;
  const termsAndConditionsTranslation = (
    await import(`../messages/${locale}/terms_and_conditions.json`)
  ).default;
  const dashboardTranslation = (
    await import(`../messages/${locale}/dashboard.json`)
  ).default;
  const loginTranslation = (await import(`../messages/${locale}/login.json`))
    .default;

  // Home page components
  const homeHeroTranslation = (
    await import(`../messages/${locale}/home/hero.json`)
  ).default;
  const homeWhyChooseUsTranslation = (
    await import(`../messages/${locale}/home/whyChooseUs.json`)
  ).default;
  const homeFaqsTranslation = (
    await import(`../messages/${locale}/home/faqs.json`)
  ).default;
  const homePackagesTranslation = (
    await import(`../messages/${locale}/home/packages.json`)
  ).default;
  const homeTestimonialsTranslation = (
    await import(`../messages/${locale}/home/testimonials.json`)
  ).default;
  const homeLockInTranslation = (
    await import(`../messages/${locale}/home/lockIn.json`)
  ).default;
  const homePortfolioTranslation = (
    await import(`../messages/${locale}/home/portfolio.json`)
  ).default;

  // The object that will hold all the translations
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
    privacyPolicyTranslation: {
      ...privacyPolicyTranslation,
    },
    termsAndConditionsTranslation: {
      ...termsAndConditionsTranslation,
    },
    dashboardTranslation: {
      ...dashboardTranslation,
    },
    loginTranslation: {
      ...loginTranslation,
    },

    // Root Pages
    home: {
      ...homeHeroTranslation,
      ...homeFaqsTranslation,
      ...homeWhyChooseUsTranslation,
      ...homePackagesTranslation,
      ...homeTestimonialsTranslation,
      ...homeLockInTranslation,
      ...homePortfolioTranslation,
    },
  };
  // console.log(messages)
  return {
    locale,
    messages,
  };
});
