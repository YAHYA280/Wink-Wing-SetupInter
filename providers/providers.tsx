"use client";
// next
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

// components
import Nav from "@/components/Nav";
import CitySearch from "@/components/CitySearch";
import Copyright from "@/components/Copyright";
import Footer from "@/components/Footer";

// context
import PopupProvider from "@/context/popupContext";
import ProgressProvider from "@/context/progressContext";
import CheckboxProvider from "@/context/checkboxContext";
import StepFormProvider from "@/context/stepFormContext";

// signup components
import SignUpLocation from "@/components/SignUpLocation";
import SignUpRequirements from "@/components/SignUpRequirements";
import SignUpDetails from "@/components/SignUpDetails";
import SignUpCredentials from "@/components/SignUpCredentials";
import UserPreferencesProvider from "@/context/userPreferencesContext";
import StoreProvider from "./StoreProvider";
import RedirectAuthenticatedUser from "@/components/RedirectAuthenticatedUser";
import TokenProvider from "@/components/TokenProvider";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const steps = [
    <SignUpLocation />,
    <SignUpRequirements />,
    <SignUpDetails />,
    <SignUpCredentials />,
  ];

  const pathname = usePathname();

  // List of paths where Nav and Footer should be hidden
  const hideNavAndFooterPaths = ["/welcome"];

  const shouldHideNavAndFooter = hideNavAndFooterPaths.includes(pathname);

  return (
    <StoreProvider>
      <TokenProvider>
        <UserPreferencesProvider>
          <PopupProvider>
            <ProgressProvider>
              <CheckboxProvider>
                <RedirectAuthenticatedUser>
                  <StepFormProvider steps={steps}>
                    {!shouldHideNavAndFooter && <Nav />}
                    {children}
                    <CitySearch />
                    {!shouldHideNavAndFooter && <Footer />}
                    <Copyright />
                  </StepFormProvider>
                </RedirectAuthenticatedUser>
              </CheckboxProvider>
            </ProgressProvider>
          </PopupProvider>
        </UserPreferencesProvider>
      </TokenProvider>
    </StoreProvider>
  );
}
