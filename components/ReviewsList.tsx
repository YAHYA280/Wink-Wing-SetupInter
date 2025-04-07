"use client";
// next
import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";

// components
import ReviewCard from "./ReviewCard";

// translation service
import { useReviewsData } from "@/services/translationService";

export default function ReviewsList() {
  // Get current locale from the pathname
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split("/")[1] || "en", [pathname]);

  // Fetch translations from the API
  const { data: reviewsData, status } = useReviewsData();

  const defaultContent = {
    title_review: "What Our Clients Say",
    subtitle_review:
      "Real experiences from people who found their perfect home with WinkWing",
    all_button: "All Reviews",
    withPhotos_btn: "With Photos",
  };

  // Default content for fallback
  const defaultReviews = [
    {
      id: 1,
      name: "Sam",
      review: 5,
      text: "Was about to give up on my search, but I stumbled on this gem. The place is exactly what I wanted—spacious, modern, and within my budget. Highly recommend!",
      image: null,
    },
    {
      id: 2,
      name: "Mark & Suzan",
      review: 5,
      text: "WinkWing made finding our apartment a breeze. We found our perfect place in just a week!",
      image: "/review-image-1.jpg",
    },
    {
      id: 3,
      name: "Sam",
      review: 5,
      text: "I've been searching for months, and this place checked all my boxes. Affordable, pet-friendly, and walking distance to work. Couldn't ask for more!",
      image: null,
    },
    {
      id: 4,
      name: "Aditya & Ananda",
      review: 5,
      text: "Such a smooth experience! WinkWing helped us find a rental that checked all our boxes.",
      image: "/review-image-2.jpg",
    },
    {
      id: 5,
      name: "David",
      review: 5,
      text: "WinkWing did help me find my new spot, loving it! Thanks!",
      image: null,
    },
    {
      id: 6,
      name: "David",
      review: 5,
      text: "WinkWing did help me find my new spot, loving it! Thanks!",
      image: "/review-image-3.jpg",
    },
    {
      id: 7,
      name: "David",
      review: 5,
      text: "Real-time alerts helped me find the perfect pet-friendly apartment fast. Super helpful!",
      image: null,
    },
    {
      id: 8,
      name: "James",
      review: 5,
      text: "Moving is stressful. WinkWing helps you by Moving is stressful. WinkWing helps you by",
      image: "/review-image-4.jpg",
    },
    {
      id: 9,
      name: "Sam",
      review: 5,
      text: "Moving is stressful. WinkWing helps you by Moving is stressful. WinkWing helps you by",
      image: null,
    },
    {
      id: 10,
      name: "James",
      review: 5,
      text: "Moving is stressful. WinkWing helps you by Moving is stressful. WinkWing helps you by",
      image: "/review-image-5.jpg",
    },
    {
      id: 11,
      name: "Sam",
      review: 5,
      text: "Moving is stressful. WinkWing helps you by Moving is stressful. WinkWing helps you by",
      image: null,
    },
    {
      id: 12,
      name: "James",
      review: 5,
      text: "Moving is stressful. WinkWing helps you by Moving is stressful. WinkWing helps you by",
      image: "/review-image-6.jpg",
    },
  ];
  const content = useMemo(() => {
    if (status === "success" && reviewsData) {
      return {
        ...defaultContent,
        title_review: reviewsData.title_review || defaultContent.title_review,
        subtitle_review:
          reviewsData.subtitle_review || defaultContent.subtitle_review,
        all_button: reviewsData.all_button || defaultContent.all_button,
        withPhotos_btn:
          reviewsData.withPhotos_btn || defaultContent.withPhotos_btn,
      };
    }
    return defaultContent;
  }, [reviewsData, status]);
  // Get reviews from API or fallback to default
  const reviews = useMemo(() => {
    if (
      status === "success" &&
      reviewsData &&
      reviewsData.reviews?.length > 0
    ) {
      return reviewsData.reviews;
    }
    return defaultReviews;
  }, [reviewsData, status, defaultReviews]);

  const [showMore, setShowMore] = useState(6);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleShowMore = () => setShowMore(showMore + 6);

  // Filter reviews
  const filteredReviews =
    activeFilter === "all"
      ? reviews
      : activeFilter === "with-images"
      ? reviews.filter((review) => review.image)
      : reviews.filter((review) => !review.image);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.title_review}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {content.subtitle_review}
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeFilter === "all"
                  ? "bg-main text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {content.all_button}
            </button>
            <button
              onClick={() => setActiveFilter("with-images")}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeFilter === "with-images"
                  ? "bg-main text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {content.withPhotos_btn}
            </button>
          </div>
        </div>

        {/* Reviews Display - Conditional Layout Based on Filter */}
        {activeFilter === "with-images" ? (
          // Grid layout for "with-images" filter to prevent overlapping
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.slice(0, showMore).map((review) => (
              <div key={review.id}>
                <ReviewCard review={review} disableOffset={true} />
              </div>
            ))}
          </div>
        ) : (
          // Original staggered layout for "all" and "text-only" filters
          <div className="flex flex-col items-start justify-center gap-x-6 gap-y-12 px-2 md:flex-row md:flex-wrap">
            {filteredReviews.slice(0, showMore).map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                disableOffset={false}
              />
            ))}
          </div>
        )}

        {/* Show More Button */}
        {showMore < filteredReviews.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleShowMore}
              className="inline-flex items-center justify-center bg-main text-white py-3 px-8 rounded-lg font-medium transition-all duration-300 hover:bg-main/90 hover:shadow-lg"
            >
              <span>Show more reviews</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
