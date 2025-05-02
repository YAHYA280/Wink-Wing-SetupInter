"use client";

import { useEffect, useState } from "react";
import { Subscription } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { getSubscription } from "@/store/features/paymentSlice";
import { formatDate } from "@/utils/formatDate";
import { usePathname } from "next/navigation";

interface TrialMessageProps {
  translationData?: {
    id: number;
    text: string;
    trialText?: string;
  };
}

// Define multilingual plan labels
const PLAN_LABELS = {
  en: { 
    "1_month": "one-month", 
    "2_months": "two-month", 
    "3_months": "three-month", 
    "trial": "trial" 
  },
  fr: { 
    "1_month": "un mois", 
    "2_months": "deux mois", 
    "3_months": "trois mois", 
    "trial": "essai" 
  },
  nl: { 
    "1_month": "één maand", 
    "2_months": "twee maanden", 
    "3_months": "drie maanden", 
    "trial": "proef" 
  },
  es: { 
    "1_month": "un mes", 
    "2_months": "dos meses", 
    "3_months": "tres meses", 
    "trial": "prueba" 
  },
  pt: { 
    "1_month": "um mês", 
    "2_months": "dois meses", 
    "3_months": "três meses", 
    "trial": "experimental" 
  },
  hi: { 
    "1_month": "एक महीना", 
    "2_months": "दो महीने", 
    "3_months": "तीन महीने", 
    "trial": "परीक्षण" 
  },
  zh: { 
    "1_month": "一个月", 
    "2_months": "两个月", 
    "3_months": "三个月", 
    "trial": "试用" 
  },
  ar: { 
    "1_month": "شهر واحد", 
    "2_months": "شهرين", 
    "3_months": "ثلاثة أشهر", 
    "trial": "تجريبي" 
  }
};

export default function TrialMessage({ translationData }: TrialMessageProps) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const { token, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  
  // Extract language code from URL path
  const getLanguage = () => {
    if (!pathname) return 'en';
    const pathParts = pathname.split('/');
    if (pathParts.length < 2) return 'en';
    
    const langCode = pathParts[1].toLowerCase();
    return langCode in PLAN_LABELS ? langCode : 'en';
  };
  
  const language = getLanguage();
  
  // Get the labels for the current language
  const currentLabels = PLAN_LABELS[language as keyof typeof PLAN_LABELS] || PLAN_LABELS.en;

  useEffect(() => {
    async function fetchSubscription() {
      if (token) {
        const result = await dispatch(getSubscription({ token }));
        setSubscription(result.payload);
      }
    }
    fetchSubscription();
  }, [dispatch, token]);

  // Determine the plan label based on the subscription type and current language
  const planLabel = subscription?.plan 
    ? currentLabels[subscription.plan as keyof typeof currentLabels] || currentLabels.trial
    : currentLabels.trial;

  const formatedDate = formatDate(subscription?.currentPeriodEnd || "");
  
  // Check if user is on a trial plan
  const isTrialUser = !subscription?.plan || subscription.plan === "trial";

  // Get the appropriate message based on user's plan
  const messageToShow = isTrialUser 
    ? translationData?.trialText 
    : translationData?.text;

  const renderMultilingualMessage = (text: string) => {
    if (!text) return null;
    
    // For trial users, handle the {{trial}} placeholder
    if (isTrialUser && text.includes("{{trial}}")) {
      const parts = text.split("{{trial}}");
      return (
        <>
          {parts[0]}
          <span className="text-main">{currentLabels.trial}</span>
          {parts[1] || ""}
        </>
      );
    }
    
    // For regular subscriptions, handle {{plan}} and {{date}} placeholders
    if (text.includes("{{plan}}") && text.includes("{{date}}")) {
      // Split by plan first
      const planParts = text.split("{{plan}}");
      
      // Split second part by date
      const dateParts = planParts[1].split("{{date}}");
      
      return (
        <>
          {planParts[0]}
          <span className="text-main">{planLabel}</span>
          {dateParts[0]}
          <span className="text-main">{formatedDate}</span>
          {dateParts[1] || ""}
        </>
      );
    }
    
    // Fallback for text without placeholders
    return (
      <>
        {isTrialUser ? (
          <>🏠 You are currently on a <span className="text-main">{currentLabels.trial}</span> subscription.</>
        ) : (
          <>
            🏠 You are currently on the <span className="text-main">{planLabel}</span>{" "}
            subscription, and you'll have access until{" "}
            <span className="text-main">{formatedDate}</span>. After that, you'll
            typically be charged for the next period unless you decide to cancel or
            modify your plan.
          </>
        )}
      </>
    );
  };
  
  // Generate the message content
  let messageContent: JSX.Element | null = null;
  
  if (messageToShow) {
    messageContent = renderMultilingualMessage(messageToShow);
  } else {
    // Fallback if no translation is available
    messageContent = isTrialUser ? (
      <>🏠 You are currently on a <span className="text-main">{currentLabels.trial}</span> subscription.</>
    ) : (
      <>
        🏠 You are currently on the <span className="text-main">{planLabel}</span>{" "}
        subscription, and you'll have access until{" "}
        <span className="text-main">{formatedDate}</span>. After that, you'll
        typically be charged for the next period unless you decide to cancel or
        modify your plan.
      </>
    );
  }

  return (
    <div className="border border-[#AEAEAE] rounded-lg p-5 w-full">
      {loading ? (
        <h1 className="text-center text-[16px]">Loading...</h1>
      ) : (
        <p className="text-[16px] leading-[24px] text-center">
          {messageContent}
        </p>
      )}
    </div>
  );
}