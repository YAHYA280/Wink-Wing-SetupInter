"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { handleGoogleAuthRedirect } from "@/services/authService";
import { usePostHogTracking } from "@/components/PosthogTracker";
import { useAppDispatch } from "@/store/hooks/hooks";
import { setToken, getMe } from "@/store/features/authSlice";

// components
import Hero from "@/components/Hero";
import RentalHero from "@/components/RentalHero";
import Renters from "@/components/Renters";
import SearchLocation from "@/components/SearchLocation";
import FAQ from "@/components/FAQ";
import About from "@/components/About";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const { trackLogin, trackSignUp } = usePostHogTracking();
  const dispatch = useAppDispatch();

  // Check for token on component mount
  useEffect(() => {
    const { token, source } = handleGoogleAuthRedirect();
    
    if (token) {
      dispatch(setToken(token));
      dispatch(getMe({ token }));
      
      if (source === "signup") {
        trackSignUp("google_user", { 
          signup_method: "google",
          language: locale
        });
        
        router.push(`/${locale}/welcome`);
      } else {
        trackLogin("google_user", { 
          login_method: "google", 
          locale 
        });
        
        router.push(`/${locale}/moving-guide`);
      }
    }
  }, [dispatch, locale, router, trackLogin, trackSignUp]);

  return (
    <>
      <Hero />
      <RentalHero bg="#FFF7F5" />
      <Renters />
      <SearchLocation />
      <FAQ />
      <About />
    </>
  );
}