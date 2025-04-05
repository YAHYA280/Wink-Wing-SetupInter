"use client";
// next
import Link from "next/link";
import { useEffect, useState } from "react";

// types
import { SearchJob } from "@/types/types";

// redux
import { useAppSelector, useAppDispatch } from "@/store/hooks/hooks";
import { getMe } from "@/store/features/authSlice";
import {
  selectSearchJobs,
  deleteSearchJob,
} from "@/store/features/searchJobsSlice";

export default function DashboardRightMenu() {
  const searchJobs = useAppSelector(selectSearchJobs);
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.auth);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    dispatch(getMe({ token } as { token: string }));
  }, []);

  const handleDeleteSearchJob = (id: number) => {
    dispatch(deleteSearchJob(id));
  };

  const handleCopyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid gap-8">
      {/* first column */}
      <div className="flex flex-col gap-3 border border-[#AEAEAE] rounded-lg p-5">
        <h1 className="flex items-center gap-3 font-bold text-lg text-[#19191A]">
          <span>
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6875 22.9583C18.36 22.9583 22.9583 18.36 22.9583 12.6875C22.9583 7.01498 18.36 2.41667 12.6875 2.41667C7.01497 2.41667 2.41666 7.01498 2.41666 12.6875C2.41666 18.36 7.01497 22.9583 12.6875 22.9583Z"
                stroke="black"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M16.1053 8.66557C15.6568 8.21622 15.1241 7.85986 14.5375 7.61694C13.951 7.37402 13.3223 7.24932 12.6875 7.25C12.0527 7.24932 11.4239 7.37402 10.8374 7.61694C10.2509 7.85986 9.71815 8.21622 9.26971 8.66557M20.0716 20.0716L25.198 25.198"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Searchjobs
        </h1>
        {searchJobs.length ? (
          <div>
            {searchJobs.map((job: SearchJob) => (
              <div key={job.id} className="flex items-center justify-between">
                <span>{job.title}</span>
                <div className="flex items-center gap-2">
                  <Link
                    href={"/search/edit-search"}
                    className="text-lg text-[#1C46D9] xl:hover:underline"
                  >
                    Edit
                  </Link>
                  <button onClick={() => handleDeleteSearchJob(job.id)}>
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 11.5V17.5M10 11.5V17.5M6 7.5V19.5C6 20.0304 6.21071 20.5391 6.58579 20.9142C6.96086 21.2893 7.46957 21.5 8 21.5H16C16.5304 21.5 17.0391 21.2893 17.4142 20.9142C17.7893 20.5391 18 20.0304 18 19.5V7.5M4 7.5H20M7 7.5L9 3.5H15L17 7.5"
                        stroke="#1C46D9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span>No active searchjobs.</span>
        )}
        <Link
          href="/search"
          className="font-bold text-lg text-main xl:hover:underline ml-auto"
        >
          Add a search
        </Link>
      </div>
      {/* second column */}
      <div className="flex flex-col gap-3 border border-[#AEAEAE] rounded-lg p-5">
        <h1 className="flex items-center gap-3 font-bold text-lg text-[#19191A]">
          <span>
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2708 1.20833C9.55729 1.20818 8.85531 1.38857 8.23025 1.73271C7.60518 2.07684 7.07735 2.57353 6.69589 3.17654C6.31442 3.77955 6.09173 4.46927 6.04854 5.1815C6.00535 5.89373 6.14306 6.60531 6.44886 7.25H3.62499C3.30452 7.25 2.99718 7.3773 2.77057 7.60391C2.54396 7.83051 2.41666 8.13786 2.41666 8.45833V13.2917C2.41666 13.6121 2.54396 13.9195 2.77057 14.1461C2.99718 14.3727 3.30452 14.5 3.62499 14.5V22.9583C3.62499 23.9197 4.00691 24.8418 4.68673 25.5216C5.36655 26.2014 6.28858 26.5833 7.24999 26.5833H21.75C22.7114 26.5833 23.6334 26.2014 24.3133 25.5216C24.9931 24.8418 25.375 23.9197 25.375 22.9583V14.5C25.6955 14.5 26.0028 14.3727 26.2294 14.1461C26.456 13.9195 26.5833 13.6121 26.5833 13.2917V8.45833C26.5833 8.13786 26.456 7.83051 26.2294 7.60391C26.0028 7.3773 25.6955 7.25 25.375 7.25H22.5511C22.8569 6.60531 22.9946 5.89373 22.9514 5.1815C22.9083 4.46927 22.6856 3.77955 22.3041 3.17654C21.9226 2.57353 21.3948 2.07684 20.7697 1.73271C20.1447 1.38857 19.4427 1.20818 18.7292 1.20833C17.9183 1.20824 17.1176 1.38952 16.3859 1.73888C15.6541 2.08825 15.0098 2.59685 14.5 3.22745C13.9902 2.59685 13.3459 2.08825 12.6141 1.73888C11.8823 1.38952 11.0817 1.20824 10.2708 1.20833ZM15.7083 24.1667H21.75C22.0705 24.1667 22.3778 24.0394 22.6044 23.8127C22.831 23.5861 22.9583 23.2788 22.9583 22.9583V14.5H15.7083V24.1667ZM13.2917 14.5V24.1667H7.24999C6.92952 24.1667 6.62218 24.0394 6.39557 23.8127C6.16896 23.5861 6.04166 23.2788 6.04166 22.9583V14.5H13.2917ZM18.7292 7.25C19.2099 7.25 19.6709 7.05904 20.0108 6.71913C20.3507 6.37922 20.5417 5.9182 20.5417 5.4375C20.5417 4.95679 20.3507 4.49577 20.0108 4.15586C19.6709 3.81595 19.2099 3.62499 18.7292 3.62499C17.928 3.62499 17.1596 3.94326 16.5931 4.50978C16.0266 5.07629 15.7083 5.84465 15.7083 6.64583V7.25H18.7292ZM13.2917 7.25V6.64583C13.2917 5.84465 12.9734 5.07629 12.4069 4.50978C11.8404 3.94326 11.072 3.62499 10.2708 3.62499C9.79012 3.62499 9.3291 3.81595 8.98919 4.15586C8.64928 4.49577 8.45832 4.95679 8.45832 5.4375C8.45832 5.9182 8.64928 6.37922 8.98919 6.71913C9.3291 7.05904 9.79012 7.25 10.2708 7.25H13.2917Z"
                fill="black"
              />
            </svg>
          </span>
          Help your friends
        </h1>
        <p className="text-[16px] leading-[27px]">
          Found a house? Give free months to your friends.
        </p>
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 py-1 px-2 rounded">
            {user?.referralCode}
          </span>
          <button
            onClick={handleCopyReferralCode}
            className="relative font-bold text-lg text-main xl:hover:underline"
          >
            {copied ? "Copied!" : "Copy"}
            {copied && (
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>
      {/* third column */}
      <div className="flex flex-col items-start gap-3 border border-[#AEAEAE] rounded-lg p-5">
        <h1 className="flex items-center gap-3 font-bold text-lg text-[#19191A]">
          <span>
            <svg
              width="20"
              height="23"
              viewBox="0 0 20 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 11.2321C1 9.53988 1 8.69377 1.34143 7.94984C1.68411 7.20592 2.32586 6.65639 3.61059 5.55483L4.8567 4.48692C7.18069 2.49689 8.33956 1.5 9.72274 1.5C11.1059 1.5 12.266 2.49564 14.5888 4.48567L15.8349 5.55358C17.1184 6.65514 17.7614 7.20467 18.1028 7.9486C18.4455 8.69252 18.4455 9.53863 18.4455 11.2308V16.5156C18.4455 18.8657 18.4455 20.0396 17.7153 20.7698C16.985 21.5 15.8112 21.5 13.4611 21.5H5.98442C3.63427 21.5 2.46044 21.5 1.73022 20.7698C1 20.0396 1 18.8657 1 16.5156V11.2321Z"
                stroke="black"
                strokeWidth="2"
              />
              <path
                d="M12.8379 21.5V15.2695C12.8379 14.939 12.7066 14.622 12.4729 14.3883C12.2393 14.1546 11.9223 14.0233 11.5918 14.0233H7.8535C7.52301 14.0233 7.20606 14.1546 6.97237 14.3883C6.73868 14.622 6.60739 14.939 6.60739 15.2695V21.5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Save on your contracts
        </h1>
        <p className="text-[16px] leading-[27px]">
          Save €100's with Winkwing-exclusive discounts on all your monthly.
        </p>
        <button className="font-bold text-lg text-main xl:hover:underline">
          See all discounts
        </button>
      </div>
      {/* fourth column */}
      <div className="flex flex-col items-start gap-3 border border-[#AEAEAE] rounded-lg p-5">
        <h1 className="flex items-center gap-3 font-bold text-lg text-[#19191A]">
          <span>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_626_548)">
                <path
                  d="M12 13.5L4 8.5V18.5H12C12 18.85 12.025 19.1877 12.075 19.513C12.125 19.8383 12.2 20.1673 12.3 20.5H4C3.45 20.5 2.97933 20.3043 2.588 19.913C2.19667 19.5217 2.00067 19.0507 2 18.5V6.5C2 5.95 2.196 5.47933 2.588 5.088C2.98 4.69667 3.45067 4.50067 4 4.5H20C20.55 4.5 21.021 4.696 21.413 5.088C21.805 5.48 22.0007 5.95067 22 6.5V12.2C21.7 12.05 21.3793 11.925 21.038 11.825C20.6967 11.725 20.3507 11.65 20 11.6V8.5L12 13.5ZM12 11.5L20 6.5H4L12 11.5ZM19 23.5C17.6167 23.5 16.4377 23.0123 15.463 22.037C14.4883 21.0617 14.0007 19.8827 14 18.5C13.9993 17.1173 14.487 15.9383 15.463 14.963C16.439 13.9877 17.618 13.5 19 13.5C20.382 13.5 21.5613 13.9877 22.538 14.963C23.5147 15.9383 24.002 17.1173 24 18.5C23.998 19.8827 23.5103 21.062 22.537 22.038C21.5637 23.014 20.3847 23.5013 19 23.5ZM16 19H22V18H16V19Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_626_548">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
          Subscription
        </h1>
        <p className="text-[16px] leading-[27px]">
          You have no active subscription.
        </p>
        <Link
          href="/welcome"
          className="font-bold text-lg text-main xl:hover:underline"
        >
          Start your subscription.
        </Link>
      </div>
      {/* fifth column */}
      <div className="flex flex-col items-start gap-3 border border-[#AEAEAE] rounded-lg p-5">
        <h1 className="flex items-center gap-3 font-bold text-lg text-[#19191A]">
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.50001 0.5C7.1446 0.500115 5.80887 0.824364 4.60427 1.44569C3.39966 2.06702 2.3611 2.96742 1.57525 4.07175C0.789389 5.17609 0.279019 6.45235 0.0867177 7.79404C-0.105584 9.13574 0.0257587 10.504 0.469788 11.7846C0.913817 13.0652 1.65766 14.2211 2.63925 15.1557C3.62084 16.0904 4.81171 16.7768 6.11252 17.1576C7.41333 17.5384 8.78635 17.6026 10.117 17.3449C11.4477 17.0872 12.6975 17.515 13.762 15.676L17.414 19.328C17.6026 19.5102 17.8552 19.611 18.1174 19.6087C18.3796 19.6064 18.6304 19.5012 18.8158 19.3158C19.0012 19.1304 19.1064 18.8796 19.1087 18.6174C19.111 18.3552 19.0102 18.1026 18.828 17.914L15.176 14.262C16.164 13.0086 16.7792 11.5024 16.9511 9.91573C17.123 8.32905 16.8448 6.72602 16.1482 5.29009C15.4517 3.85417 14.3649 2.64336 13.0123 1.79623C11.6597 0.949106 10.096 0.499893 8.50001 0.5ZM2.00001 9C2.00001 7.27609 2.68483 5.62279 3.90382 4.40381C5.1228 3.18482 6.7761 2.5 8.50001 2.5C10.2239 2.5 11.8772 3.18482 13.0962 4.40381C14.3152 5.62279 15 7.27609 15 9C15 10.7239 14.3152 12.3772 13.0962 13.5962C11.8772 14.8152 10.2239 15.5 8.50001 15.5C6.7761 15.5 5.1228 14.8152 3.90382 13.5962C2.68483 12.3772 2.00001 10.7239 2.00001 9Z"
                fill="black"
              />
            </svg>
          </span>
          Recent matches
        </h1>
        <p className="text-[16px] leading-[27px]">
          All matches will be sent to your phone, but an overview of your
          matches can be found{" "}
          <Link
            href="/matches"
            className="font-bold text-[#1C46D9] xl:hover:underline"
          >
            here.
          </Link>
        </p>
      </div>
      {/* sixth column */}
      <div className="flex flex-col items-start gap-3 border border-[#AEAEAE] rounded-lg p-5">
        <h1 className="flex items-center gap-3 font-bold text-lg text-[#19191A]">
          <span>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 12.5C22 6.977 17.523 2.5 12 2.5C6.477 2.5 2 6.977 2 12.5C2 18.023 6.477 22.5 12 22.5C17.523 22.5 22 18.023 22 12.5ZM12 7.5C12.2652 7.5 12.5196 7.60536 12.7071 7.79289C12.8946 7.98043 13 8.23478 13 8.5V13.5C13 13.7652 12.8946 14.0196 12.7071 14.2071C12.5196 14.3946 12.2652 14.5 12 14.5C11.7348 14.5 11.4804 14.3946 11.2929 14.2071C11.1054 14.0196 11 13.7652 11 13.5V8.5C11 8.23478 11.1054 7.98043 11.2929 7.79289C11.4804 7.60536 11.7348 7.5 12 7.5ZM11 16.5C11 16.2348 11.1054 15.9804 11.2929 15.7929C11.4804 15.6054 11.7348 15.5 12 15.5H12.008C12.2732 15.5 12.5276 15.6054 12.7151 15.7929C12.9026 15.9804 13.008 16.2348 13.008 16.5C13.008 16.7652 12.9026 17.0196 12.7151 17.2071C12.5276 17.3946 12.2732 17.5 12.008 17.5H12C11.7348 17.5 11.4804 17.3946 11.2929 17.2071C11.1054 17.0196 11 16.7652 11 16.5Z"
                fill="black"
              />
            </svg>
          </span>
          Danger zone
        </h1>
        <p className="text-[16px] leading-[27px]">
          Delete your account and all your data permanently.
        </p>
        <Link
          href="/delete-account"
          className="font-bold text-lg text-main xl:hover:underline"
        >
          Delete account
        </Link>
      </div>
    </div>
  );
}
