"use client";
// next
import { useState } from "react";

// components
import FaqCard from "./FaqCard";

export default function FAQ() {
  // store all information in array
  const faq = [
    {
      title: "How will WinkWing help me find a new rental flat?",
      content:
        "As you can see, it is very difficult to find an apartment at the moment. Sometimes, there are literally 100 others who respond to a property, while the real estate agent often only handles the first 10 to 20 responses. So if you respond too late, you no longer have a chance of being invited to view it.WinkWing helps you to be one of the first to respond. Using smart algorithms, we scan more than 750 websites every minute and send you an email as soon as we have found a new property for you. we will send you an email as soon as we have found a new property for you. This way, you discover more properties, respond faster than other home seekers and are therefore invited to view more often! Does it really work that well? Yes! Read here why we are rated with more than 4.7 / 5 stars on Trustpilot",
    },
    {
      title: "How long will it take to find a new home?",
      content:
        "You probably look at the same websites every day and often come to the conclusion that you always respond too late. Because you receive offers from many more websites via WinkWing and receive real-time notifications, you will find a rental home faster with WinkWing. How long it takes for you to find a rental home with Winkwing depends on your situation. Most people find a new home within 7 weeks, but if you are looking in the expensive Randstad and your budget is a bit lower, expect it to take longer. So start looking in time! When you register on WinkWing, you will receive an indication of how many matches we expect to find for you. This is already a good indication of how long it will take for you!",
    },
    {
      title: "Do you rent out houses yourself?",
      content:
        "Not at the moment. There are literally thousands of real estate agents in the Netherlands, so no one wants another real estate agency. Moreover, the fact that it is so difficult to stay informed of all their offers is one of the reasons why we started Winkwing! By sending you real-time email notifications, we also help you to be one of the first to respond. This increases your chance of being invited for the viewing!",
    },
    {
      title: "Can I rent social housing via WinkWing?",
      content:
        "No, Winkwing only searches for private sector homes and not for social housing.",
    },
    {
      title: "Why does WinkWing cost money?",
      content:
        "With Winkwing you get a head start on your competition and you will find a rental home faster. We work very hard to make our service as good as possible, and that costs time and money! In addition, if it were free and everyone used it, this head start would disappear again. It is therefore important that we ask for a contribution for this!",
    },
    {
      title: "Can I also find rooms via Winkwing?",
      content: "Yes! Winkwing also finds rooms.",
    },
    {
      title: "Is Winkwing also suitable for sharers?",
      content:
        'It is possible to indicate in your search that you would like to share your home with someone. "Sharing" here means that you are not looking for a partner, so that you want to rent with 2 or more independent tenants. Many advertisements that Winkwing finds do not clearly state whether sharing is allowed or not. We will forward these to you to be sure, because it is always worth calling the real estate agent to see if it is possible to share!',
    },
    {
      title: "Is there an income requirement?",
      content:
        "Many homes have an income requirement. Landlords want to be sure that the rent can be paid every month, so they often ask for proof of your income and set a minimum requirement. This is often 2 to 3 times the rent. So expect that if you are going to rent a home for €1500, you will often have to earn €3k to €4.5k (jointly). The exact income requirement varies per home. This is always stated in the description of the home.",
    },
    {
      title: "Is Winkwing also suitable for students?",
      content:
        "Yes, you can indicate that you are a student when creating your search. It sometimes happens that the advertisement does not clearly state whether or not students are allowed. We will send you these houses anyway, because it is always worth calling the real estate agent about the possibilities. Landlords want certainty that the rent can be paid every month, and students often lack a fixed income. It is therefore more difficult for students than for working people to get a rental home. If you are a student and do not have an income statement, make sure that you can arrange a guarantee. There are real estate agents who accept this!",
    },
    {
      title: "Do i have to pay for sites that Winkwing sends me?",
      content:
        "In order to make our housing offer as extensive as possible, we search on a wide variety of websites, including sites that you have to register for. Some of these sites do indeed have a paywall, unfortunately we do not have much influence on this. We think it is important to include them in our offer for a complete overview. If you prefer not to receive offers from websites with a paywall, you can easily adjust this in your profile under the search criteria. This way you can personalize your search to your preferences :) If you are unsure whether you want to receive offers from paid websites, we recommend that you try it out, so that you get a feel for where most of the offers for your search come from. If this comes from one specific paid website, it might be worth considering paying for it. Another option is of course to simply turn it off, then you know for sure that you do not have to pay for other websites.",
    },
    {
      title: "I have another question...",
      content:
        "We are easily reachable via Whatsapp or via info@winkwing.nl So don't hesitate to contact us! For this you can use our chat widget at the bottom right of your screen.",
    },
  ];

  //
  const [showMore, setShowMore] = useState<number>(5);

  const handleShowMore = () => {
    setShowMore(showMore + 6);
  };

  return (
    <div className="py-24 px-2 md:px-20">
      <h1 className="font-extrabold text-center text-4xl mb-[40px] text-[#003956] md:text-[48px] leading-[50px]">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-col items-center justify-center text-center gap-5">
        {faq.slice(0, showMore).map((item, i) => (
          <FaqCard key={i} {...item} i={i} />
        ))}
      </div>
      {showMore != faq.length && (
        <button
          onClick={handleShowMore}
          className="block mx-auto bg-main text-white border border-main text-[20px] py-3 px-[100px] mt-16 md:mt-[70px] font-semibold  xl:hover:bg-transparent xl:hover:text-main rounded-lg transition-all duration-300 ease-in-out"
        >
          Show more
        </button>
      )}
    </div>
  );
}
