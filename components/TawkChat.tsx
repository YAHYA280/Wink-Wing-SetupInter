"use client";

import { useEffect } from "react";

const TawkChat = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only initialize if not already loaded
      if (!document.getElementById("tawk-script")) {
        // Create initial script with Tawk variables
        const script1 = document.createElement("script");
        script1.id = "tawk-script";
        script1.type = "text/javascript";
        script1.innerHTML = `
          var Tawk_API = Tawk_API || {};
          var Tawk_LoadStart = new Date();
        `;
        document.head.appendChild(script1);
        
        // Create and append the main Tawk script

        const tawkPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
        const tawkWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

        if (!tawkWidgetId || !tawkPropertyId) {
          console.error("Tawk Chat: Missing environment variables");
          return;
        }

        const script2 = document.createElement("script");
        script2.async = true;
        script2.src = `https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}`;
        script2.charset = "UTF-8";
        script2.setAttribute("crossorigin", "*");
        document.head.appendChild(script2);
      }
    }
  }, []);

  return null;
};

export default TawkChat; 

