"use client";
// components
import TrialMessage from "./TrialMessage";
import DashboardInfo from "./DashboardInfo";
import DashboardMenu from "./DashboardMenu";

// translation service
import { useDashboardData } from "@/services/translationService";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks/hooks";
import { usePathname } from "next/navigation";

export default function Dashboard() {
  const { data: dashboardData, status } = useDashboardData();
  const [loading, setLoading] = useState(true);
  const { token } = useAppSelector((state) => state.auth);
  const pathname = usePathname();

  useEffect(() => {
    // When data is loaded or if there's an error, stop loading
    if (status === "success" || status === "error") {
      setLoading(false);
    }
  }, [status]);

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

  return (
    <div className="flex flex-col items-center justify-center gap-[60px] py-[150px] px-2 w-full md:px-20 xl:px-40 xxl:px-[300px]">
      <TrialMessage translationData={dashboardData?.TrialMessage} />
      <DashboardInfo />
      <DashboardMenu />
    </div>
  );
}
