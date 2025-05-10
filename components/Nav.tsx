"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { AiOutlineMenu } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { logout } from "@/store/features/authSlice";
import { useNavbarData } from "@/services/translationService";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);
  
  // Determine if current locale is French
  const isFrench = locale === 'fr';

  // Custom translation mapping for problematic French phrases.
  const buttonShorterTranslations: Record<string, Record<string, string>> = {
    fr: {
      "Commencer ma recherche": "Rechercher",
      "Tableau de bord": "Tableau"
    }
  };

  // Helper function to return shortened text when applicable.
  const getButtonText = (text: string) => {
    if (isFrench && buttonShorterTranslations.fr[text]) {
      return buttonShorterTranslations.fr[text];
    }
    return text;
  };

  // Get navbar data from API (or use fallback data)
  const { data, status } = useNavbarData();

  // Build the base navbar data.
  const navContent = useMemo(() => {
    if (status === "success" && data?.Navbar && data.Navbar.length > 0) {
      const navbar = data.Navbar[0];
      return {
        links: navbar.links,
        registerButton: navbar.registerButton,
        loginButton: navbar.loginButton,
        logoutButton: navbar.logoutButton
      };
    }
    // Fallback defaults – note that Dashboard is included.
    return {
      links: [
        { id: 1, title: "How it works", href: "/how-it-works" },
        { id: 2, title: "Reviews", href: "/reviews" },
        { id: 3, title: "Pricing", href: "/pricing" },
        { id: 4, title: "Contact", href: "/contact" },
        { id: 5, title: "Dashboard", href: "/dashboard" },
      ],
      registerButton: "Start my search",
      loginButton: "Login",
      logoutButton: "Logout"
    };
  }, [data, status]);

  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Create a filtered (or merged) list of links based on authentication.
  // For example, show Dashboard only if there is a valid token.
  const dynamicLinks = useMemo(() => {
    // If the user is not logged in, exclude the Dashboard item.
    if (!token) {
      return navContent.links.filter(
        (link) => link.href.toLowerCase() !== "/dashboard"
      );
    }
    return navContent.links;
  }, [navContent.links, token]);

  const handleLogout = async () => {
    await dispatch(logout());
    router.push(`/${locale}/login`);
  };

  const [navActive, setNavActive] = useState<boolean>(false);

  useEffect(() => {
    const closeNav = () => setNavActive(false);
    window.addEventListener("click", closeNav);
    window.addEventListener("scroll", closeNav);
    return () => {
      window.removeEventListener("click", closeNav);
      window.removeEventListener("scroll", closeNav);
    };
  }, []);

  // Prevent body scrolling when mobile nav is open
  useEffect(() => {
    if (navActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [navActive]);
  
  // Custom CSS variable setup for navbar height
  useEffect(() => {
    if (!document.documentElement.style.getPropertyValue('--navbar-height')) {
      document.documentElement.style.setProperty('--navbar-height', '64px');
    }
  }, []);

  const toggleNav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNavActive((prev) => !prev);
  };

  const mobileNavClasses = useMemo(
    () =>
      navActive
        ? "fixed top-0 left-0 right-0 bottom-0 bg-black/90 text-white z-[999]"
        : "hidden",
    [navActive]
  );

  // Helper to prefix links with the locale
  const localizedHref = (href: string) =>
    href.startsWith("/") ? `/${locale}${href}` : href;

  // Adjust container width for auth buttons based on language.
  const authButtonsWidth = isFrench ? 'w-[340px]' : 'w-[300px]';

  return (
    <div className="w-full shadow-lg bg-white lg:fixed lg:z-50" style={{ height: "var(--navbar-height, 64px)" }}>
      {/* Desktop and tablet navbar */}
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto w-full h-full px-4">
        {/* Logo and language switcher section - fixed width */}
        <div className="flex items-center gap-3 w-[200px]">
          <Link className="cursor-pointer" href={`/${locale}`}>
            <Image
              src="/winkwing-logo.svg"
              alt="Logo"
              width={150}
              height={40}
              className="w-[140px] h-auto"
              priority
            />
          </Link>
          <LanguageSwitcher />
        </div>
        
        {/* Navigation links section - flexible with centered content */}
        <div className="hidden lg:flex flex-1 justify-center items-center mx-4">
          <div className="flex space-x-6 xl:space-x-8">
            {dynamicLinks.map((link) => (
              <Link
                key={link.id}
                href={localizedHref(link.href)}
                className={`font-medium ${isFrench ? 'text-sm' : 'text-base'} hover:text-gray-700 whitespace-nowrap transition-colors relative group truncate`}
              >
                { // Optionally shorten specific link titles for French
                  isFrench && buttonShorterTranslations.fr[link.title]
                    ? buttonShorterTranslations.fr[link.title]
                    : link.title
                }
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-main group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Auth buttons section - fixed width */}
        <div className={`hidden lg:block ${authButtonsWidth}`}>
          <div className="flex justify-end">
            {token ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-secondary border border-secondary px-5 py-2.5 rounded-lg transition-all duration-300"
              >
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4375 18.0714C13.6753 18.0714 15.8214 17.2248 17.4037 15.7178C18.9861 14.2108 19.875 12.1669 19.875 10.0357C19.875 7.90451 18.9861 5.86059 17.4037 4.35361C15.8214 2.84662 13.6753 2 11.4375 2"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 10.0357H13.5469M13.5469 10.0357L10.3828 7.02234M13.5469 10.0357L10.3828 13.0491"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-white font-semibold truncate">
                  {getButtonText(navContent.logoutButton)}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href={`/${locale}/signup`}
                  className="flex items-center justify-center gap-2 bg-main text-white border border-main font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 ease-in-out min-w-[140px]"
                >
                  <span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0626 18.2084C14.5615 18.2084 18.2084 14.5615 18.2084 10.0626C18.2084 5.56369 14.5615 1.91675 10.0626 1.91675C5.56369 1.91675 1.91675 5.56369 1.91675 10.0626C1.91675 14.5615 5.56369 18.2084 10.0626 18.2084Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.7733 6.87269C12.4177 6.51631 11.9951 6.23368 11.53 6.04102C11.0648 5.84836 10.5662 5.74946 10.0627 5.75C9.55921 5.74946 9.06058 5.84836 8.59541 6.04102C8.13025 6.23368 7.70771 6.51631 7.35205 6.87269"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.5 15.5L20.5 20.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.5 15.5L20.5 20.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-white font-semibold truncate">
                    {getButtonText(navContent.registerButton)}
                  </span>
                </Link>
                <Link
                  href={`/${locale}/login`}
                  className="flex items-center justify-center gap-2 bg-secondary border border-secondary px-5 py-2.5 rounded-lg transition-all duration-300 min-w-[100px]"
                >
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4375 18.0714C13.6753 18.0714 15.8214 17.2248 17.4037 15.7178C18.9861 14.2108 19.875 12.1669 19.875 10.0357C19.875 7.90451 18.9861 5.86059 17.4037 4.35361C15.8214 2.84662 13.6753 2 11.4375 2"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 10.0357H13.5469M13.5469 10.0357L10.3828 7.02234M13.5469 10.0357L10.3828 13.0491"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-white font-semibold truncate">
                    {getButtonText(navContent.loginButton)}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile navigation toggle */}
        <div className="block lg:hidden">
          <button
            onClick={toggleNav}
            className="relative z-[1000] bg-white p-2 rounded-full focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {navActive ? (
              <GrClose size={24} className="text-black" />
            ) : (
              <AiOutlineMenu size={24} className="text-black" />
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile navigation overlay */}
      <div 
        className={mobileNavClasses}
        style={{ top: "var(--navbar-height, 64px)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 px-4 py-12 overflow-y-auto relative">
          {/* Close button - positioned at top right */}
          <button 
            onClick={toggleNav}
            className="absolute top-4 right-4 text-white p-2 focus:outline-none hidden"
          >
            <GrClose size={24} />
          </button>
          
          {/* Mobile navigation links */}
          <div className="flex flex-col items-center gap-7 mb-8 w-full max-w-xs">
            {dynamicLinks.map((link) => (
              <Link
                key={link.id}
                href={localizedHref(link.href)}
                className={`font-semibold ${isFrench ? 'text-sm' : 'text-xl'} text-center w-full py-1 text-white hover:text-gray-300 transition-colors truncate`}
                onClick={() => setNavActive(false)}
              >
                {isFrench && buttonShorterTranslations.fr[link.title]
                  ? buttonShorterTranslations.fr[link.title]
                  : link.title}
              </Link>
            ))}
          </div>
          
          {/* Mobile auth buttons */}
          <div className="flex flex-col items-center gap-4 w-full max-w-xs mt-4">
            {token ? (
              <button
                onClick={() => {
                  handleLogout();
                  setNavActive(false);
                }}
                className="flex items-center justify-center gap-2 bg-secondary border border-secondary px-5 py-3 rounded-lg transition-all duration-300 w-full"
              >
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4375 18.0714C13.6753 18.0714 15.8214 17.2248 17.4037 15.7178C18.9861 14.2108 19.875 12.1669 19.875 10.0357C19.875 7.90451 18.9861 5.86059 17.4037 4.35361C15.8214 2.84662 13.6753 2 11.4375 2"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 10.0357H13.5469M13.5469 10.0357L10.3828 7.02234M13.5469 10.0357L10.3828 13.0491"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/*
                  On mobile for French, show only the icon;
                  otherwise show the text as well.
                */}
                {!isFrench && (
                  <span className="text-white font-semibold truncate">
                    {getButtonText(navContent.logoutButton)}
                  </span>
                )}
              </button>
            ) : (
              <>
                <Link
                  href={`/${locale}/signup`}
                  className="flex items-center justify-center gap-2 bg-main text-white border border-main font-semibold px-5 py-3 rounded-lg transition-all duration-300 ease-in-out w-full"
                  onClick={() => setNavActive(false)}
                >
                  <span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0626 18.2084C14.5615 18.2084 18.2084 14.5615 18.2084 10.0626C18.2084 5.56369 14.5615 1.91675 10.0626 1.91675C5.56369 1.91675 1.91675 5.56369 1.91675 10.0626C1.91675 14.5615 5.56369 18.2084 10.0626 18.2084Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.7733 6.87269C12.4177 6.51631 11.9951 6.23368 11.53 6.04102C11.0648 5.84836 10.5662 5.74946 10.0627 5.75C9.55921 5.74946 9.06058 5.84836 8.59541 6.04102C8.13025 6.23368 7.70771 6.51631 7.35205 6.87269"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {!isFrench && (
                    <span className="text-white font-semibold truncate">
                      {getButtonText(navContent.registerButton)}
                    </span>
                  )}
                </Link>
                <Link
                  href={`/${locale}/login`}
                  className="flex items-center justify-center gap-2 bg-secondary border border-secondary px-5 py-3 rounded-lg transition-all duration-300 w-full"
                  onClick={() => setNavActive(false)}
                >
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4375 18.0714C13.6753 18.0714 15.8214 17.2248 17.4037 15.7178C18.9861 14.2108 19.875 12.1669 19.875 10.0357C19.875 7.90451 18.9861 5.86059 17.4037 4.35361C15.8214 2.84662 13.6753 2 11.4375 2"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 10.0357H13.5469M13.5469 10.0357L10.3828 7.02234M13.5469 10.0357L10.3828 13.0491"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {!isFrench && (
                    <span className="text-white font-semibold truncate">
                      {getButtonText(navContent.loginButton)}
                    </span>
                  )}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Responsive debugging overlay - helps during development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-0 right-0 bg-gray-800 text-white text-xs px-2 py-1 z-50">
          <span className="sm:hidden">xs</span>
          <span className="hidden sm:inline md:hidden">sm</span>
          <span className="hidden md:inline lg:hidden">md</span>
          <span className="hidden lg:inline xl:hidden">lg</span>
          <span className="hidden xl:inline 2xl:hidden">xl</span>
          <span className="hidden 2xl:inline">2xl</span>
        </div>
      )}

      {/* Add a spacer to prevent content from being hidden under the navbar */}
      <div style={{ height: "var(--navbar-height, 64px)" }}></div>
    </div>
  );
}
