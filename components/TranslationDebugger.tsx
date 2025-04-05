// components/TranslationDebugger.tsx
"use client";
import { useTranslations } from "next-intl";

export default function TranslationDebugger() {
  // Try different approaches to accessing translations
  let navbarData = null;
  let error = null;

  try {
    // Get the raw translator function
    const t = useTranslations();

    // Log what's available
    console.log("Available translations:", t);

    // Try to get the navbar specifically
    try {
      const navbarT = useTranslations("strapi.navbar");
      console.log("Navbar translations:", navbarT);
    } catch (e) {
      console.error("Error accessing navbar:", e);
    }

    // Try different paths to see what's available
    try {
      const directT = useTranslations("strapi");
      console.log("Strapi direct:", directT);
    } catch (e) {
      console.error("Error accessing strapi directly:", e);
    }
  } catch (e) {
    error = e;
    console.error("General translation error:", e);
  }

  return (
    <div style={{ padding: "10px", background: "#f0f0f0", margin: "10px 0" }}>
      <h3>Translation Debugger</h3>
      {error ? (
        <p>Error loading translations: {String(error)}</p>
      ) : (
        <p>Check console for translation data</p>
      )}
    </div>
  );
}
