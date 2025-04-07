"use client";

import { useMovingGuideData } from "@/services/translationService";
import React from "react";
import Markdown from "markdown-to-jsx";

export default function MovingGuideThird() {
  const { data: translations } = useMovingGuideData();

  // Extract translations with fallbacks
  const title =
    translations?.PrepareYourStandardResponse?.title ||
    "3. Prepare your standard response";
  const text =
    translations?.PrepareYourStandardResponse?.text ||
    "When you apply for a property, it's important that your application stands out while still containing all the necessary information. You can use this template as a starting point and automatically copy it when you're interested in a property.";
  const checkboxText =
    translations?.PrepareYourStandardResponse?.checkbox_text ||
    "Show registration letter for each property";
  const buttonText = translations?.PrepareYourStandardResponse?.btn || "Save";

  return (
    <div className="flex flex-col gap-8 py-4">
      <h1 className="font-bold text-[24px] leading-[24px]">{title}</h1>
      <div className="text-[16px] leading-[24px]">
        {/* {text.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))} */}

        <Markdown>{text}</Markdown>
      </div>

      <textarea
        defaultValue={`Dear Landlord, 
        
I recently came across your property on [[ADDRESS]] and I'm very interested. I would love to apply for the viewing of the apartment.

I work as a [OCCUPATION] and my monthly income is €[INCOME]. I have all the required documents available.

I would appreciate it if you could let me know the viewing schedule and if I may attend.


Best regards,
[NAME]`}
        className="w-full h-[300px] border rounded-lg resize-none p-4"
      />

      <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-between">
        <div className="flex items-center gap-3">
          <input type="checkbox" />
          <span>{checkboxText}</span>
        </div>
        <button className="bg-main border border-main rounded-lg py-2 px-12 text-white font-semibold text-[16px] xl:hover:bg-transparent xl:hover:text-main transition-all duration-300">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
