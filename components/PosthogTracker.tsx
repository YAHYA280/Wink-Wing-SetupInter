"use client";

import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

declare global {
  interface Window {
    posthog?: typeof posthog;
  }
}

// Custom hook for PostHog tracking
export const usePostHogTracking = () => {
  const posthog = usePostHog();
  
  // Track user sign up
  const trackSignUp = (userId: string, properties?: Record<string, any>) => {
    posthog.identify(userId);
    posthog.capture("user_signed_up", properties);
  };
  
  // Track user login
  const trackLogin = (userId: string, properties?: Record<string, any>) => {
    posthog.identify(userId);
    posthog.capture("user_logged_in", properties);
  };
  
  // Track form submissions
  const trackFormSubmission = (formName: string, properties?: Record<string, any>) => {
    posthog.capture("form_submitted", {
      form_name: formName,
      ...properties
    });
  };
  
  // Track button clicks
  const trackButtonClick = (buttonName: string, properties?: Record<string, any>) => {
    posthog.capture("button_clicked", {
      button_name: buttonName,
      ...properties
    });
  };
  
  // Track feature usage
  const trackFeatureUsage = (featureName: string, properties?: Record<string, any>) => {
    posthog.capture("feature_used", {
      feature_name: featureName,
      ...properties
    });
  };
  
  // Set user properties
  const setUserProperties = (properties: Record<string, any>) => {
    posthog.people.set(properties);
  };
  
  // Track errors
  const trackError = (errorType: string, errorMessage: string, properties?: Record<string, any>) => {
    posthog.capture("error_occurred", {
      error_type: errorType,
      error_message: errorMessage,
      ...properties
    });
  };
  
  // Track conversion completion
  const trackConversion = (goalName: string, properties?: Record<string, any>) => {
    posthog.capture("goal_completed", {
      goal_name: goalName,
      ...properties
    });
  };
  
  // Track page views manually 
  const trackPageView = (url?: string, properties?: Record<string, any>) => {
    posthog.capture("$pageview", {
      $current_url: url || window.location.href,
      ...properties
    });
  };
  
  // Reset user
  const resetUser = () => {
    posthog.reset();
  };

  return {
    trackSignUp,
    trackLogin,
    trackFormSubmission,
    trackButtonClick,
    trackFeatureUsage,
    setUserProperties,
    trackError,
    trackConversion,
    trackPageView,
    resetUser,
    posthog 
  };
};

// Auto-tracking component for global error and router change tracking
const PostHogTracker = () => {
  const { trackError, trackPageView } = usePostHogTracking();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Track page views on route changes
  useEffect(() => {
    if (pathname) {
      let url = window.location.origin + pathname;
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }
      
      trackPageView(url, {
        path: pathname,
        referrer: document.referrer,
        device_type: getDeviceType(),
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight
      });
    }
  }, [pathname, searchParams, trackPageView]);
  
  // Track global errors
  useEffect(() => {
    // Global error handler
    const handleGlobalError = (event: any) => {
      if ('message' in event && 'filename' in event) {
        const errorEvent = event as unknown as {
          message: string;
          error?: Error;
          filename?: string;
          lineno?: number;
          colno?: number;
        };
        
        trackError(
          "uncaught_exception",
          errorEvent.message,
          {
            error_stack: errorEvent.error?.stack,
            error_filename: errorEvent.filename,
            error_lineno: errorEvent.lineno,
            error_colno: errorEvent.colno,
            url: window.location.href
          }
        );
      }
    };
    
    // Track unhandled promise rejections
    const handleUnhandledRejection = (event: any) => {
      if ('reason' in event) {
        const reason = (event as any).reason;
        trackError(
          "unhandled_promise_rejection",
          reason?.message || "Unknown promise rejection",
          {
            error_stack: reason?.stack,
            url: window.location.href
          }
        );
      }
    };
    
    // Track clicks for heatmap data
    const handleClick = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      const elementTag = element.tagName.toLowerCase();
      
      if (["a", "button", "input", "select", "textarea"].includes(elementTag)) {
        const elementText = element.textContent?.trim() || "";
        const elementId = element.id || "";
        const elementClass = element.className || "";
        
        window.posthog?.capture("$autocapture", {
          $element_tag: elementTag,
          $element_text: elementText.substring(0, 50), 
          $element_id: elementId,
          $element_class: elementClass,
          $browser_language: navigator.language
        });
      }
    };
    
    window.addEventListener("error", handleGlobalError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    document.addEventListener("click", handleClick);
    
    return () => {
      window.removeEventListener("error", handleGlobalError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      document.removeEventListener("click", handleClick);
    };
  }, [trackError]);

  return null; 
};

function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export default PostHogTracker; 