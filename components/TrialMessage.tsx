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

  /**
   * Replaces placeholders in the provided text with dynamic elements.
   * Placeholders:
   * - "two-month" → subscription plan label (e.g. "one-month")
   * - "28 March 2100" → formatted date string
   */
  const renderMessage = (text: string) => {
    const placeholders: { [key: string]: JSX.Element } = {
      "two-month": (
        <span className="text-main" key="plan">
          {planLabel}
        </span>
      ),
      "28 March 2100": (
        <span className="text-main" key="date">
          {formatedDate}
        </span>
      ),
    };

    // Build a regex that matches any of the placeholders
    const regex = new RegExp(Object.keys(placeholders).join("|"), "g");

    // Split the text so that we capture both plain text and placeholders.
    const parts = text.split(regex);
    const matches = text.match(regex) || [];

    return parts.map((part, index) => (
      <span key={`part-${index}`}>
        {part}
        {index < matches.length && placeholders[matches[index]]}
      </span>
    ));
  };

  const messageContent = translationData?.text ? (
    renderMessage(translationData.text)
  ) : (
    <>
      🏠 You are currently on the <span className="text-main">{planLabel}</span>{" "}
      subscription, and you'll have access until{" "}
      <span className="text-main">{formatedDate}</span>. After that, you'll
      typically be charged for the next period unless you decide to cancel or
      modify your plan.
    </>
  );

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
