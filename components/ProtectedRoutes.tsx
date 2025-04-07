"use client";
// next
import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// redux
import { useAppSelector } from "@/store/hooks/hooks";

export default function ProtectedRoutes({ children }: { children: ReactNode }) {
  const { token } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect on initial render if we're checking the token
    // This prevents redirecting during locale changes
    const handleAuth = async () => {
      // Add a small delay to allow token refresh/validation
      if (token === null || token === undefined) {
        // Extract the locale from the path
        const pathParts = pathname.split("/");
        const locale = pathParts.length > 1 ? pathParts[1] : "en"; // Default to 'en' if no locale found

        // Preserve the locale when redirecting to login
        router.push(`/${locale}/login`);
      }
    };

    handleAuth();
  }, [token, router, pathname]);

  return <>{token ? children : null}</>;
}
