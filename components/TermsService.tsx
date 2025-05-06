"use client";
// Next imports
import { useMemo } from "react";
import { usePathname } from "next/navigation";

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
    sections: {
      acceptance: {
        title: "1. Acceptance of Terms",
        text: "By accessing and using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use our services."
      },
      description: {
        title: "2. Description of Service",
        text: "Winkwing provides a platform to help users find rental properties by monitoring multiple websites and sending notifications when new listings match the user's search criteria. The service may include free and paid features, which may change from time to time."
      },
      user_accounts: {
        title: "3. User Accounts",
        text: "When creating an account, you agree to:",
        items: [
          "Provide accurate and complete information",
          "Keep your password secure",
          "Be responsible for all activities that occur under your account",
          "Notify us immediately of any unauthorized use of your account"
        ]
      },
      subscription: {
        title: "4. Subscription and Payments",
        text: "Some features of our service require payment of fees. By subscribing to a paid plan, you agree to pay all fees in accordance with the billing terms. Prices are subject to change with reasonable notice. Refunds may be provided in accordance with our refund policy."
      },
      user_conduct: {
        title: "5. User Conduct",
        text: "When using our services, you agree not to:",
        items: [
          "Violate any applicable laws or regulations",
          "Infringe upon the rights of others",
          "Distribute unwanted or unauthorized advertising",
          "Attempt to gain unauthorized access to our services",
          "Interfere with or disrupt our services"
        ]
      },
      intellectual_property: {
        title: "6. Intellectual Property",
        text: "Our services and all content, including but not limited to text, graphics, logos, and software, are the property of Winkwing or its licensors and are protected by intellectual property laws. You may not use our intellectual property without our prior written consent."
      },
      limitation: {
        title: "7. Limitation of Liability",
        text: "To the maximum extent permitted by law, Winkwing shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses."
      },
      disclaimer: {
        title: "8. Disclaimer of Warranties",
        text: "Our services are provided \"as is\" and \"as available\" without any warranties of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement."
      },
      indemnification: {
        title: "9. Indemnification",
        text: "You agree to indemnify, defend, and hold harmless Winkwing and its affiliates, officers, agents, employees, and partners from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of our services."
      },
      termination: {
        title: "10. Termination",
        text: "We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service."
      },
      changes: {
        title: "11. Changes to Terms",
        text: "We reserve the right to modify these Terms of Service at any time. We will provide notice of changes by posting the updated terms on our website and updating the \"Last updated\" date. Your continued use of our services after such changes constitutes your acceptance of the new terms."
      },
      governing_law: {
        title: "12. Governing Law",
        text: "These Terms of Service shall be governed by and construed in accordance with the laws of the Netherlands, without regard to its conflict of law provisions."
      },
      contact: {
        title: "13. Contact Us",
        text: "If you have any questions about these Terms of Service, please contact us at:",
        email: "legal@winkwing.com",
        address: "Winkwing B.V., Amsterdam, Netherlands"
      }
    }
  };

  // Determine what to display - either from API or defaults
  const title = termsServiceData?.title || defaultContent.title;
  const subtitle = termsServiceData?.subtitle || defaultContent.subtitle;
  const introduction = termsServiceData?.introduction || defaultContent.introduction;
  const sections = termsServiceData?.sections || defaultContent.sections;

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

            {/* Acceptance of Terms */}
            {sections?.acceptance && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.acceptance.title}</h2>
                <p className="mb-6">{sections.acceptance.text}</p>
              </>
            )}

            {/* Description of Service */}
            {sections?.description && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.description.title}</h2>
                <p className="mb-6">{sections.description.text}</p>
              </>
            )}

            {/* User Accounts */}
            {sections?.user_accounts && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.user_accounts.title}</h2>
                <p className="mb-4">{sections.user_accounts.text}</p>
                {sections.user_accounts.items && (
                  <ul className="list-disc ml-6 mb-6">
                    {sections.user_accounts.items.map((item, index) => (
                      <li key={index} className="mb-2">{item}</li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {/* Subscription and Payments */}
            {sections?.subscription && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.subscription.title}</h2>
                <p className="mb-6">{sections.subscription.text}</p>
              </>
            )}

            {/* User Conduct */}
            {sections?.user_conduct && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.user_conduct.title}</h2>
                <p className="mb-4">{sections.user_conduct.text}</p>
                {sections.user_conduct.items && (
                  <ul className="list-disc ml-6 mb-6">
                    {sections.user_conduct.items.map((item, index) => (
                      <li key={index} className="mb-2">{item}</li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {/* Intellectual Property */}
            {sections?.intellectual_property && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.intellectual_property.title}</h2>
                <p className="mb-6">{sections.intellectual_property.text}</p>
              </>
            )}

            {/* Limitation of Liability */}
            {sections?.limitation && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.limitation.title}</h2>
                <p className="mb-6">{sections.limitation.text}</p>
              </>
            )}

            {/* Disclaimer of Warranties */}
            {sections?.disclaimer && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.disclaimer.title}</h2>
                <p className="mb-6">{sections.disclaimer.text}</p>
              </>
            )}

            {/* Indemnification */}
            {sections?.indemnification && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.indemnification.title}</h2>
                <p className="mb-6">{sections.indemnification.text}</p>
              </>
            )}

            {/* Termination */}
            {sections?.termination && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.termination.title}</h2>
                <p className="mb-6">{sections.termination.text}</p>
              </>
            )}

            {/* Changes to Terms */}
            {sections?.changes && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.changes.title}</h2>
                <p className="mb-6">{sections.changes.text}</p>
              </>
            )}

            {/* Governing Law */}
            {sections?.governing_law && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.governing_law.title}</h2>
                <p className="mb-6">{sections.governing_law.text}</p>
              </>
            )}

            {/* Contact Us */}
            {sections?.contact && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.contact.title}</h2>
                <p className="mb-6">{sections.contact.text}</p>
                {sections.contact.email && <p className="mb-2">Email: {sections.contact.email}</p>}
                {sections.contact.address && <p className="mb-2">Address: {sections.contact.address}</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}