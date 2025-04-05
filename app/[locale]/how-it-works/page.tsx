"use client";
// components
import HowItWorksHero from "@/components/HowItWorksHero";
import RentalHero from "@/components/RentalHero";
import SignUp from "@/components/SignUp";
import FAQ from "@/components/FAQ";

// redux
import { useAppSelector } from "@/store/hooks/hooks";

export default function HowItWorks() {
  const { token } = useAppSelector((state) => state.auth);
  return (
    <>
      <HowItWorksHero />
      <RentalHero bg="transparent" />
      {!token && <SignUp bg="#FFF7F5" />}
      <FAQ />
    </>
  );
}
