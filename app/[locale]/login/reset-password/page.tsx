"use client";
// next
import { FormEvent, useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import {
  forgotPassword,
  setEmail as setAuthEmail,
} from "@/store/features/authSlice";

// translation service
import { useResetPasswordData } from "@/services/translationService";
import local from "next/font/local";

export default function ResetPassword() {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Get current locale from the pathname
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);

  // Fetch translations from the API
  const { data: resetPasswordData, status } = useResetPasswordData();

  // Default content for fallback
  const defaultContent = {
    Header: "Find your new home the easy way",
    title: "Password Reset",
    text: "Forgotten your password? Enter your email address below, and we'll email instructions",
    PlaceHolder: "Email",
    btn: "Reset",
    succesEmail:"Email Sent Successfully!",
    sentEmail : "We've sent an email to",
    confirmationText: "We've sent an email to reset your password. Please check your inbox.",
    backToLogin: "Back to Login"
  };

  // Merge API data with defaults using useMemo
  const content = useMemo(() => {
    if (status === "success" && resetPasswordData) {
      return {
        ...defaultContent,
        ...resetPasswordData,
      };
    }
    return defaultContent;
  }, [resetPasswordData, status]);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(forgotPassword({ email }));
      dispatch(setAuthEmail(email));
      
      setShowConfirmation(true);
      
   
    } catch (e) {
      console.error(e);
    }
  };

  const handleBackToLogin = () => {
    router.push(`/${locale}/login`);
  };

  return (
    <>
      <div className="flex flex-col items-center md:justify-center gap-8 min-h-screen py-24 px-2 bg-[#FFF7F5]">
        <div className="flex flex-col items-center text-center md:text-left md:items-start gap-4">
          <h5 className="text-[16px] leading-[24px] text-main">
            {content.Header}
          </h5>
          <h1 className="flex flex-col sm:flex-row items-center gap-4 font-bold font-arial text-[#003956] text-3xl xs:text-4xl md:text-5xl">
            {content.title}
          </h1>
        </div>
        <div className="w-full md:w-[730px] bg-white md:h-max rounded-lg p-6 relative z-10">
          {!showConfirmation ? (
            <div className="flex flex-col items-center justify-center md:items-start text-center gap-5">
              <h4 className="text-[16px] leading-[24px] md:text-left">
                {content.text}
              </h4>
              <form
                onSubmit={handleResetPassword}
                className="flex flex-col gap-8 w-full"
              >
                <input
                  className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full"
                  type="email"
                  placeholder={content.PlaceHolder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <button
                  disabled={loading}
                  className="bg-main border border-main rounded-lg py-2 text-white font-semibold text-lg xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
                >
                  {loading ? "Loading..." : content.btn}
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-8 p-4">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#003956]"> {content.succesEmail}</h2>
              <p className="text-center text-gray-600">
                {content.confirmationText}
              </p>
              <p className="text-center text-gray-600">
              {content.sentEmail} <span className="font-semibold">{email}</span>
              </p>
              <button 
                onClick={handleBackToLogin}
                className="mt-4 bg-main border border-main rounded-lg py-2 px-6 text-white font-semibold text-lg xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
              >
                {content.backToLogin}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* svg elements of page */}
      <div className="hidden lg:block absolute bottom-0 left-0">
        <svg
          width="396"
          height="359"
          viewBox="0 0 396 359"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 37C17.7173 37 26 28.7173 26 18.5C26 8.28273 17.7173 0 7.5 0L0 0L0 37L7.5 37Z"
            fill="#FF9067"
            fillOpacity="0.25"
          />
          <path
            d="M396 243V274C396 320.944 357.944 359 311 359H231V328C231 281.056 269.056 243 316 243H396Z"
            fill="#FF9067"
            fillOpacity="0.25"
          />
          <path
            d="M211 359L180 359C133.056 359 95 320.944 95 274L95 53L126 53C172.944 53 211 91.0558 211 138L211 359Z"
            fill="#52ABD8"
            fillOpacity="0.25"
          />
          <path
            d="M75 235L44 235C19.6995 235 -6.7683e-06 254.699 -5.70609e-06 279L-2.99599e-06 341L31 341C55.3005 341 75 321.301 75 297L75 235Z"
            fill="#FF9067"
            fillOpacity="0.25"
          />
          <path
            d="M75 120L35 120C15.67 120 6.84959e-07 104.33 1.5299e-06 85L2.92866e-06 53L40 53C59.33 53 75 68.67 75 88L75 120Z"
            fill="#FF9067"
            fillOpacity="0.25"
          />
          <path
            d="M38.5 146C58.6584 146 75 162.342 75 182.5C75 202.658 58.6584 219 38.5 219H0L0 146H38.5Z"
            fill="#52ABD8"
            fillOpacity="0.25"
          />
        </svg>
      </div>
      <div className="hidden lg:block absolute top-20 right-0">
        <svg
          width="359"
          height="396"
          viewBox="0 0 359 396"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M37 7.5C37 17.7173 28.7173 26 18.5 26C8.28273 26 0 17.7173 0 7.5V0H37V7.5Z"
            fill="#FF9067"
            fillOpacity="0.25"
          />
          <path
            d="M359 231L328 231C281.056 231 243 269.056 243 316L243 396L274 396C320.944 396 359 357.944 359 311L359 231Z"
            fill="#FF9067"
            fillOpacity="0.25"
          />
          <path
            d="M359 211L359 180C359 133.056 320.944 95 274 95L53 95L53 126C53 172.944 91.0558 211 138 211L359 211Z"
            fill="#52ABD8"
            fillOpacity="0.25"
          />
          <path
            d="M235 75L235 44C235 19.6995 254.699 -6.7683e-06 279 -5.70609e-06L341 -2.99599e-06L341 31C341 55.3005 321.301 75 297 75L235 75Z"
            fill="#FF9067"
            fillOpacity="0.25"
          />
          <path
            d="M120 75L120 35C120 15.67 104.33 6.84959e-07 85 1.5299e-06L53 2.92866e-06L53 40C53 59.33 68.67 75 88 75L120 75Z"
            fill="#FF9067"
            fillOpacity="0.25"
          />
          <path
            d="M146 38.5C146 58.6584 162.342 75 182.5 75C202.658 75 219 58.6584 219 38.5V0H146V38.5Z"
            fill="#52ABD8"
            fillOpacity="0.25"
          />
        </svg>
      </div>
    </>
  );
}