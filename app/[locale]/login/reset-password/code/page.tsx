"use client";
// next
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

// react countdown
import Countdown from "react-countdown";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { setOtp } from "@/store/features/authSlice";

export default function ResetPasswordCode() {
  const [otpCode, setOtpCode] = useState<string>("");

  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const countdownTime = 10 * 60 * 1000;

  const handleOtpCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(setOtp(otpCode));
    router.push("/login/create-password");
  };

  return (
    <>
      <div className="flex flex-col items-center md:justify-center gap-8 min-h-screen py-24 px-2 bg-[#FFF7F5]">
        <div className="flex flex-col items-center text-center md:text-left md:items-start gap-4">
          <h5 className="text-[16px] leading-[24px] text-main">
            Find your new home the easy way
          </h5>
          <h1 className="flex flex-col sm:flex-row items-center gap-4 font-bold font-arial text-[#003956] text-3xl xs:text-4xl md:text-5xl">
            OTP Code
          </h1>
        </div>
        <div className="w-full md:w-[730px] bg-white  md:h-max rounded-lg p-6 relative z-10">
          <div className="flex flex-col items-center justify-center md:items-start text-center gap-5">
            <h4 className="text-[16px] leading-[24px] md:text-left">
              Forgotten your password? Enter your OTP code below, and you can
              change your password.
            </h4>
            <form className="flex flex-col gap-4 w-full">
              <input
                className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full"
                type="number"
                placeholder="OTP Code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required
              />
              <div className="flex items-end justify-end">
                <h1 className="flex items-center gap-1 font-medium text-lg">
                  OTP Code expires in:{" "}
                  <span>
                    <Countdown
                      date={Date.now() + countdownTime}
                      renderer={({ minutes, seconds }) => (
                        <p className="text-main font-medium">
                          {minutes}:{seconds < 10 ? "0" : ""}
                          {seconds}
                        </p>
                      )}
                    />
                  </span>
                </h1>
              </div>

              <button
                disabled={loading}
                onClick={handleOtpCodeSubmit}
                className="bg-main border border-main rounded-lg py-2 text-white font-semibold text-lg xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
              >
                {loading ? "Loading..." : "Next"}
              </button>
            </form>
          </div>
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
