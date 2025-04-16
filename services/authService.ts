import axios from "axios";

interface AuthResponse {
  message: string;
  token: string;
  user?: any;
}

interface GoogleAuthParams {
  token: string; // Google ID token
}


export const googleAuth = async (params: GoogleAuthParams): Promise<AuthResponse> => {
  try {
    const response = await axios.post(
      // update this to your correct url
      `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
      params
    );
    return response.data;
  } catch (error: any) {
    const errorMessage = 
      error.response?.data?.error || error.message || "Google authentication failed";
    throw new Error(errorMessage);
  }
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