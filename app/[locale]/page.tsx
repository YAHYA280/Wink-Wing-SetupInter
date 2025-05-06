"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const locale = pathname.split('/')[1] || 'en';
  const { trackLogin, trackSignUp } = usePostHogTracking();
  const dispatch = useAppDispatch();
  
  // Reference to the search section
  const searchSectionRef = useRef<HTMLDivElement>(null);
  
  // Keep track of processed scroll keys
  const processedScrollKeys = useRef<Set<string>>(new Set());
  
  // State to trigger scroll attempts
  const [scrollAttempt, setScrollAttempt] = useState(0);

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

  // Handle scrolling to search section - using sequential setTimeout approach
  useEffect(() => {
    // Get the scroll parameter from URL
    const scrollKey = searchParams.get('scroll');
    
    // Process only if we have a scroll key and we haven't processed it yet
    if (scrollKey && !processedScrollKeys.current.has(scrollKey)) {
      // Mark this key as processed
      processedScrollKeys.current.add(scrollKey);
      
      // Get the city name from sessionStorage
      const cityName = sessionStorage.getItem(scrollKey);
      console.log(`Scrolling to search section for city: ${cityName}`);
      
      // Start attempt sequence by setting attempt to 1
      setScrollAttempt(1);
      
      // Clean up sessionStorage
      return () => {
        sessionStorage.removeItem(scrollKey);
      };
    }
  }, [searchParams]); // Re-run when search params change

  // Handle scroll attempts
  useEffect(() => {
    // Skip if no attempt is needed
    if (scrollAttempt === 0) return;
    
    // Skip if we've tried too many times
    if (scrollAttempt > 10) return;
    
    // Skip if ref is not available yet
    if (!searchSectionRef.current) {
      // Schedule next attempt
      const timer = setTimeout(() => {
        setScrollAttempt(prev => prev + 1);
      }, 300);
      
      return () => clearTimeout(timer);
    }
    
    // If we get here, the ref is available and we can scroll
    try {
      // Get element position
      const rect = searchSectionRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Detect if mobile or desktop based on screen width
      const isMobile = window.innerWidth <= 768; // Standard mobile breakpoint
      
      // Set different header offsets for mobile and desktop
      const headerOffset = isMobile ? -800 : -400;
      const targetPosition = rect.top + scrollTop - headerOffset;
      
      // Log device detection
      console.log(`Device detected: ${isMobile ? 'Mobile' : 'Desktop'}, using offset: ${headerOffset}`);
      
      // First smooth scroll
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Also try scrollIntoView as backup (on slight delay)
      const viewTimer = setTimeout(() => {
        if (searchSectionRef.current) {
          searchSectionRef.current.scrollIntoView({
            behavior: 'smooth',
            block: isMobile ? 'center' : 'start'
          });
        }
      }, 100);
      
      // Log success
      console.log(`Scrolled to position: ${targetPosition}`);
      
      // Reset attempt counter to stop trying
      setScrollAttempt(0);
      
      return () => {
        clearTimeout(viewTimer);
      };
    } catch (error) {
      console.error("Error scrolling:", error);
      
      // Schedule next attempt
      const timer = setTimeout(() => {
        setScrollAttempt(prev => prev + 1);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [scrollAttempt]);

  return (
    <>
      <Hero />
      <RentalHero bg="#FFF7F5" />
      <Renters />
      <div 
        ref={searchSectionRef} 
        id="search-section"
        style={{ 
          scrollMarginTop: '120px', 
          scrollBehavior: 'smooth' 
        }}
      >
        <SearchLocation />
      </div>
      <FAQ />
      <About />
    </>
  );
}