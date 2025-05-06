"use client";
// next
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

// components
import PricingCard from "./PricingCard";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import {
  createCheckoutSession,
  clearError,
} from "@/store/features/paymentSlice";

// icons
import { GrClose } from "react-icons/gr";

// service for translations
import { usePricingData } from "@/services/translationService";
import axios from "axios";

export default function PricingBox() {
  // Get translations
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  const { data: pricingData, status } = usePricingData();

  // Pricing content from API with fallbacks
  const pricingContent = useMemo(() => {
    if (status === "success" && pricingData && pricingData.PricingBox) {
      return {
        title:
          pricingData.PricingBox.title ||
          "Sign up to be the first to receive matches.",
        one_month: pricingData.PricingBox.one_month || "1 month",
        two_month: pricingData.PricingBox.two_month || "2 month",
        three_month: pricingData.PricingBox.three_month || "3 month",
        button: pricingData.PricingBox.button || "Create search query",
        text:
          pricingData.PricingBox.text || "Try Winkwing risk-free for 14 days.",
        text_two:
          pricingData.PricingBox.text_two ||
          "If you are not satisfied, you will simply get your money back.",
        referralCode: pricingData.PricingBox.referralCode || "Referral Code",
        succcesReferral: pricingData.PricingBox.succcesReferral || " You’ll get an extra free month with this referral",
        
        succesResponse:pricingData.PricingBox.succesResponse || "Referral code applied!",
        warningResponse:pricingData.PricingBox.warningResponse || "Please log in first to apply this referral code.",
        failResponse:pricingData.PricingBox.failResponse || "Invalid referral code. Please check and try again.",
      };
    }
    return {
      title: "Sign up to be the first to receive matches.",
      one_month: "1 month",
      two_month: "2 month",
      three_month: "3 month",
      button: "Create search query",
      text: "Try Winkwing risk-free for 14 days.",
      text_two:
        "If you are not satisfied, you will simply get your money back.",
      referralCode: "Referral Code",
      succcesReferral:"You’ll get an extra free month with this referral",
      succesResponse:"Referral code applied!",
      warningResponse:"Please log in first to apply this referral code.",
      failResponse:"Invalid referral code. Please check and try again.",

    };
  }, [pricingData, status]);

  const pricings = [
    {
      id: 1,
      month: pricingContent.one_month,
      price: "€29.95",
    },
    {
      id: 2,
      month: pricingContent.two_month,
      price: "€19.95",
    },
    {
      id: 3,
      month: pricingContent.three_month,
      price: "€16.95",
    },
  ];

  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState<number>(2);
  const [referralCode, setReferralCode] = useState<string>("");
  const [referralStatus, setReferralStatus] = useState<
    "idle" | "valid" | "invalid" | "checking"
  >("idle");
  const [referralMessage, setReferralMessage] = useState<string>("");

  const handleSelect = (id: number) => {
    setSelectedOption(id);
  };

  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);
  const { error, loading } = useAppSelector((state) => state.payment);

  useEffect(() => {
    if (referralCode.trim() === "") {
      setReferralStatus("idle");
      setReferralMessage("");
      return;
    }

    const timer = setTimeout(() => {
      setReferralStatus("checking");

      const validateReferralCode = async () => {
        try {
          console.log(`Validating referral code: ${referralCode}`);
          
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/payment/referral-code/${referralCode}`,
            { headers }
          );
          
          console.log('API Response:', response);
          
         
          setReferralStatus("valid");
          setReferralMessage(
            `${pricingContent.succesResponse}`
          );
        } catch (error: any) { 
          console.error("Referral code validation error:", error);
          
          if (error.response && error.response.status === 401) {
            console.log('Error response: 401', error.response.data);
            // Warning state for login required
            setReferralStatus("invalid"); 
            setReferralMessage(
              `${pricingContent.warningResponse}`
            );
          } else if (error.response && error.response.status === 400) {
            console.log('Error response: 400', error.response.data);
            setReferralStatus("invalid");
            setReferralMessage(
              "Please enter a referral code first"
            );
          } else {
            // Other error cases - invalid code
            if (error.response) {
              console.log('Error response:', error.response.status, error.response.data);
            }
            setReferralStatus("invalid");
            setReferralMessage(
              `${pricingContent.failResponse}`
            );
          }
        }
      };

      validateReferralCode();
    }, 500);

    return () => clearTimeout(timer);
  }, [referralCode, token]);


  // this redirect to login page 
  // const handleCheckout = async () => {
  //   if (!token) {
  //     router.push(`/${locale}/signup`);
  //     return;
  //   }
  //   try {
  //     const result = await dispatch(
  //       createCheckoutSession({
  //         token,
  //         interval: selectedOption,
  //         referralCode: referralStatus === "valid" ? referralCode : "",
  //       } as { token: string; interval: number; referralCode: string })
  //     );
  
  //     if (createCheckoutSession.fulfilled.match(result)) {
  //       router.push(result.payload.url);
  //     } else if (createCheckoutSession.rejected.match(result)) {
  //       // Check if the error is due to authentication issues
  //       if (result.payload && typeof result.payload === 'string' && 
  //           (result.payload.includes('auth') || 
  //            result.payload.includes('token') || 
  //            result.payload.includes('login'))) {
  //         // Authentication error
  //         setReferralStatus("invalid");
  //         setReferralMessage("Please log in or sign up to continue with checkout.");
          
  //         // Optional: Redirect to login after a short delay
  //         setTimeout(() => {
  //           router.push(`/${locale}/login`);
  //         }, 2000);
  //       }
  //       // Other errors are handled by the error state in Redux
  //     }
  //   } catch (e: any) {
  //     console.error("Checkout error:", e);
      
  //     // Handle 400 error specifically as an authentication issue
  //     if (e.response && e.response.status === 400) {
  //       console.error("400 Bad Request:", e.response.data);
        
  //       setReferralStatus("invalid");
  //       setReferralMessage("Please log in or sign up to continue with checkout.");
        
  //       // Optional: Redirect to login after a short delay
  //       setTimeout(() => {
  //         router.push(`/${locale}/login`);
  //       }, 2000);
  //     }
  //   }
  // };


// this show erro message

  const handleCheckout = async () => {
    // Check if user is logged in
    if (!token) {
      // Instead of redirecting, show an error message
      setReferralStatus("invalid");
      setReferralMessage("Please login or sign up to proceed with checkout.");
      return;
    }
    
    try {
      const result = await dispatch(
        createCheckoutSession({
          token,
          interval: selectedOption,
          referralCode: referralStatus === "valid" ? referralCode : "",
        } as { token: string; interval: number; referralCode: string })
      );
  
      if (createCheckoutSession.fulfilled.match(result)) {
        router.push(result.payload.url);
      } else if (createCheckoutSession.rejected.match(result)) {
        // Error is handled by the error state
      }
    } catch (e: any) {
      console.error("Checkout error:", e);
      
      // Handle 400 error specifically as an authentication issue
      if (e.response && e.response.status === 400) {
        console.error("400 Bad Request:", e.response.data);
        
        setReferralStatus("invalid");
        setReferralMessage("Please login or sign up to proceed with checkout.");
      }
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const getReferralCodeStyles = () => {
    switch (referralStatus) {
      case "valid":
        return "border-green-500 bg-green-50";
      case "invalid":
        return "border-red-500 bg-red-50";
      case "checking":
        return "border-yellow-500 bg-yellow-50";
      default:
        return "border-[#AEAEAE] bg-[#F8F8F8]";
    }
  };

  // Get appropriate button classes based on referral status
  const getButtonClasses = () => {
    const baseClasses =
      "flex items-center justify-center gap-3 rounded-lg font-semibold mb-8 text-[14px] leading-[24px] border py-3 w-full transition-all duration-300";

    // Disabled state
    if (loading || (referralCode !== "" && referralStatus === "invalid")) {
      return `${baseClasses} bg-main border-main text-white opacity-70 cursor-not-allowed`;
    }

    // Valid referral code - always keep text white even on hover
    if (referralStatus === "valid" && referralCode !== "") {
      return `${baseClasses} bg-main border-main text-white hover:bg-[#d34b39]`;
    }

    // Normal state with hover effect
    return `${baseClasses} bg-main border-main text-white xl:hover:bg-transparent xl:hover:text-main`;
  };

  return (
    <div className="flex items-center justify-center py-[50px] px-2 bg-[#FFF7F5]">
      <div className="w-full md:w-[600px] bg-white shadow rounded-[20px] p-4 md:p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-[16px] leading-[24px] text-[#2F2F2F] mb-8">
            {pricingContent.title}
          </h3>
          <div className="w-full">
            <div className="flex flex-col items-center justify-center gap-4">
              {pricings.map((pricing) => (
                <PricingCard
                  key={pricing.id}
                  {...pricing}
                  handleSelect={handleSelect}
                  selectedOption={selectedOption}
                />
              ))}
            </div>
            <div className="my-8">
              <div className="relative">
                <input
                  className={`flex items-center justify-between rounded-[10px] border p-3 outline-none w-full ${getReferralCodeStyles()}`}
                  type="text"
                  placeholder={pricingContent.referralCode}
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
                {referralStatus === "checking" && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-yellow-600"></div>
                  </div>
                )}
                {referralStatus === "valid" && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
                {referralStatus === "invalid" && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              {referralMessage && (
                <p
                  className={`mt-2 text-sm ${
                    referralStatus === "valid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {referralMessage}
                </p>
              )}
            </div>
            {error && (
              <div className="flex items-center justify-center w-full bg-[#FAD1D5] relative border border-[#F45D48] py-4 mb-6 px-8 rounded-lg">
                <span className="flex items-center justify-center text-center">
                  {error || "An unexpected error occurred."}
                </span>
                <button onClick={handleClearError} className="absolute right-4">
                  <GrClose size={20} />
                </button>
              </div>
            )}
            <button
              onClick={handleCheckout}
              disabled={
                loading || (referralCode !== "" && referralStatus === "invalid")
              }
              className={getButtonClasses()}
            >
              {loading ? (
                "Processing..."
              ) : referralStatus === "checking" ? (
                "Validating referral code..."
              ) : referralStatus === "valid" && referralCode !== "" ? (
                <>
                  <span className="flex items-center gap-1 text-white">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {pricingContent.button}
                  </span>
                </>
              ) : (
                <>
                  <span>
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="stroke-white group-hover:stroke-main"
                        d="M10.0626 18.2084C14.5615 18.2084 18.2084 14.5615 18.2084 10.0626C18.2084 5.56369 14.5615 1.91675 10.0626 1.91675C5.56369 1.91675 1.91675 5.56369 1.91675 10.0626C1.91675 14.5615 5.56369 18.2084 10.0626 18.2084Z"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        className="stroke-white group-hover:stroke-main"
                        d="M12.7733 6.87269C12.4177 6.51631 11.9951 6.23368 11.53 6.04102C11.0648 5.84836 10.5662 5.74946 10.0627 5.75C9.55921 5.74946 9.06058 5.84836 8.59541 6.04102C8.13025 6.23368 7.70771 6.51631 7.35205 6.87269M15.9191 15.9189L19.9848 19.9846"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {pricingContent.button}
                </>
              )}
            </button>
            <div className="text-[16px] leading-[24px]">
              <Link className="text-[#0A806C] underline" href="/">
                {pricingContent.text}
              </Link>
              <h3 className="text-[#0A806C]">{pricingContent.text_two}</h3>
            </div>
            {referralStatus === "valid" && referralCode !== "" && (
              <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg text-left">
                <p className="flex items-center gap-2 text-green-800">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                  {pricingContent.succcesReferral}:{" "}
                    <strong>{referralCode}</strong>
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
