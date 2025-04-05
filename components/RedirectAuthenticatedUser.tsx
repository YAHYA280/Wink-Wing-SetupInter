"use client";
// next
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

// redux
import { useAppSelector } from "@/store/hooks/hooks";

export default function RedirectAuthenticatedUser({
  children,
}: {
  children: ReactNode;
}) {
  const { token } = useAppSelector((state) => state.auth);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (token && (pathname === "/signup" || pathname === "/login")) {
      router.push("/");
    }
  }, [pathname, token]);

  if (token && (pathname === "/signup" || pathname === "/login")) return null;

  return <>{children}</>;
}
