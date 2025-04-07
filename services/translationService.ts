// services/translationService.ts
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

// Interface for Moving Guide Data

export interface MovingGuideData {
  AddSearchBuddy: {
    id: number;
    title: string;
    text: string;
    btn: string;
  };
  ActivateWhatsAppNotifications: {
    id: number;
    title: string;
    text: string;
    wa_notifications_title: string;
    wa_notifications_text: string;
    wa_notification_btn: string;
    email_notifications_title: string;
    email_notifications_text: string;
  };
  PrepareYourStandardResponse: {
    id: number;
    title: string;
    text: string;
    checkbox_text: string;
    btn: string;
  };
  CollectAllNecessaryDocuments: {
    id: number;
    title: string;
    text: string;
  };
  SpreadTheWord: {
    id: number;
    title: string;
    text: string;
  };
  WriteAnIntroductionLetter: {
    id: number;
    title: string;
    text: string;
  };
  SignUpForFacebookGroups: {
    id: number;
    title: string;
    text: string;
  };
  SignUpForNewConstructionProjects: {
    id: number;
    title: string;
    text: string;
  };
  CleanUpYourOnlinePresence: {
    id: number;
    title: string;
    text: string;
  };
  ReadOurViewingTips: {
    id: number;
    title: string;
    text: string;
  };
}

//Dashboard Page

export interface DashboardData {
  TrialMessage: {
    id: number;
    text: string;
  };
  DashboardMovingGuide: {
    id: number;
    title: string;
    text: string;
    button: string;
    first_guide: string;
    second_guide: string;
    third_guide: string;
    forth_guide: string;
    fifth_guide: string;
    sixth_guide: string;
    seventh_guide: string;
    eighth_guide: string;
    ninth_guide: string;
    tenth_guide: string;
  };
  DashboardInfo: {
    id: number;
    MovingGuide: {
      id: number;
      title: string;
    };
    Notifications: {
      id: number;
      title: string;
      email: string;
      whatsapp: string;
      enable_btn: string;
      disable_btn: string;
    };
    SearchBuddy: {
      id: number;
      title: string;
      btn: string | null;
    };
    ExpectedMatchesPerWeek: {
      id: number;
      title: string;
    };
    DaysSearching: {
      id: number;
      title: string;
      searching: string;
    };
    StandardViewingResponse: {
      id: number;
      title: string;
      btn: string;
    };
  };
  DashboardServices: {
    id: number;
    ServiceOne: {
      id: number;
      icon: string;
      title: string;
      text: string;
      button: string;
    };
    ServiceTwo: {
      id: number;
      icon: string;
      title: string;
      text: string;
      button: string;
    };
    ServiceThree: {
      id: number;
      icon: string;
      title: string;
      text: string;
      button: string;
    };
    ServiceFour: {
      id: number;
      icon: string;
      title: string;
      text: string;
      button: string;
    };
    ServiceFive: {
      id: number;
      icon: string;
      title: string;
      text: string;
    };
    ServiceSix: {
      id: number;
      icon: string;
      title: string;
      text: string;
      button: string;
    };
  };
}

/// FooterData interfaces
export interface FooterLinkItem {
  id: number;
  href: string;
  title: string;
}

export interface LinksSection {
  id: number;
  title: string;
  links: FooterLinkItem[];
}

export interface CityItem {
  id: number;
  title: string;
}

export interface CitiesSection {
  id: number;
  title: string;
  cities: CityItem[];
}

export interface SocialItem {
  id: number;
  href: string;
  icon: string;
  title: string;
}

export interface SocialsSection {
  id: number;
  title: string;
  socials: SocialItem[];
}

export interface FooterData {
  language: string;
  country: string;
  Links: LinksSection;
  Cities: CitiesSection[];
  Socials: SocialsSection;
  locale?: string;
}

// Type definitions for various content types
export interface NavbarData {
  links: Array<{ id: number; title: string; href: string }>;
  registerButton: string;
  loginButton: string;
}
// Type for contact page data
export interface ContactPageData {
  info: Array<{
    id: number;
    href: string;
    icon: string;
    text: string;
    title: string;
  }>;
  subtitle: string;
  title: string;
  text: string;
}

// Type for service items that appear in multiple sections
export interface ServiceItem {
  id: number;
  title: string;
  text: string;
  icon: string;
}
// Seach city above footer
export interface SearchCity {
  title: string;
  placeholder: string;
  button: string;
}

// Pricing Pga hero section

// PricingBox nested interface
export interface PricingBoxData {
  title: string;
  one_month: string;
  two_month: string;
  three_month: string;
  button: string;
  text: string;
  text_two: string;
  referralCode: string;
}

// Main pricing data interface
export interface PricingData {
  subtitle: string;
  title: string;
  PricingBox: PricingBoxData;
}
// sign up compoent

export interface SignUpData {
  subtitle: string;
  title: string;
  text: string;
  SignupLocation: {
    subtitle: string;
    tablist: Array<{
      type: string;
      index: number;
      title: string;
    }>;
    country: string;
    city: string;
    neighbourhoods: string;
    four_searches_text: string;
    radius: string;
    i_need_to_live_near: string;
    I_need_to_live_near_placeholder: string;
    max_travel_time_label: string;
    transport_type_label: string;
    transport_type: Array<{
      id: number;
      label: string;
      value: string;
    }>;
  };
  SignupRequirements: {
    min_rental_price: string;
    max_rental_price: string;
    bedrooms: string;
    surface: string;
  };
  SignupDetails: {
    furnished_label: string;
    furnished: Array<{
      id: number;
      label: string;
      value: string | null;
    }>;
    additional_features_label: string;
    additional_features: any;
    also_search_for_label: string;
    also_search_for: any;
    show_only_properties_for_label: string;
    show_only_properties_for: any;
  };
  SignupCredentials: {
    type_of_user: Array<{
      id: number;
      label: string;
      value: string;
    }>;
    name_placeholder: string;
    email_placeholder: string;
    password_placeholder: string;
    checkbox_text: string;
    btn: string;
  };
}

//How it works page

export interface HowItWorksData {
  subtitle: string;
  title: string;
}
// Home page data structure based on the actual API response
export interface HomePageData {
  Hero: {
    id: number;
    title: string;
    button: string;
    services: ServiceItem[];
  };
  RentalHero: Array<{
    id: number;
    title: string;
    subtitle: string;
    text: string;
    button: string;
  }>;
  Renters: {
    id: number;
    title: string;
    text: string;
    renters: Array<{
      id: number;
      name: string;
      text: string;
      image: string;
      rating: number;
    }>;
  };
  SearchMenu: {
    id: number;
    title: string;
    services: ServiceItem[];
    boxSubtitle: string;
    tablist: Array<{
      type: string;
      index: number;
      title: string;
    }>;
    city_dropdown_label: string;
    neighbourgoods_dropdown_label: string;
    radius_dropdown_label: string;
    I_need_to_live_near: string;
    max_travel_time: string;
    transport_type: string;
    button: string;
  };
  FAQ: Array<{
    id: number;
    title: string;
    faq: Array<{
      title: string;
      content: string;
    }>;
  }>;
  About: Array<{
    id: number;
    subtitle: string;
    title: string;
    text: string;
  }>;
}

// Status type for the fetching process
type FetchStatus = "idle" | "loading" | "success" | "error";

// Base function to fetch content from Strapi
export function useStrapiContent<T>(contentType: string) {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en"; // Extract locale from URL

  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<Error | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      setStatus("loading");
      const apiUrl =
        process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
      const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || "";

      // Change generic type here to return { data: T } directly.
      const response = await axios.get<{ data: T }>(
        `${apiUrl}/api/${contentType}?populate=*&locale=${locale}`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.data) {
        // Directly use response.data.data without extracting attributes.
        const formattedData = response.data.data;
        setData(formattedData as T);
        setStatus("success");
        console.log(`Successfully fetched ${contentType} data:`, formattedData);
      } else {
        throw new Error("Invalid data format received from API");
      }
    } catch (err) {
      console.error(`Error fetching ${contentType}:`, err);
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
      setStatus("error");

      // Set to default values in development for easier working
      if (process.env.NODE_ENV === "development") {
        setData(getDefaultData(contentType) as T);
      }
    }
  }, [contentType, locale]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { data, status, error, refetch: fetchContent };
}

// Helper function for fetching complex nested content that requires multiple requests
// Helper function for fetching complex nested content that requires multiple requests
export function useStrapiMultiPartContent<T>(
  contentType: string,
  parts: string[]
) {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en"; // Extract locale from URL

  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<Error | null>(null);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const fetchContent = useCallback(async () => {
    // Only fetch if we haven't successfully fetched already
    if (status === "success" || hasAttemptedFetch) return;

    try {
      setStatus("loading");
      const apiUrl =
        process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
      const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || "";

      // Create an array of promises for each part of the data
      const requests = parts.map((part) =>
        axios.get(
          `${apiUrl}/api/${contentType}?populate[${part}][populate]=*&locale=${locale}`,
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
              "Content-Type": "application/json",
            },
          }
        )
      );

      // Execute all requests in parallel
      const responses = await Promise.all(requests);

      // Combine all response data
      const combinedData = responses.reduce((combined, response) => {
        if (response.data && response.data.data) {
          return { ...combined, ...response.data.data };
        }
        return combined;
      }, {});

      setData(combinedData as T);
      setStatus("success");
      setHasAttemptedFetch(true);
    } catch (err) {
      console.error(`Error fetching ${contentType}:`, err);
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
      setStatus("error");
      setHasAttemptedFetch(true);
    }
  }, [contentType, locale, parts, status, hasAttemptedFetch]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { data, status, error, refetch: fetchContent };
}

// Default data for development fallbacks
function getDefaultData(contentType: string): any {
  switch (contentType) {
    case "navbar":
      return {
        Navbar: [
          {
            links: [
              { id: 1, title: "How it works", href: "/how-it-works" },
              { id: 2, title: "Reviews", href: "/reviews" },
              { id: 3, title: "Pricing", href: "/pricing" },
              { id: 4, title: "Contact", href: "/contact" },
            ],
            registerButton: "Start my search",
            loginButton: "Login",
          },
        ],
      };
    case "home-page":
      return {
        Hero: {
          id: 1,
          title: "Find your next home before the pizza",
          button: "Discover all benefits",
          services: [
            {
              id: 1,
              title: "Receive real-time alerts",
              text: "We send you a notification on WhatsApp or e-mail within 60 seconds.",
              icon: "/hero-services-one.svg",
            },
            {
              id: 2,
              title: "Automate your search",
              text: "We scan 750+ rental websites to find your ideal home.",
              icon: "/hero-services-two.svg",
            },
            {
              id: 3,
              title: "Less stress, more viewings",
              text: "Our tools help you find a home in weeks instead of months.",
              icon: "/hero-services-three.svg",
            },
          ],
        },
        RentalHero: [
          {
            id: 1,
            title: "Find your next rental home.",
            subtitle: "Let WinkWing help.",
            text: "Moving is stressful. WinkWing helps you by searching for apartments, scanning 750+ websites every minute.",
            button: "Discover all benefits",
          },
        ],
        Renters: {
          id: 1,
          title: "Renters ❤️ WinkWing",
          text: "Thousands of people have found a home using WinkWing's smart tools.",
          renters: [],
        },
        SearchMenu: {
          id: 1,
          title: "Stay one step ahead!",
          services: [
            {
              id: 1,
              title: "Automate your search",
              text: "Tell us what type of house you are looking for and sit back while we scan more than 750+ rental websites to find your ideal home.",
              icon: "/search-icon-1.svg",
            },
            {
              id: 2,
              title: "Receive real-time alerts",
              text: "When we find a house that matches your preferences, you receive a notification on WhatsApp or e-mail within seconds.",
              icon: "/search-icon-2.svg",
            },
            {
              id: 3,
              title: "Less stress, more viewings",
              text: "Tell us what type of house you are looking for and sit back while we scan more than 750+ rental websites to find your ideal home.",
              icon: "/search-icon-3.svg",
            },
          ],
          boxSubtitle: "Select location based on",
          tablist: [
            { type: "NEIGHBOURHOODS", index: 0, title: "Neighbourhoods" },
            { type: "RADIUS", index: 1, title: "Radius" },
            { type: "TRAVEL_TIME", index: 2, title: "Travel Time" },
          ],
          city_dropdown_label: "City",
          neighbourgoods_dropdown_label: "Neighbourhoods",
          radius_dropdown_label: "Radius",
          I_need_to_live_near: "I need to live near",
          max_travel_time: "Max travel time",
          transport_type: "Transport type",
          button: "Start your search",
        },
        FAQ: [
          {
            id: 1,
            title: "Frequently Asked Questions",
            faq: [],
          },
        ],
        About: [
          {
            id: 1,
            subtitle: "Why we started Winkwing.",
            title: "By 2 tenants, for tenants",
            text: "As home seekers ourselves, we know how incredibly hard it was to find a place to live...",
          },
        ],
      };
    default:
      return null;
  }
}

// Custom hooks for specific content types
export function useNavbarData() {
  return useStrapiContent<{ Navbar: NavbarData[] }>("navbar");
}

export function useHomePageData() {
  return useStrapiContent<HomePageData>("home-page");
}
export function useContactData() {
  return useStrapiContent<ContactPageData>("contact");
}
export function useHowItWorksData() {
  return useStrapiContent<HowItWorksData>("how-it-work");
}

export function useSignUpData() {
  return useStrapiContent<SignUpData>("signup");
}

export function useSearchCity() {
  return useStrapiContent<SearchCity>("search-city");
}

export function usePricingData() {
  return useStrapiContent<PricingData>("pricing");
}
export function useFooterData() {
  return useStrapiContent<FooterData>("footer");
}

export function useDashboardData() {
  return useStrapiMultiPartContent<DashboardData>("dashboard", [
    "TrialMessage",
    "DashboardMovingGuide",
    "DashboardInfo",
    "DashboardServices",
  ]);
}
export function useMovingGuideData() {
  return useStrapiContent<MovingGuideData>("moving-guide");
}
