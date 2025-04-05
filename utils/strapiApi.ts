// utils/strapiApi.ts
import axios from "axios";

// Base URL for Strapi API
const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

/**
 * Fetch content from Strapi API with locale support
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

    const url = `${API_URL}/api/${endpoint}?locale=${locale}&${populateParam}`;
    const response = await axios.get(url);
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

export async function getLoginPage(locale: string) {
  return fetchFromStrapi("login", locale);
}

export async function getMovingGuide(locale: string) {
  return fetchFromStrapi("moving-guide", locale);
}

// Add more specific fetchers as needed
