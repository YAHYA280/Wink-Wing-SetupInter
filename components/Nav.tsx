// components/Nav.tsx
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

// Default navigation links and button texts
const defaultLinks = [
  { id: 1, title: "How it works", href: "/how-it-works" },
  { id: 2, title: "Reviews", href: "/reviews" },
  { id: 3, title: "Pricing", href: "/pricing" },
  { id: 4, title: "Contact", href: "/contact" },
];

const defaultRegisterButton = "Start my search";
const defaultLoginButton = "Login";

export default function Nav() {
  // State to hold the navbar data
  const [navbarData, setNavbarData] = useState({
    links: defaultLinks,
    registerButton: defaultRegisterButton,
    loginButton: defaultLoginButton,
  });

  // State to show loading/error state
  const [dataStatus, setDataStatus] = useState({
    isLoading: true,
    error: null as string | null,
  });

  // Get the current pathname to detect language changes
  const pathname = usePathname();

  // Extract the locale from the pathname
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);

  // Fetch the navbar data directly when component mounts and when locale changes
  useEffect(() => {
    let isMounted = true;

    async function fetchNavbarData() {
      try {
        if (isMounted) setDataStatus({ isLoading: true, error: null });

        const apiUrl =
          process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || "";

        const response = await fetch(
          `${apiUrl}/api/navbar?populate=*&locale=${locale}`,
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const strapiData = data.data;
        if (
          strapiData &&
          strapiData.Navbar &&
          strapiData.Navbar[0] &&
          isMounted
        ) {
          setNavbarData({
            links: strapiData.Navbar[0].links || defaultLinks,
            registerButton:
              strapiData.Navbar[0].registerButton || defaultRegisterButton,
            loginButton: strapiData.Navbar[0].loginButton || defaultLoginButton,
          });
        }

        if (isMounted) setDataStatus({ isLoading: false, error: null });
      } catch (error) {
        if (isMounted) {
          setDataStatus({
            isLoading: false,
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }
    }

    fetchNavbarData();

    return () => {
      isMounted = false;
    };
  }, [locale]);

  const router = useRouter();
  const [navActive, setNavActive] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    router.push(`/${locale}/login`);
  };

  useEffect(() => {
    const closeNav = () => setNavActive(false);
    window.addEventListener("click", closeNav);
    window.addEventListener("scroll", closeNav);

    return () => {
      window.removeEventListener("click", closeNav);
      window.removeEventListener("scroll", closeNav);
    };
  }, []);

  const toggleNav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNavActive((prev) => !prev);
  };

  const mobileNavClasses = useMemo(
    () =>
      navActive
        ? "fixed top-0 left-0 right-0 bottom-0 bg-black/90 text-white z-[7]"
        : "hidden",
    [navActive]
  );

  // Helper function to prefix links with the current locale
  const localizedHref = (href: string) =>
    href.startsWith("/") ? `/${locale}${href}` : href;

  return (
    <div className="fixed w-full shadow-lg z-50 bg-white">
      <nav className="flex items-center justify-between max-w-[1164px] mx-auto w-full py-[15px] px-2">
        <div className="flex items-center gap-8">
          <Link className="cursor-pointer" href={`/${locale}`}>
            <Image
              src="/winkwing-logo.svg"
              alt="Logo"
              width={150}
              height={40}
            />
          </Link>
          <LanguageSwitcher />
        </div>
        <div className="hidden lg:flex items-center gap-[21px] xl:gap-[41px]">
          <div className="flex items-center gap-[20px] xl:gap-[37px]">
            {navbarData.links.map((link: any) => (
              <Link
                key={link.id}
                className="font-medium text-[15px] xl:text-lg text-center xl:text-left hover:underline"
                href={localizedHref(link.href)}
              >
                {link.title}
              </Link>
            ))}
            {token && (
              <Link
                className="font-medium text-[15px] xl:text-lg text-center xl:text-left hover:underline"
                href={`/${locale}/dashboard`}
              >
                Dashboard
              </Link>
            )}
          </div>
          {token ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 bg-secondary border border-secondary px-8 py-3 group rounded-lg xl:hover:bg-transparent transition-all duration-300"
            >
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4375 18.0714C13.6753 18.0714 15.8214 17.2248 17.4037 15.7178C18.9861 14.2108 19.875 12.1669 19.875 10.0357C19.875 7.90451 18.9861 5.86059 17.4037 4.35361C15.8214 2.84662 13.6753 2 11.4375 2"
                  className="stroke-white group-hover:stroke-secondary"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3 10.0357H13.5469M13.5469 10.0357L10.3828 7.02234M13.5469 10.0357L10.3828 13.0491"
                  className="stroke-white group-hover:stroke-secondary"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-white font-semibold group-hover:text-secondary">
                Log out
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-8">
              <Link
                href={`/${locale}/signup`}
                className="flex items-center gap-4 bg-main group text-white border border-main font-semibold xl:hover:bg-transparent px-8 py-3 rounded-lg transition-all duration-300 ease-in-out"
              >
                <span>
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="stroke-white group-hover:stroke-main"
                      d="M10.0626 18.2084C14.5615 18.2084 18.2084 14.5615 18.2084 10.0626C18.2084 5.56369 14.5615 1.91675 10.0626 1.91675C5.56369 1.91675 1.91675 5.56369 1.91675 10.0626C1.91675 14.5615 5.56369 18.2084 10.0626 18.2084Z"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      className="stroke-white group-hover:stroke-main"
                      d="M12.7733 6.87269C12.4177 6.51631 11.9951 6.23368 11.53 6.04102C11.0648 5.84836 10.5662 5.74946 10.0627 5.75C9.55921 5.74946 9.06058 5.84836 8.59541 6.04102C8.13025 6.23368 7.70771 6.51631 7.35205 6.87269M15.9191 15.9189L19.9848 19.9846"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-white font-semibold xl:group-hover:text-main">
                  {navbarData.registerButton}
                </span>
              </Link>
              <Link
                href={`/${locale}/login`}
                className="flex items-center gap-3 bg-secondary border border-secondary px-8 py-3 group rounded-lg xl:hover:bg-transparent transition-all duration-300"
              >
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4375 18.0714C13.6753 18.0714 15.8214 17.2248 17.4037 15.7178C18.9861 14.2108 19.875 12.1669 19.875 10.0357C19.875 7.90451 18.9861 5.86059 17.4037 4.35361C15.8214 2.84662 13.6753 2 11.4375 2"
                    className="stroke-white group-hover:stroke-secondary"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 10.0357H13.5469M13.5469 10.0357L10.3828 7.02234M13.5469 10.0357L10.3828 13.0491"
                    className="stroke-white group-hover:stroke-secondary"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-white font-semibold group-hover:text-secondary">
                  {navbarData.loginButton}
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile nav */}
        <button
          onClick={toggleNav}
          className="block lg:hidden relative z-[100] bg-white p-3 rounded-full"
        >
          {navActive ? (
            <GrClose size={25} fill="#fff" />
          ) : (
            <AiOutlineMenu size={25} />
          )}
        </button>

        <div className={mobileNavClasses}>
          <div className="flex flex-col items-center justify-center h-full gap-6 text-white">
            {navbarData.links.map((link: any) => (
              <Link
                key={link.id}
                className="font-semibold text-2xl"
                href={localizedHref(link.href)}
              >
                {link.title}
              </Link>
            ))}
            {token && (
              <Link
                className="font-semibold text-2xl"
                href={`/${locale}/dashboard`}
              >
                Dashboard
              </Link>
            )}
            {token ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 bg-secondary border border-secondary px-8 py-3 group rounded-lg xl:hover:bg-transparent transition-all duration-300"
              >
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4375 18.0714C13.6753 18.0714 15.8214 17.2248 17.4037 15.7178C18.9861 14.2108 19.875 12.1669 19.875 10.0357C19.875 7.90451 18.9861 5.86059 17.4037 4.35361C15.8214 2.84662 13.6753 2 11.4375 2"
                    className="stroke-white group-hover:stroke-secondary"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 10.0357H13.5469M13.5469 10.0357L10.3828 7.02234M13.5469 10.0357L10.3828 13.0491"
                    className="stroke-white group-hover:stroke-secondary"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-white font-semibold group-hover:text-secondary">
                  Log out
                </span>
              </button>
            ) : (
              <div className="flex flex-col items-center gap-8">
                <Link
                  href={`/${locale}/signup`}
                  className="flex items-center gap-4 bg-main group text-white border border-main font-semibold xl:hover:bg-transparent px-8 py-3 rounded-lg transition-all duration-300 ease-in-out"
                >
                  <span>
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="stroke-white group-hover:stroke-main"
                        d="M10.0626 18.2084C14.5615 18.2084 18.2084 14.5615 18.2084 10.0626C18.2084 5.56369 14.5615 1.91675 10.0626 1.91675C5.56369 1.91675 1.91675 5.56369 1.91675 10.0626C1.91675 14.5615 5.56369 18.2084 10.0626 18.2084Z"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        className="stroke-white group-hover:stroke-main"
                        d="M12.7733 6.87269C12.4177 6.51631 11.9951 6.23368 11.53 6.04102C11.0648 5.84836 10.5662 5.74946 10.0627 5.75C9.55921 5.74946 9.06058 5.84836 8.59541 6.04102C8.13025 6.23368 7.70771 6.51631 7.35205 6.87269M15.9191 15.9189L19.9848 19.9846"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-white font-semibold xl:group-hover:text-main">
                    {navbarData.registerButton}
                  </span>
                </Link>
                <Link
                  href={`/${locale}/login`}
                  className="flex items-center gap-3 bg-secondary border border-secondary px-8 py-3 group rounded-lg xl:hover:bg-transparent transition-all duration-300"
                >
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4375 18.0714C13.6753 18.0714 15.8214 17.2248 17.4037 15.7178C18.9861 14.2108 19.875 12.1669 19.875 10.0357C19.875 7.90451 18.9861 5.86059 17.4037 4.35361C15.8214 2.84662 13.6753 2 11.4375 2"
                      className="stroke-white group-hover:stroke-secondary"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 10.0357H13.5469M13.5469 10.0357L10.3828 7.02234M13.5469 10.0357L10.3828 13.0491"
                      className="stroke-white group-hover:stroke-secondary"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-white font-semibold group-hover:text-secondary">
                    {navbarData.loginButton}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
