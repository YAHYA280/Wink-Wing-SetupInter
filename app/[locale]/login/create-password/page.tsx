"use client";
// next
import { FormEvent, useState, useMemo, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// react-icons
import { GrClose } from "react-icons/gr";
import { FiCheckCircle } from "react-icons/fi";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import {
  clearError,
  resetPassword,
  setError,
  resetPasswordState
} from "@/store/features/authSlice";

// translation service
import { useChangePasswordData } from "@/services/translationService";

export default function CreateNewPassword() {
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<string>("weak");

  const dispatch = useAppDispatch();
  const { loading, error, otp, email, resetPasswordSuccess } = useAppSelector((state) => state.auth);

  const router = useRouter();

  // Get current locale from the pathname
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);

  // Fetch translations from the API
  const { data: changePasswordData, status } = useChangePasswordData();

  // Default content for fallback
  const defaultContent = {
    subtitle: "Find your new home the easy way",
    title: "Change password",
    text: "Enter your new password below to reset your account password.",
    password_placeholder: "New password",
    repeatpassword_placeholder: "Repeat password",
    button: "Submit",
    password_requirements: "Password must be at least 8 characters with a combination of letters, numbers, and special characters.",
    passwords_not_match: "Passwords do not match",
    password_too_weak: "Password is too weak",
    reset_success: "Password reset successfully!",
    back_to_login: "Back to Login",
    success_details: "Your password has been changed successfully. You can now login with your new password."
  };

  // Merge API data with defaults using useMemo
  const content = useMemo(() => {
    if (status === "success" && changePasswordData) {
      return {
        ...defaultContent,
        ...changePasswordData,
      };
    }
    return defaultContent;
  }, [changePasswordData, status]);

  // Redirect to login if required information is missing
  useEffect(() => {
    if (!email || !otp) {
      router.push(`/${locale}/login/reset-password`);
    }
  }, [email, otp, router, locale]);

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    if (isLongEnough && hasLetter && hasNumber && hasSpecialChar) {
      return "strong";
    } else if (isLongEnough && ((hasLetter && hasNumber) || (hasLetter && hasSpecialChar) || (hasNumber && hasSpecialChar))) {
      return "medium";
    } else {
      return "weak";
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    dispatch(clearError());

    // Check if passwords match
    if (password !== repeatPassword) {
      dispatch(setError(content.passwords_not_match || "Passwords do not match"));
      return;
    }

    // Check password strength
    if (passwordStrength === "weak") {
      dispatch(setError(content.password_too_weak || "Password is too weak"));
      return;
    }

    try {
      await dispatch(
        resetPassword({
          email: email as string,
          otpCode: otp as string,
          password,
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  function handleClearError() {
    dispatch(clearError());
  }

  function handleBackToLogin() {
    dispatch(resetPasswordState());
    
    setTimeout(() => {
      router.push(`/${locale}/login`);
    }, 100);
  }

  return (
    <>
      <div className="flex flex-col items-center md:justify-center gap-8 min-h-screen py-24 px-2 bg-[#FFF7F5]">
        <div className="flex flex-col items-center text-center md:text-left md:items-start gap-4">
          <h5 className="text-[16px] leading-[24px] text-main">
            {content.subtitle}
          </h5>
          <h1 className="flex flex-col sm:flex-row items-center gap-4 font-bold font-arial text-[#003956] text-3xl xs:text-4xl md:text-5xl">
            {content.title}
          </h1>
        </div>
        <div className="w-full md:w-[730px] bg-white md:h-max rounded-lg p-6 relative z-10">
          {!resetPasswordSuccess ? (
            <div className="flex flex-col items-center justify-center md:items-start text-center gap-5">
              <h4 className="text-[16px] leading-[24px] md:text-left">
                {content.text}
              </h4>
              <form
                onSubmit={handleResetPassword}
                className="flex flex-col gap-4 w-full"
              >
                <div className="flex flex-col gap-8">
                  <div>
                    <input
                      className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full"
                      type="password"
                      placeholder={content.password_placeholder}
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      minLength={8}
                    />
                    {password && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          <div className={`h-1 flex-1 rounded ${passwordStrength === 'weak' ? 'bg-red-500' : passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                          <div className={`h-1 flex-1 rounded ${passwordStrength === 'weak' ? 'bg-gray-200' : passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                          <div className={`h-1 flex-1 rounded ${passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        </div>
                        <p className="text-xs text-gray-500">{content.password_requirements}</p>
                      </div>
                    )}
                  </div>
                  <input
                    className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full"
                    type="password"
                    placeholder={content.repeatpassword_placeholder}
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <div className="flex items-center justify-center w-full bg-[#FAD1D5] relative border border-[#F45D48] py-3 px-8 rounded-lg">
                    <span className="flex items-center justify-center text-center">
                      {error}
                    </span>
                    <button
                      type="button"
                      onClick={handleClearError}
                      className="absolute right-4"
                    >
                      <GrClose size={20} />
                    </button>
                  </div>
                )}
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-main border border-main rounded-lg py-2 text-white font-semibold text-lg xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
                >
                  {loading ? "Loading..." : content.button}
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-6 p-6">
              <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                <FiCheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold text-[#003956] text-center">
                {content.reset_success}
              </h2>
              <p className="text-center text-gray-600 max-w-md">
                {content.success_details}
              </p>
              <button 
                onClick={handleBackToLogin}
                className="mt-4 bg-main border border-main rounded-lg py-3 px-8 text-white font-semibold text-lg xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
              >
                {content.back_to_login}
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