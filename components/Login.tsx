"use client";
// next
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { FormEvent, useState, useMemo } from "react";

// icons
import { GrClose } from "react-icons/gr";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { clearError, login } from "@/store/features/authSlice";

// translation service
import { useLoginData } from "@/services/translationService";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);

  // Extract the current locale from the path
  const getLocale = () => {
    const pathParts = pathname.split("/");
    return pathParts.length > 1 ? pathParts[1] : "en"; // Default to 'en' if no locale found
  };

  const locale = getLocale();

  // Fetch translations from the API
  const { data: loginData, status } = useLoginData();

  // Default content for fallback
  const defaultContent = {
    subtitle: "Find your new home the easy way",
    title: "Login Account",
    login_text: "Welcome back to WinkWing.",
    login_email: "Email",
    login_password: "Password",
    login_forgotpassword: "Forgot password?",
    button: "Login",
  };

  // Merge API data with defaults using useMemo
  const content = useMemo(() => {
    if (status === "success" && loginData) {
      return {
        ...defaultContent,
        ...loginData,
      };
    }
    return defaultContent;
  }, [loginData, status]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password }));

      if (login.fulfilled.match(result)) {
        router.push(`/${locale}/moving-guide`); // Preserve locale on successful login
      }
      // Don't clear form on failed login so user can correct errors
      if (!login.fulfilled.match(result)) {
        return;
      }
    } catch (e: any) {
      console.error(e);
      return; // Return early to prevent clearing form
    }

    // Only clear form on success
    setEmail("");
    setPassword("");
  };

  function handleClearError() {
    dispatch(clearError());
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 md:py-24">
      <div className="flex flex-col items-center text-center md:text-left md:items-start gap-4">
        <h5 className="text-[16px] leading-[24px] text-main">
          {content.subtitle}
        </h5>
        <h1 className="flex flex-col sm:flex-row items-center gap-4 font-extrabold text-[#003956] text-3xl xs:text-4xl md:text-5xl">
          {content.title}{" "}
          <Image
            className="mt-[10px]"
            src="/winkwing-logo.svg"
            alt="Logo"
            width={250}
            height={70}
            loading="lazy"
          />
        </h1>
      </div>
      <div className="w-full md:w-[730px] bg-white h-[500px] md:h-max rounded-lg p-6 relative z-10">
        <div className="flex flex-col items-center justify-center md:items-start text-center gap-5">
          <h4 className="text-[16px] leading-[24px]">{content.login_text}</h4>
          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
            <input
              className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full"
              type="email"
              placeholder={content.login_email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full"
              type="password"
              placeholder={content.login_password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link
              href={`/${locale}/login/reset-password`}
              className="font-semibold text-[16px] leading-[48px] text-main ml-auto xl:hover:underline"
            >
              {content.login_forgotpassword}
            </Link>
            {error && (
              <div className="flex items-center justify-center w-full bg-[#FAD1D5] relative border border-[#F45D48] py-3 px-8 rounded-lg">
                <span className="flex items-center justify-center text-center">
                  {error || "Something went wrong"}
                </span>
                <button onClick={handleClearError} className="absolute right-4">
                  <GrClose size={20} />
                </button>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full bg-main rounded-lg border border-main py-2 px-9 font-semibold text-[16px] leading-[24px] text-white xl:hover:bg-transparent xl:hover:text-main transition-all duration-300"
            >
              {loading ? "Loading..." : content.button}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
