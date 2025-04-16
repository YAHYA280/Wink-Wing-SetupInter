"use client";

import { useEffect } from "react";

export const CookieConsent = () => {
  useEffect(() => {
    if (!document.getElementById("cookieyes-script")) {
      const script = document.createElement("script");
      script.id = "cookieyes-script";
      script.src = `https://cdn-cookieyes.com/client_data/${process.env.NEXT_PUBLIC_COOKIEYES_ID}/script.js`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return null; 
};

export default CookieConsent; 

