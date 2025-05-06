"use client";
// next
import { useMemo } from "react";
import { usePathname } from "next/navigation";

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
    sections: {
      information_we_collect: {
        title: "1. Information We Collect",
        text: "When you use our services, we may collect the following types of information:",
        items: [
          "Personal identification information (Name, email address, phone number)",
          "Demographic information (Location, preferences)",
          "Device and usage information (IP address, browser type)",
          "Payment information (Only if you subscribe to our paid services)"
        ]
      },
      how_we_use: {
        title: "2. How We Use Your Information",
        text: "We use the information we collect for various purposes, including:",
        items: [
          "To provide and maintain our services",
          "To notify you about changes to our services",
          "To allow you to participate in interactive features",
          "To provide customer support",
          "To gather analysis or valuable information to improve our services",
          "To detect, prevent and address technical issues"
        ]
      },
      data_storage: {
        title: "3. Data Storage and Security",
        text: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored on secure servers and we use industry-standard encryption technologies when transferring and receiving user data."
      },
      sharing_information: {
        title: "4. Sharing Your Information",
        text: "We may share your information with:",
        items: [
          "Service providers who assist us in operating our services",
          "Business partners with your consent",
          "Law enforcement agencies when required by law"
        ]
      },
      your_rights: {
        title: "5. Your Rights",
        text: "You have the right to:",
        items: [
          "Access and receive a copy of your data",
          "Rectify or update your personal information",
          "Request deletion of your personal data",
          "Object to processing of your personal data",
          "Request restriction of processing your personal data",
          "Data portability"
        ]
      },
      cookies: {
        title: "6. Cookies and Tracking Technologies",
        text: "We use cookies and similar tracking technologies to track activity on our services and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
      },
      third_party: {
        title: "7. Third-Party Services",
        text: "Our services may contain links to other websites that are not operated by us. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services."
      },
      children: {
        title: "8. Children's Privacy",
        text: "Our services are not intended for use by children under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16, we take steps to remove that information."
      },
      changes: {
        title: "9. Changes to This Privacy Policy",
        text: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date."
      },
      contact: {
        title: "10. Contact Us",
        text: "If you have any questions about this Privacy Policy, please contact us at:",
        email: "privacy@winkwing.com",
        address: "Winkwing B.V., Amsterdam, Netherlands"
      }
    }
  };

  // Determine what to display - either from API or defaults
  const title = privacyPolicyData?.title || defaultContent.title;
  const subtitle = privacyPolicyData?.subtitle || defaultContent.subtitle;
  const introduction = privacyPolicyData?.introduction || defaultContent.introduction;
  const sections = privacyPolicyData?.sections || defaultContent.sections;

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

            {/* Information We Collect */}
            {sections?.information_we_collect && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.information_we_collect.title}</h2>
                <p className="mb-4">{sections.information_we_collect.text}</p>
                {sections.information_we_collect.items && (
                  <ul className="list-disc ml-6 mb-6">
                    {sections.information_we_collect.items.map((item, index) => (
                      <li key={index} className="mb-2">{item}</li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {/* How We Use Your Information */}
            {sections?.how_we_use && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.how_we_use.title}</h2>
                <p className="mb-4">{sections.how_we_use.text}</p>
                {sections.how_we_use.items && (
                  <ul className="list-disc ml-6 mb-6">
                    {sections.how_we_use.items.map((item, index) => (
                      <li key={index} className="mb-2">{item}</li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {/* Data Storage and Security */}
            {sections?.data_storage && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.data_storage.title}</h2>
                <p className="mb-6">{sections.data_storage.text}</p>
              </>
            )}

            {/* Sharing Your Information */}
            {sections?.sharing_information && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.sharing_information.title}</h2>
                <p className="mb-4">{sections.sharing_information.text}</p>
                {sections.sharing_information.items && (
                  <ul className="list-disc ml-6 mb-6">
                    {sections.sharing_information.items.map((item, index) => (
                      <li key={index} className="mb-2">{item}</li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {/* Your Rights */}
            {sections?.your_rights && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.your_rights.title}</h2>
                <p className="mb-4">{sections.your_rights.text}</p>
                {sections.your_rights.items && (
                  <ul className="list-disc ml-6 mb-6">
                    {sections.your_rights.items.map((item, index) => (
                      <li key={index} className="mb-2">{item}</li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {/* Cookies and Tracking Technologies */}
            {sections?.cookies && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.cookies.title}</h2>
                <p className="mb-6">{sections.cookies.text}</p>
              </>
            )}

            {/* Third-Party Services */}
            {sections?.third_party && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.third_party.title}</h2>
                <p className="mb-6">{sections.third_party.text}</p>
              </>
            )}

            {/* Children's Privacy */}
            {sections?.children && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.children.title}</h2>
                <p className="mb-6">{sections.children.text}</p>
              </>
            )}

            {/* Changes to This Privacy Policy */}
            {sections?.changes && (
              <>
                <h2 className="font-bold text-xl mt-8 mb-4">{sections.changes.title}</h2>
                <p className="mb-6">{sections.changes.text}</p>
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