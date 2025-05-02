"use client";

import { useEffect, useState } from "react";
import { Subscription } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { getSubscription } from "@/store/features/paymentSlice";
import { formatDate } from "@/utils/formatDate";

interface TrialMessageProps {
  translationData?: {
    id: number;
    text: string;
    trialText?: string;
  };
}

export default function TrialMessage({ translationData }: TrialMessageProps) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const { token, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchSubscription() {
      if (token) {
        const result = await dispatch(getSubscription({ token }));
        setSubscription(result.payload);
      }
    }
    fetchSubscription();
  }, [dispatch, token]);

  const planLabel =
    subscription?.plan === "1_month"
      ? "one-month"
      : subscription?.plan === "2_months"
      ? "two-month"
      : subscription?.plan === "3_months"
      ? "three-month"
      : "trial";

  const formatedDate = formatDate(subscription?.currentPeriodEnd || "");
  
  // Check if user is on trial to control messaging
  const isTrialUser = planLabel === "trial";

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
            <span className="text-main">trial</span>
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
            <>🏠 You are currently on a <span className="text-main">trial</span> subscription.</>
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
  
    // Process message with the rendering function if available
    let messageContent: JSX.Element | null = null;
    
    if (messageToShow) {
      messageContent = renderMultilingualMessage(messageToShow);
    } else {
      // Fallback if no translation is available
      messageContent = isTrialUser ? (
        <>🏠 You are currently on a <span className="text-main">trial</span> subscription.</>
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