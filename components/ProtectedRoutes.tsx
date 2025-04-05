"use client";
// next
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

// redux
import { useAppSelector } from "@/store/hooks/hooks";

export default function ProtectedRoutes({ children }: { children: ReactNode }) {
  const { token } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return <>{token ? children : null}</>;
}
