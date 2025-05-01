"use client";
// next
import { useRouter , usePathname} from "next/navigation";

import { useMemo } from "react";

// components
import WelcomeHero from "@/components/WelcomeHero";
import PricingBox from "@/components/PricingBox";
import RentalServives from "@/components/RentalServices";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { logout } from "@/store/features/authSlice";

export default function WelcomePage() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);

  const router = useRouter();

  const handleLogout = async () => {
    if (token) {
      await dispatch(logout());

      router.push(`${locale}/`);
    }
  };

  return (
    <>
      <WelcomeHero />
      <PricingBox />
      <RentalServives />
    </>
  );
}
