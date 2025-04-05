// utils/strapiApi.ts
import axios from "axios";

// Base URL and token for Strapi API
const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN || "";

/**
 * Create axios instance with predefined headers for Strapi API
 */
const strapiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

/**
 * Generic function to fetch content from Strapi API with locale support
 * @param endpoint The API endpoint (e.g., 'home-page', 'navbar')
 * @param locale The locale to fetch content for (e.g., 'en', 'nl')
 * @param populate Configuration for populating relationships (default: '*')
 */
export async function fetchFromStrapi(
  endpoint: string,
  locale: string,
  populate: string | object = "*"
) {
  try {
    let populateParam = "";

    if (typeof populate === "string") {
      populateParam = `populate=${populate}`;
    } else {
      populateParam = `populate=${JSON.stringify(populate)}`;
    }

    const url = `/api/${endpoint}?locale=${locale}&${populateParam}`;
    const response = await strapiClient.get(url);

    if (response.data && response.data.data) {
      // Return formatted data
      return {
        id: response.data.data.id,
        ...response.data.data.attributes,
      };
    }

    return response.data;
  } catch (error) {
    console.error(
      `Error fetching from Strapi (${endpoint}, ${locale}):`,
      error
    );
    return null;
  }
}

/**
 * Specific content type fetchers
 */

export async function getHomePage(locale: string) {
  return fetchFromStrapi("home-page", locale);
}

export async function getNavbar(locale: string) {
  return fetchFromStrapi("navbar", locale);
}

export async function getFooter(locale: string) {
  return fetchFromStrapi("footer", locale);
}

export async function getContact(locale: string) {
  return fetchFromStrapi("contact", locale);
}

export async function getPricing(locale: string) {
  return fetchFromStrapi("pricing", locale);
}

export async function getLogin(locale: string) {
  return fetchFromStrapi("login", locale);
}

export async function getSignup(locale: string) {
  return fetchFromStrapi("signup", locale);
}

export async function getHowItWork(locale: string) {
  return fetchFromStrapi("how-it-work", locale);
}

export async function getMovingGuide(locale: string) {
  return fetchFromStrapi("moving-guide", locale);
}

export async function getReviews(locale: string) {
  return fetchFromStrapi("review", locale);
}

export async function getSearchCity(locale: string) {
  return fetchFromStrapi("search-city", locale);
}

export async function getDashboard(locale: string) {
  return fetchFromStrapi("dashboard", locale);
}

export async function getDeleteAccount(locale: string) {
  return fetchFromStrapi("delete-account", locale);
}

export async function getChangePassword(locale: string) {
  return fetchFromStrapi("change-password", locale);
}

export async function getForgotPassword(locale: string) {
  return fetchFromStrapi("forgot-password", locale);
}

export async function getOTPCode(locale: string) {
  return fetchFromStrapi("otp-code", locale);
}
