"use client";
// next
import Image from "next/image";
import { useMemo, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";

// components
import RentersCard from "./RentersCard";

// swiper modules
import { Autoplay } from "swiper/modules";

export default function Renters() {
  // A list of renters
  const renters = [
    {
      id: 1,
      name: "Mark & Suzan",
      rating: 5,
      text: "WinkWing made finding our apartment a breeze. We found our perfect place in just a week!",
      image: "/renters-1.jpg",
    },
    {
      id: 2,
      name: "Aditya & Ananda",
      rating: 5,
      text: "Such a smooth experience! WinkWing helped us find a rental that checked all our boxes.",
      image: "/renters-2.jpg",
    },
    {
      id: 3,
      name: "Jason & Rachelle",
      rating: 5,
      text: "We loved how fast WinkWing updated us with new listings. We found the perfect rental in no time!",
      image: "/renters-3.jpg",
    },
    {
      id: 4,
      name: "Mia",
      rating: 5,
      text: "Found a spacious, affordable apartment thanks to WinkWing. The process was easy!",
      image: "/renters-4.jpg",
    },
    {
      id: 5,
      name: "Daniel",
      rating: 5,
      text: "Real-time alerts helped me find the perfect pet-friendly apartment fast. Super helpful!",
      image: "/renters-5.jpg",
    },
    {
      id: 6,
      name: "James",
      rating: 5,
      text: "Moving is stressful. WinkWing helps you by Moving is stressful. WinkWing helps you by",
      image: "/renters-6.jpg",
    },
    {
      id: 7,
      name: "Jason & Rachelle",
      rating: 5,
      text: "We loved how fast WinkWing updated us with new listings. We found the perfect rental in no time!",
      image: "/renters-3.jpg",
    },
  ];

  const rentersList = useMemo(
    () => [...renters], // Keep your renters array here
    []
  );

  // Breakpoints for Swiper
  const breakpoints = {
    300: { slidesPerView: 1, spaceBetween: 16 },
    600: { slidesPerView: 2, spaceBetween: 16 },
    900: { slidesPerView: 3, spaceBetween: 24 },
    1150: { slidesPerView: 5, spaceBetween: 24 },
    1300: { slidesPerView: 6, spaceBetween: 24 },
  };

  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="py-24 relative z-30 bg-white">
      {/* Section Title */}
      <div className="flex flex-col items-center justify-center text-center mx-auto gap-[22px] mb-[80px]">
        <h1 className="flex items-center gap-3 font-extrabold text-4xl md:text-5xl">
          Renters
          <span>
            <svg
              width="30"
              height="57"
              viewBox="0 0 30 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 42.487C14.7098 42.487 14.4643 42.3804 14.2634 42.1674L3.81696 31.4796C3.70536 31.3849 3.5519 31.231 3.35658 31.018C3.16127 30.8049 2.85156 30.4173 2.42746 29.8551C2.00335 29.2929 1.62388 28.7159 1.28906 28.1241C0.954241 27.5323 0.655692 26.8162 0.393415 25.9759C0.131138 25.1355 0 24.3188 0 23.5258C0 20.9219 0.708705 18.8861 2.12612 17.4185C3.54353 15.9508 5.50223 15.217 8.00223 15.217C8.6942 15.217 9.40011 15.3442 10.12 15.5987C10.8398 15.8532 11.5095 16.1964 12.1289 16.6284C12.7483 17.0605 13.2812 17.4658 13.7277 17.8446C14.1741 18.2233 14.5982 18.6258 15 19.0518C15.4018 18.6258 15.8259 18.2233 16.2723 17.8446C16.7187 17.4658 17.2517 17.0605 17.8711 16.6284C18.4905 16.1964 19.1602 15.8532 19.88 15.5987C20.5999 15.3442 21.3058 15.217 21.9978 15.217C24.4978 15.217 26.4565 15.9508 27.8739 17.4185C29.2913 18.8861 30 20.9219 30 23.5258C30 26.1416 28.7221 28.8046 26.1663 31.5151L15.7366 42.1674C15.5357 42.3804 15.2902 42.487 15 42.487Z"
                fill="#FF5D22"
              />
            </svg>
          </span>
          <span>
            <Image
              className="mt-2"
              src="/winkwing-logo.svg"
              width={200}
              height={50}
              alt="WinkWing Logo"
            />
          </span>
        </h1>
        <p className="text-[16px] leading-[24px]">
          Thousands of people have found a home using WinkWing's smart tools.
        </p>
      </div>

      {/* Swiper Container */}
      <div className="relative flex justify-center items-center w-full px-4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          slidesPerView={"auto"}
          loop
          breakpoints={breakpoints}
          onSwiper={setSwiper} // Capture swiper instance
        >
          {rentersList.map((renter) => (
            <SwiperSlide key={renter.id}>
              <div className="flex justify-center items-center ">
                <RentersCard renter={renter} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left Navigation Button */}
        <button
          onClick={() => swiper?.slidePrev()}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 z-20 bg-transparent"
        >
          <svg
            width="78"
            height="77"
            viewBox="0 0 78 77"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_4_606)">
              <circle
                cx="27"
                cy="27"
                r="27"
                transform="matrix(-1 0 0 1 66 10.8931)"
                fill="#FFF5F5"
              />
            </g>
            <path
              d="M26.9393 38.9537C26.3536 38.3679 26.3536 37.4182 26.9393 36.8324L36.4853 27.2865C37.0711 26.7007 38.0208 26.7007 38.6066 27.2865C39.1924 27.8723 39.1924 28.822 38.6066 29.4078L30.1213 37.8931L38.6066 46.3783C39.1924 46.9641 39.1924 47.9139 38.6066 48.4997C38.0208 49.0855 37.0711 49.0855 36.4853 48.4997L26.9393 38.9537ZM53 39.3931L28 39.3931L28 36.3931L53 36.3931L53 39.3931Z"
              fill="#FF5314"
            />
            <defs>
              <filter
                id="filter0_d_4_606"
                x="0.9"
                y="0.793066"
                width="76.2"
                height="76.2"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="1"
                  operator="dilate"
                  in="SourceAlpha"
                  result="effect1_dropShadow_4_606"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="5.05" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4_606"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4_606"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={() => swiper?.slideNext()}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 z-20 bg-transparent"
        >
          <svg
            width="78"
            height="77"
            viewBox="0 0 78 77"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_4_603)">
              <circle cx="39" cy="37.8931" r="27" fill="#FFF5F5" />
            </g>
            <path
              d="M51.0607 38.9537C51.6464 38.3679 51.6464 37.4182 51.0607 36.8324L41.5147 27.2865C40.9289 26.7007 39.9792 26.7007 39.3934 27.2865C38.8076 27.8723 38.8076 28.822 39.3934 29.4078L47.8787 37.8931L39.3934 46.3783C38.8076 46.9641 38.8076 47.9139 39.3934 48.4997C39.9792 49.0855 40.9289 49.0855 41.5147 48.4997L51.0607 38.9537ZM25 39.3931L50 39.3931L50 36.3931L25 36.3931L25 39.3931Z"
              fill="#FF5314"
            />
            <defs>
              <filter
                id="filter0_d_4_603"
                x="0.9"
                y="0.793066"
                width="76.2"
                height="76.2"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="1"
                  operator="dilate"
                  in="SourceAlpha"
                  result="effect1_dropShadow_4_603"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="5.05" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4_603"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4_603"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
}
