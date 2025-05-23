"use client";
// next
import { usePathname } from "next/navigation";
import { useMemo } from "react";

// context
import { useStepForm } from "@/context/stepFormContext";

// service for translations
import { useSignUpData } from "@/services/translationService";

// Default signup content (fallback)
const defaultSignupContent = {
  subtitle: "Find your new home the easy way",
  title: "Sign up for WinkWing today.",
  text: "Try Winkwing 14 days risk free. If you're not satisfied you'll always get your money back. Just email us at info@winkwing.com",
  steup_info: {
    steps: {
      steps: [
        { id: 1, title: "Location" },
        { id: 2, title: "Requirements" },
        { id: 3, title: "Details" },
        { id: 4, title: "Let's go!" },
      ]
    },
    next: "Next",
    prv: "Previous"
  }
};

export default function SignUp({ bg }: { bg: string }) {
  const { currentStepIndex, step, goTo, next, back } = useStepForm();

  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  const { data: signupData, status } = useSignUpData();

  // Merge API data with defaults using useMemo
  const content = useMemo(() => {
    if (status === "success" && signupData) {
      return {
        subtitle: signupData.subtitle || defaultSignupContent.subtitle,
        title: signupData.title || defaultSignupContent.title,
        text: signupData.text || defaultSignupContent.text,
        steup_info: signupData.steup_info || defaultSignupContent.steup_info
      };
    }
    return defaultSignupContent;
  }, [signupData, status]);

  // Extract the steps from the content
  const stepsInfo = useMemo(() => {
    return content.steup_info?.steps?.steps || defaultSignupContent.steup_info.steps.steps;
  }, [content]);

  return (
    <div className={`py-24 min-h-screen px-2 bg-[${bg}]`}>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center gap-4 text-center lg:text-left lg:items-start relative to-zinc-100">
          <h5 className="text-[16px] leading-[24px] text-main">
            {content.subtitle}
          </h5>
          <h1 className="flex flex-col sm:flex-row items-center gap-4 font-extrabold text-3xl xs:text-4xl md:text-5xl md:leading-[60px] text-[#003956]">
            {/* Handle WinkWing in the title by splitting and rendering with the logo */}
            {content.title.split("WinkWing")[0]}
            {/* <img
              className="w-[250px] mt-[10px]"
              src="/winkwing-logo.svg"
              alt="Logo"
            /> */}
            WinkWing
            {" "}
            {content.title.includes("WinkWing")
              ? content.title.split("WinkWing")[1]
              : ""}
          </h1>
          <p className="text-[16px] leading-[24px] max-w-[730px]">
            {content.text}
          </p>
        </div>
        
        {/* Mobile stepper (hidden on sm and above) */}
        <div className="w-full overflow-x-auto sm:hidden">
          <div className="flex flex-row items-center justify-between pt-12 min-w-[320px]">
            {stepsInfo.map((currentStep, idx) => (
              <div
                className={`
                  relative 
                  flex flex-col justify-center items-center 
                  w-full
                  ${idx !== 0 ? "before:content-['']" : ""}
                  before:bg-[#6C757DB2] 
                  before:absolute 
                  before:h-[1px]
                  before:w-full 
                  before:top-[7px]
                  before:right-2/4
                  first:before:content-none
                  z-0
                `}
                key={`mobile-${currentStep.id}`}
              >
                <button
                  onClick={() => goTo(currentStep.id - 1)}
                  className={`flex items-center justify-center z-10 cursor-pointer`}
                >
                  {currentStepIndex >= currentStep.id - 1 ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask id={`path-mobile-${currentStep.id}`} fill="white">
                        <path d="M0.700195 8.3C0.700195 3.99218 4.19237 0.5 8.5002 0.5C12.808 0.5 16.3002 3.99218 16.3002 8.3C16.3002 12.6078 12.808 16.1 8.5002 16.1C4.19237 16.1 0.700195 12.6078 0.700195 8.3Z" />
                      </mask>
                      <path
                        d="M0.700195 8.3C0.700195 3.99218 4.19237 0.5 8.5002 0.5C12.808 0.5 16.3002 3.99218 16.3002 8.3C16.3002 12.6078 12.808 16.1 8.5002 16.1C4.19237 16.1 0.700195 12.6078 0.700195 8.3Z"
                        fill="#0485C6"
                      />
                      <path
                        d="M8.5002 14.1C5.29694 14.1 2.7002 11.5033 2.7002 8.3H-1.2998C-1.2998 13.7124 3.08781 18.1 8.5002 18.1V14.1ZM14.3002 8.3C14.3002 11.5033 11.7034 14.1 8.5002 14.1V18.1C13.9126 18.1 18.3002 13.7124 18.3002 8.3H14.3002ZM8.5002 2.5C11.7034 2.5 14.3002 5.09675 14.3002 8.3H18.3002C18.3002 2.88761 13.9126 -1.5 8.5002 -1.5V2.5ZM8.5002 -1.5C3.08781 -1.5 -1.2998 2.88761 -1.2998 8.3H2.7002C2.7002 5.09675 5.29694 2.5 8.5002 2.5V-1.5Z"
                        fill="#0485C6"
                        mask={`url(#path-mobile-${currentStep.id})`}
                      />
                    </svg>
                  ) : (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 6.19995C11 8.96138 8.76142 11.2 6 11.2C3.23858 11.2 1 8.96138 1 6.19995C1 3.43853 3.23858 1.19995 6 1.19995C8.76142 1.19995 11 3.43853 11 6.19995Z"
                        fill="#FFFBF6"
                        stroke="#989DA1"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </button>

                <h3
                  className={`
                    ${currentStepIndex >= currentStep.id - 1 ? "text-[#0485C6]" : "text-[#6C757DB2]"}
                    text-[14px] leading-[24px] 
                    mt-3
                    text-center
                    whitespace-nowrap
                  `}
                >
                  {currentStep.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop stepper (hidden on mobile) */}
        <div className="hidden sm:flex flex-row items-center justify-between pt-12">
          {stepsInfo.map((currentStep) => (
            <div
              className={`relative flex flex-col justify-center items-center w-36 before:content-[''] before:bg-[#6C757DB2] before:absolute before:w-full before:h-[3px] before:right-2/4 first:before:content-none top-1/3 -translate-y-2/4`}
              key={`desktop-${currentStep.id}`}
            >
              <button
                onClick={() => goTo(currentStep.id - 1)}
                className={`flex items-center justify-center z-10 absolute mr-[7px] cursor-pointer`}
              >
                {currentStepIndex >= currentStep.id - 1 ? (
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id={`path-desktop-${currentStep.id}`} fill="white">
                      <path d="M0.700195 8.3C0.700195 3.99218 4.19237 0.5 8.5002 0.5C12.808 0.5 16.3002 3.99218 16.3002 8.3C16.3002 12.6078 12.808 16.1 8.5002 16.1C4.19237 16.1 0.700195 12.6078 0.700195 8.3Z" />
                    </mask>
                    <path
                      d="M0.700195 8.3C0.700195 3.99218 4.19237 0.5 8.5002 0.5C12.808 0.5 16.3002 3.99218 16.3002 8.3C16.3002 12.6078 12.808 16.1 8.5002 16.1C4.19237 16.1 0.700195 12.6078 0.700195 8.3Z"
                      fill="#0485C6"
                    />
                    <path
                      d="M8.5002 14.1C5.29694 14.1 2.7002 11.5033 2.7002 8.3H-1.2998C-1.2998 13.7124 3.08781 18.1 8.5002 18.1V14.1ZM14.3002 8.3C14.3002 11.5033 11.7034 14.1 8.5002 14.1V18.1C13.9126 18.1 18.3002 13.7124 18.3002 8.3H14.3002ZM8.5002 2.5C11.7034 2.5 14.3002 5.09675 14.3002 8.3H18.3002C18.3002 2.88761 13.9126 -1.5 8.5002 -1.5V2.5ZM8.5002 -1.5C3.08781 -1.5 -1.2998 2.88761 -1.2998 8.3H2.7002C2.7002 5.09675 5.29694 2.5 8.5002 2.5V-1.5Z"
                      fill="#0485C6"
                      mask={`url(#path-desktop-${currentStep.id})`}
                    />
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 6.19995C11 8.96138 8.76142 11.2 6 11.2C3.23858 11.2 1 8.96138 1 6.19995C1 3.43853 3.23858 1.19995 6 1.19995C8.76142 1.19995 11 3.43853 11 6.19995Z"
                      fill="#FFFBF6"
                      stroke="#989DA1"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </button>

              <h3
                className={`${
                  currentStepIndex >= currentStep.id - 1
                    ? "text-[#0485C6]"
                    : "text-[#6C757DB2]"
                } text-[15px] leading-[24px] mt-9`}
              >
                {currentStep.title}
              </h3>
            </div>
          ))}
        </div>
        
        <div className="w-full md:w-max bg-white shadow-sm rounded-lg p-6 relative z-10">
          {step}
          {currentStepIndex != 0 && currentStepIndex != 3 && (
            <div className="flex items-center justify-between mt-[40px]">
              <button
                onClick={back}
                className="border border-main text-main rounded-lg py-2 px-8 sm:px-28 font-semibold text-[16px] leading-[24px] xl:hover:bg-main xl:hover:border-none xl:hover:text-white transition-all duration-300"
              >
                {content.steup_info?.prv || "Previous"}
              </button>
              <button
                onClick={next}
                className="bg-main text-white rounded-lg py-2 px-8 font-semibold sm:px-28 border border-main text-[16px] leading-[24px] xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
              >
                {content.steup_info?.next || "Next"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}