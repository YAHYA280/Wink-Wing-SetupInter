"use client";
// next
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { marked } from 'marked'; // Markdown parser

// service for translations
import { usePrivacyPolicyData } from "@/services/translationService";

export default function PrivacyPolicy() {
  // Get translations
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  const { data: privacyPolicyData, status } = usePrivacyPolicyData();

  // Default content for fallback
  const defaultContent = {
    title: "Privacy Policy",
    subtitle: "Last updated: May 1, 2025",
    introduction: "At Winkwing, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.",
    content: "## Loading"
  };

  // Determine what to display - either from API or defaults
  const title = privacyPolicyData?.title || defaultContent.title;
  const subtitle = privacyPolicyData?.subtitle || defaultContent.subtitle;
  const introduction = privacyPolicyData?.introduction || defaultContent.introduction;
  const content = privacyPolicyData?.content || defaultContent.content;
  
  // Convert Markdown to HTML
  const htmlContent = useMemo(() => {
    return content ? marked(content) : '';
  }, [content]);

  return (
    <div className="flex flex-col items-center justify-center py-24 px-2 bg-[#FFF7F5]">
      <div className="max-w-[950px] w-full">
        <div className="flex flex-col items-center justify-center gap-4 text-center mb-10">
          <h1 className="font-extrabold text-3xl xs:text-4xl md:text-5xl text-[#003956]">
            {title}
          </h1>
          <p className="text-[16px] leading-[24px] text-main">
            {subtitle}
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="text-[#2F2F2F] text-[16px] leading-[24px]">
            <p className="mb-6">{introduction}</p>
            
            <div 
              className="markdown-content" 
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}