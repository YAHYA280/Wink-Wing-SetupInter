"use client";
// components
import TrialMessage from "./TrialMessage";
import DashboardInfo from "./DashboardInfo";
import DashboardMenu from "./DashboardMenu";

// translation service
import { useDashboardData } from "@/services/translationService";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// redux
import { useAppSelector, useAppDispatch } from "@/store/hooks/hooks";
import { getSubscription } from "@/store/features/paymentSlice";
import { selectSearchJobs } from "@/store/features/searchJobsSlice";

// analytics
import { usePostHogTracking } from "@/components/PosthogTracker";

export default function Dashboard() {
  const { data: dashboardData, status } = useDashboardData();

  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  
  // Redux state selectors
  const { token, user } = useAppSelector((state) => state.auth);
  const { subscription } = useAppSelector((state) => state.payment);
  const searchJobs = useAppSelector(selectSearchJobs);
  
  // PostHog tracking
  const { trackFeatureUsage, setUserProperties } = usePostHogTracking();

  // Fetch subscription data when component loads
  useEffect(() => {
    if (token) {
      dispatch(getSubscription({ token }));
    }
  }, [token, dispatch]);

  useEffect(() => {
    // When data is loaded or if there's an error, stop loading
    if (status === "success" || status === "error") {
      setLoading(false);
    }
  }, [status]);
  
  // Track dashboard view and set user properties when user visits dashboard
  useEffect(() => {
    if (token && user && !loading) {
      // Track dashboard view
      trackFeatureUsage("dashboard_view", {
        active_search_jobs: searchJobs.length,
        subscription_status: subscription?.status || "none",
        subscription_plan: subscription?.plan || "free"
      });
      
      // Set user properties for better segmentation
      setUserProperties({
        user_id: user.id.toString(),
        email: user.email,
        role: user.role,
        name: user.name,
        signup_date: user.createdAt,
        has_subscription: !!subscription,
        subscription_status: subscription?.status || "none",
        subscription_plan: subscription?.plan || "free",
        active_search_jobs: searchJobs.length,
        has_whatsapp: !!user.whatsappNumber,
        whatsapp_notifications: user.whatsappNotifications,
        email_notifications: user.emailNotifications
      });
    }
  }, [token, user, subscription, searchJobs, loading, trackFeatureUsage, setUserProperties]);

  // Show a simple loading state while waiting for translations
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-main"></div>
      </div>
    );
  }

  // If no token, don't render anything - let ProtectedRoutes handle the redirect
  if (!token) {
    return null;
  }

  const enhancedDashboardData = dashboardData ? {
    ...dashboardData,
    _analytics: {
      searchJobsCount: searchJobs.length,
      subscriptionStatus: subscription?.status || "inactive",
      subscriptionPlan: subscription?.plan || "free"
    }
  } : null;

  return (
    <div className="flex flex-col items-center justify-center gap-[60px] py-[150px] px-2 w-full md:px-20 xl:px-40 xxl:px-[300px]">
      <TrialMessage translationData={dashboardData?.TrialMessage} />
      <DashboardInfo translationData={enhancedDashboardData} />
      <DashboardMenu translationData={enhancedDashboardData} />
    </div>
  );
}
