"use client";
// next
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

// icons
import { GrClose } from "react-icons/gr";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { clearError, login } from "@/store/features/authSlice";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.auth);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password }));

      if (login.fulfilled.match(result)) {
        router.push("/moving-guide"); // Only redirect on successful login
      } else if (login.rejected.match(result)) {
      }
    } catch (e: any) {
      console.error(e);
    }

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
          Find your new home the easy way
        </h5>
        <h1 className="flex flex-col sm:flex-row items-center gap-4 font-extrabold text-[#003956] text-3xl xs:text-4xl md:text-5xl">
          Login Account{" "}
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
          <h4 className="text-[16px] leading-[24px]">
            Welcome back to WinkWing.
          </h4>
          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
            <input
              className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="border border-[#CED4D9] rounded-lg py-2 px-3 w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link
              href="/login/reset-password"
              className="font-semibold text-[16px] leading-[48px] text-main ml-auto xl:hover:underline"
            >
              Forgot password?
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
            <button className="flex items-center justify-center w-full bg-main rounded-lg border border-main py-2 px-9 font-semibold text-[16px] leading-[24px] text-white xl:hover:bg-transparent xl:hover:text-main transition-all duration-300">
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
