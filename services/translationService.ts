// services/translationService.ts
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";



// pages data type : 
export interface MatchesPageData {
  search_placeholder: string;
  sort_options: {
    most_recent: string;
    price_low_high: string;
    surface_high_low: string;
  };
  tab_labels: {
    all: string;
    new: string;
    favorite: string;
    registered: string;
  };
  no_matches_text: string;
  details: {
    month_label: string;
    copy_inquiry_button: string;
    modify_letter_button: string;
    show_application_checkbox: string;
    save_button: string;
    default_letter: string;
    no_image_text: string;
    bedrooms:string;
    on:string;
    viewMatch:string;
  };
}
export interface SearchData {
  hero: {
    title: string;
    subtitle: string;
    text: string;
    prv: string;
    save: string;
    saving: string;
    edit_subtitle: string;
    county_eror: string;
    adress_eror: string;
    adress_valid: string;
    success_title: string ;
    sucess_text:string;
    loadingTitle :string;
    loadingText :string;
    unsavedChangesAlert :string;
    tryAgainButton :string;
    serverErrorMessage :string;
    localSaveMessage :string;

  };
}
export interface WelcomeData {
  welcome_hero: {
    hero_title: string;
    without_title: string;
    without_data: {
      list: string[];
    };
    with_title: string;
    with_data: {
      list: string[];
    };
  };
  retal_service: {
    title: string;
    services: {
      features: Array<{
        id: number;
        icon: string;
        text: string;
        title: string;
      }>;
    };
  };
}
export interface ChangePasswordData {
  subtitle: string;
  title: string;
  text: string;
  password_placeholder: string;
  repeatpassword_placeholder: string;
  button: string;
  password_requirements:string;
  passwords_not_match:string;
  password_too_weak:string;
  reset_success:string;
  back_to_login:string;
  success_details:string;
}
export interface ResetPasswordData {
  Header: string;
  title: string;
  text: string;
  PlaceHolder: string;
  btn: string;
  successEmail : string;
  sentEmail: string;
  confirmationText:string;
  backToLogin:string;
  continueToCode:string;
  invalidEmail:string;
}
export interface OtpCodeData {
  subtitle: string;
  title: string;
  text: string;
  expireMessage: string;
  button: string;
}
export interface LoginData {
  subtitle: string;
  title: string;
  login_text: string;
  login_email: string;
  login_password: string;
  login_forgotpassword: string;
  button: string;
}
export interface DeleteAccountData {
  title: string;
  text: string;
  cancel_button: string;
  delete_button: string;
  personal_info: string;
  search_query: string;
  saved_matches: string;
  subscription_details: string;
}
export interface MovingGuideData {
  title: string;
  prev_btn: string;
  next_btn: string;
  mark_as_completed: string;
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
    Dialog_Text:string;
    Dialog_UnderInput:string;
    Dialog_Button:string;
    noActiveNum:string;

  };
  PrepareYourStandardResponse: {
    id: number;
    title: string;
    text: string;
    checkbox_text: string;
    btn: string;
    letter_Holder:string;
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
export interface DashboardData {
  TrialMessage: {
    id: number;
    text: string;
    trialText?: string;
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
      edit_Button:string;
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
      button:string;
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
  feedbackTitle:string;
  feedbackLink:string;
  Links: LinksSection;
  Cities: CitiesSection[];
  Socials: SocialsSection;
  locale?: string;
}
export interface NavbarData {
  links: Array<{ id: number; title: string; href: string }>;
  registerButton: string;
  loginButton: string;
  logoutButton:string;
}
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
export interface ServiceItem {
  id: number;
  title: string;
  text: string;
  icon: string;
}
export interface SearchCity {
  title: string;
  placeholder: string;
  button: string;
}
export interface PricingBoxData {
  title: string;
  one_month: string;
  two_month: string;
  three_month: string;
  button: string;
  text: string;
  text_two: string;
  referralCode: string;
  succcesReferral:string;
  succesResponse:string;
  warningResponse:string;
  failResponse:string;
}
export interface PricingData {
  subtitle: string;
  title: string;
  PricingBox: PricingBoxData;
}
export interface SignUpData {
  subtitle: string;
  title: string;
  text: string;
  steup_info: {
    steps: {
      steps: Array<{
        id: number;
        title: string;
      }>;
    };
    next: string;
    prv: string;
  };
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
    start_search:string;
    max_travel_time_label: string;
    transport_type_label: string;
    select_location:string;
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
    additional_features: Array<{
      id: number;
      label: string;
      value: string;
    }> | null;
    also_search_for_label: string;
    also_search_for: Array<{
      id: number;
      label: string;
      value: string;
    }> | null;
    show_only_properties_for_label: string;
    show_only_properties_for: Array<{
      id: number;
      label: string;
      value: string;
    }> | null;
    placeHolder_Optional:string;
    placeHolder_Nothing:string;
    PlaceHolder_Dmatter:string;
    requirement_text:string;
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
    title:string;
    termsAndConditions:string;
  
  };
}
export interface HowItWorksData {
  subtitle: string;
  title: string;
}
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
    subtitle_let: string;
    subtitle_help:string;
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
    matchesPerWeek: string;
    withThisSearch: string;
    Add_up_search:string;
  };
  FAQ: Array<{
    id: number;
    title: string;
    Show_more:string;
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
export interface ReviewItemData {
  id: number;
  name: string;
  text: string;
  image: string | null;
  review: number;
}
export interface ReviewsData {
  subtitle_hero: string;
  title_hero: string;
  text_hero: string;
  button_hero: string;
  reviews: ReviewItemData[];
  title_review: string;
  subtitle_review: string;
  all_button: string;
  withPhotos_btn: string;
}
export interface CopyrightData {
  copyright_text: string;
  coc_text: string;
  email: string;
  links: {
    privacy: string;
    terms: string;
    cookies: string;
    consent_preferences: string;
  };
}

export interface PrivacyPolicyData {
  title: string;
  subtitle: string;
  introduction: string;
  content: string; 
}

export interface TermsServiceData {
  title: string;
  subtitle: string;
  introduction: string;
  content: string; 
}

// Status type for the fetching process
type FetchStatus = "idle" | "loading" | "success" | "error";

// functions to fetch data from strapi api :

// Base function to fetch content from Strapi
export function useStrapiContent<T>(contentType: string) {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en"; 

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
      } else {
        throw new Error("Invalid data format received from API");
      }
    } catch (err) {
      console.error(`Error fetching ${contentType}:`, err);
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
      setStatus("error");

     
    }
  }, [contentType, locale]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { data, status, error, refetch: fetchContent };
}
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
export function useDeleteAccountData() {
  return useStrapiContent<DeleteAccountData>("delete-account");
}
export function useChangePasswordData() {
  return useStrapiContent<ChangePasswordData>("change-password");
}
export function useOtpCodeData() {
  return useStrapiContent<OtpCodeData>("otp-code");
}
export function useLoginData() {
  return useStrapiContent<LoginData>("login");
}
export function useResetPasswordData() {
  return useStrapiContent<ResetPasswordData>("reset-password");
}
export function useReviewsData() {
  return useStrapiContent<ReviewsData>("review");
}
export function useWelcomeData() {
  return useStrapiContent<WelcomeData>("welcome");
}
export function useSearchData() {
  return useStrapiContent<SearchData>("search");
}
export function useMatchesData() {
  return useStrapiContent<MatchesPageData>("matche");
}
export function useCopyrightData() {
  return useStrapiContent<CopyrightData>("copyright");
}

export function usePrivacyPolicyData() {
  return useStrapiContent<PrivacyPolicyData>("privacy-policy");
}

export function useTermsServiceData() {
  return useStrapiContent<TermsServiceData>("terms-service");
}