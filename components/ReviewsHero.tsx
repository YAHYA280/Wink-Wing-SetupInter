"use client";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks/hooks";

export default function ReviewsHero() {
  const { token } = useAppSelector((state) => state.auth);

  return (
    // Reduced top/bottom padding from 24 to 16 for a tighter layout
    // Also reduced bottom margin from 20 to 12
    <div className="pt-16 pb-16 px-2 max-w-[1164px] mx-auto lg:px-12 mb-12">
      <div className="flex flex-col-reverse items-center gap-y-8 lg:flex-row lg:justify-between lg:py-16">
        <div className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-left">
          <h5 className="text-main text-[16px] leading-[24px]">Reviews</h5>
          <h1 className="flex items-center gap-3 font-extrabold text-2xl xs:text-3xl sm:text-4xl text-[#003956]">
            1543 happy renters
            <span>
              <svg
                width="31"
                height="28"
                viewBox="0 0 31 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 27.635C15.2098 27.635 14.9643 27.5284 14.7634 27.3154L4.31696 16.6275C4.20536 16.5329 4.0519 16.379 3.85658 16.1659C3.66127 15.9529 3.35156 15.5653 2.92746 15.0031C2.50335 14.4409 2.12388 13.8639 1.78906 13.2721C1.45424 12.6803 1.15569 11.9642 0.893415 11.1238C0.631138 10.2835 0.5 9.46681 0.5 8.67381C0.5 6.0699 1.20871 4.03413 2.62612 2.56647C4.04353 1.09882 6.00223 0.36499 8.50223 0.36499C9.1942 0.36499 9.90011 0.492226 10.62 0.746699C11.3398 1.00117 12.0095 1.34441 12.6289 1.77642C13.2483 2.20843 13.7812 2.61382 14.2277 2.99256C14.6741 3.37131 15.0982 3.77374 15.5 4.19983C15.9018 3.77374 16.3259 3.37131 16.7723 2.99256C17.2187 2.61382 17.7517 2.20843 18.3711 1.77642C18.9905 1.34441 19.6602 1.00117 20.38 0.746699C21.0999 0.492226 21.8058 0.36499 22.4978 0.36499C24.9978 0.36499 26.9565 1.09882 28.3739 2.56647C29.7913 4.03413 30.5 6.0699 30.5 8.67381C30.5 11.2895 29.2221 13.9526 26.6663 16.6631L16.2366 27.3154C16.0357 27.5284 15.7902 27.635 15.5 27.635Z"
                  fill="#FF5D22"
                />
              </svg>
            </span>
          </h1>
          <p className="text-[16px] leading-[24px] max-w-[600px]">
            Winkwing works! Don’t just take our word for it—1554 glowing
            Trustpilot reviews say it all. We're here to help you find your next
            rental home.
          </p>
          <Link
            href={token ? "/welcome" : "/signup"}
            className="bg-main rounded-lg py-3 px-20 text-white font-semibold xs:text-[20px] xs:px-24 xl:hover:bg-transparent border xl:hover:border-main xl:hover:text-main transition-all duration-300"
          >
            Let’s get started
          </Link>
        </div>
        <div className="mb-9 lg:mb-0">
          <Image
            src="/reviews-img.png"
            alt="Reviews Hero Image"
            width={357}
            height={357}
          />
        </div>
      </div>
    </div>
  );
}
