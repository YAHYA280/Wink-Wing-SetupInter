"use client";
// next
import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// redux
import { useAppSelector } from "@/store/hooks/hooks";

export default function ProtectedRoutes({ children }: { children: ReactNode }) {
  const { token } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    // Extract the locale from the path
    const getLocale = () => {
      const pathParts = pathname.split("/");
      return pathParts.length > 1 ? pathParts[1] : "en"; // Default to 'en' if no locale found
    };

    // Check for token in localStorage directly as a fallback
    const checkLocalStorage = () => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("auth-token") !== null;
      }
      return false;
    };

    const locale = getLocale();

    // Use a small delay to allow TokenProvider to set the token in Redux
    const timeoutId = setTimeout(() => {
      // Check both Redux state and localStorage
      const hasValidToken = !!token || checkLocalStorage();
      setHasToken(hasValidToken);

      if (!hasValidToken) {
        router.push(`/${locale}/login`);
      }

      setIsChecking(false);
    }, 500); // 500ms delay to allow token to be loaded from localStorage

    return () => clearTimeout(timeoutId);
  }, [token, router, pathname]);

  // Show loading or null during the check
  if (isChecking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-main"></div>
      </div>
    );
  }

  // Once checked, either show children or null (redirect already happening)
  return hasToken ? <>{children}</> : null;
}
