"use client";
// next
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const handleLogout = async () => {
    if (token) {
      await dispatch(logout());

      router.push("/");
    }
  };

  return (
    <>
      {/* {isSubscribed === true ? (
        <Nav />
      ) : (
        <button
          onClick={handleLogout}
          className="flex items-center ml-auto m-8 gap-3 bg-secondary border border-secondary px-8 py-3 group rounded-lg xl:hover:bg-transparent transition-all duration-300"
        >
          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.4375 18.0714C13.6753 18.0714 15.8214 17.2248 17.4037 15.7178C18.9861 14.2108 19.875 12.1669 19.875 10.0357C19.875 7.90451 18.9861 5.86059 17.4037 4.35361C15.8214 2.84662 13.6753 2 11.4375 2"
              className="stroke-white group-hover:stroke-secondary"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M3 10.0357H13.5469M13.5469 10.0357L10.3828 7.02234M13.5469 10.0357L10.3828 13.0491"
              className="stroke-white group-hover:stroke-secondary"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="text-white font-semibold group-hover:text-secondary">
            Log out
          </span>
        </button>
      )} */}
      <div className="flex items-center justify-between max-w-[1164px] mx-auto">
        <img src="/winkwing-logo.svg" alt="" />
        <button
          onClick={handleLogout}
          className="flex items-center ml-auto m-8 gap-3 bg-secondary border border-secondary px-8 py-3 group rounded-lg xl:hover:bg-transparent transition-all duration-300"
        >
          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.4375 18.0714C13.6753 18.0714 15.8214 17.2248 17.4037 15.7178C18.9861 14.2108 19.875 12.1669 19.875 10.0357C19.875 7.90451 18.9861 5.86059 17.4037 4.35361C15.8214 2.84662 13.6753 2 11.4375 2"
              className="stroke-white group-hover:stroke-secondary"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M3 10.0357H13.5469M13.5469 10.0357L10.3828 7.02234M13.5469 10.0357L10.3828 13.0491"
              className="stroke-white group-hover:stroke-secondary"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="text-white font-semibold group-hover:text-secondary">
            Log out
          </span>
        </button>
      </div>
      <WelcomeHero />
      <PricingBox />
      <RentalServives />
    </>
  );
}
