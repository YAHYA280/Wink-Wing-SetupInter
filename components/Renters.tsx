"use client";
import Image from "next/image";
import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useHomePageData } from "@/services/translationService";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Autoplay } from "swiper/modules";

// Component
import RentersCard from "./RentersCard";

export default function Renters() {
  const pathname = usePathname();
  const { data: homePageData, status } = useHomePageData();

  // Default renters data object matching the API structure
  const defaultRentersData = {
    title: "Renters",
    text: "Thousands of people have found a home using WinkWing's smart tools.",
    renters: [
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
        text: "Moving is stressful. WinkWing helps you by moving is stressful. WinkWing helps you by...",
        image: "/renters-6.jpg",
      },
      {
        id: 7,
        name: "Jason & Rachelle",
        rating: 5,
        text: "We loved how fast WinkWing updated us with new listings. We found the perfect rental in no time!",
        image: "/renters-3.jpg",
      },
    ],
  };

  // Merge API data with default values using useMemo
  const rentersContent = useMemo(() => {
    if (status === "success" && homePageData?.Renters) {
      return homePageData.Renters;
    }
    return defaultRentersData;
  }, [homePageData, status]);

  // Swiper breakpoints configuration
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
      <div className="flex flex-col items-center justify-center text-center mx-auto gap-6 mb-20">
        <h1 className="flex items-center gap-3 font-extrabold text-4xl md:text-5xl">
          {rentersContent.title}
          <span>
            {/* <Image
              className="mt-2"
              src="/winkwing-logo.svg"
              width={200}
              height={50}
              alt="WinkWing Logo"
            /> */}
            WinkWing
          </span>
        </h1>
        <p className="text-base leading-6">{rentersContent.text}</p>
      </div>

      {/* Swiper Container */}
      <div className="relative flex justify-center items-center w-full px-4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          slidesPerView={"auto"}
          loop
          breakpoints={breakpoints}
          onSwiper={setSwiper}
        >
          {rentersContent.renters.map((renter) => (
            <SwiperSlide key={renter.id}>
              <div className="flex justify-center items-center">
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
            <g filter="url(#filter0_d)">
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
                id="filter0_d"
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
                  result="effect1_dropShadow"
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
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
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
            <g filter="url(#filter1_d)">
              <circle cx="39" cy="37.8931" r="27" fill="#FFF5F5" />
            </g>
            <path
              d="M51.0607 38.9537C51.6464 38.3679 51.6464 37.4182 51.0607 36.8324L41.5147 27.2865C40.9289 26.7007 39.9792 26.7007 39.3934 27.2865C38.8076 27.8723 38.8076 28.822 39.3934 29.4078L47.8787 37.8931L39.3934 46.3783C38.8076 46.9641 38.8076 47.9139 39.3934 48.4997C39.9792 49.0855 40.9289 49.0855 41.5147 48.4997L51.0607 38.9537ZM25 39.3931L50 39.3931L50 36.3931L25 36.3931L25 39.3931Z"
              fill="#FF5314"
            />
            <defs>
              <filter
                id="filter1_d"
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
                  result="effect1_dropShadow"
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
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
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
