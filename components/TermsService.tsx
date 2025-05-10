"use client";
// Next imports
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { marked } from 'marked'; // Markdown parser

// Service for translations
import { useTermsServiceData } from "@/services/translationService";

export default function TermsService() {
  // Get current locale from the pathname
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  
  // Fetch translations
  const { data: termsServiceData, status } = useTermsServiceData();

  // Default content for fallback
  const defaultContent = {
    title: "Terms of Service",
    subtitle: "Last updated: May 1, 2025",
    introduction: "Welcome to Winkwing. By accessing or using our services, you agree to be bound by these Terms of Service.",
    content: "## 1. Loading"
  };

  // Determine what to display - either from API or defaults
  const title = termsServiceData?.title || defaultContent.title;
  const subtitle = termsServiceData?.subtitle || defaultContent.subtitle;
  const introduction = termsServiceData?.introduction || defaultContent.introduction;
  const content = termsServiceData?.content || defaultContent.content;
  
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
            
            {/* Render the Markdown content */}
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