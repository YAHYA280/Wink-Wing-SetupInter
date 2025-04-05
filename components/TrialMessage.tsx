"use client";
// next
import { useEffect, useState } from "react";

// types
import { Subscription } from "@/types/types";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { getSubscription } from "@/store/features/paymentSlice";

// utils
import { formatDate } from "@/utils/formatDate";

export default function TrialMessage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const { token, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchSubscription() {
      if (token) {
        const data = await dispatch(getSubscription({ token }));

        setSubscription(data.payload);
      }
    }

    fetchSubscription();
  }, []);

  const formatedDate = formatDate(subscription?.currentPeriodEnd || "");

  return (
    <div className="border border-[#AEAEAE] rounded-lg p-5 w-full">
      {loading ? (
        <h1 className="text-center text-[16px]">Loading...</h1>
      ) : (
        <p className="text-[16px] leading-[24px] text-center">
          🏠 You are currently on the{" "}
          <span className="text-main">
            {(subscription?.plan === "1_month" && "one-month") ||
              (subscription?.plan === "2_months" && "two-month") ||
              (subscription?.plan === "3_months" && "three-month")}
          </span>{" "}
          subscription, and you'll have access until{" "}
          <span className="text-main">{formatedDate}</span>. After that, you'll
          typically be charged for the next period unless you decide to cancel
          or modify your plan.
        </p>
      )}
    </div>
  );
}
