import axios from "axios";

interface GoogleAuthOptions {
    country: string;
    name?: string;
    type: string;
    cityId?: number;
    maxTravelTime: number;
    transportType: string;
    minPrice: number;
    maxPrice: number;
    minBeds: number;
    minFloorArea: number;
    furnished: boolean | null;
    neighbourhoods: any[];
    nice_to_have: string[];
    also_search_for: string[];
    show_only_properties_for: string[];
    userType: string;
    address: string;
    point: number[];
    radius: number;
    geometry: any;
  
}

export const googleAuth = async (options?: GoogleAuthOptions,source: string = "login"): Promise<void> => {
  // console.log("options", {source, ...options});
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/google/redirect`,
      source === "login" ? {source: "login"} : {source: "signup", ...options}
    );
    // console.log("response", response);
    window.location.href = response.data.url;
  } catch (error: any) {
    const errorMessage = 
      error.response?.data?.error || error.message || "Google authentication redirect failed";
    throw new Error(errorMessage);
  }
};

export const handleGoogleAuthRedirect = (): { token: string | null, source: string | null } => {
  if (typeof window === "undefined") return { token: null, source: null };
  
  const queryString = window.location.search;
  
  const tokenMatch = queryString.match(/[?&]token=([^&]*)/);
  const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;
  
  const sourceMatch = queryString.match(/[?&]source=([^&]*)/);
  const source = sourceMatch ? decodeURIComponent(sourceMatch[1]) : "login";
  
  if (token) {
    localStorage.setItem("auth-token", token);
    // console.log("token", token);
    
    let cleanUrl = window.location.href;
    cleanUrl = cleanUrl.replace(/([?&])token=[^&]*(&|$)/, (_, p1, p2) => {
      return p2 === "&" ? p1 : "";
    });
    cleanUrl = cleanUrl.replace(/([?&])source=[^&]*(&|$)/, (_, p1, p2) => {
      return p2 === "&" ? p1 : "";
    });
    
    window.history.replaceState({}, document.title, cleanUrl);
  }
  
  return { token, source };
};

export const initGoogleAuth = (): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }
    
    window.onload = () => {
      // @ts-ignore 
      if (!window.google) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          resolve();
        };
        document.head.appendChild(script);
      } else {
        resolve();
      }
    };
  });
}; 