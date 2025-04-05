"use client";
// next
import Link from "next/link";
import { useRouter } from "next/navigation";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";

// components
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { deleteAccount } from "@/store/features/authSlice";

export default function DeleteAccount() {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleDelete = async () => {
    try {
      if (token) {
        await dispatch(deleteAccount({ token }));

        // router.push("/");

        if (typeof window !== undefined) {
          localStorage.removeItem("auth-token");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ProtectedRoutes>
      <div className="flex items-center justify-center min-h-screen bg-[#FFF7F5] px-2 py-40">
        <div className="w-full sm:w-[600px] md:w-[730px] min-h-[400px] bg-white shadow-xl rounded-lg px-2 xs:px-4 py-2 sm:p-6">
          <div className="flex flex-col gap-7 text-[#2F2F2F]">
            <h1 className="flex items-center gap-3 font-bold text-lg">
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
              Delete account
            </h1>
            <p className="text-[16px] leading-[24px]">
              Are you sure you want to delete your account and cancel all
              subscriptions? This action cannot be undone and will permanently
              remove all your data, including:
            </p>

            <ul className="list-disc ml-4 text-[16px] leading-[24px]">
              <li>Your personal information</li>
              <li>Your search queries</li>
              <li>Your saved matches</li>
              <li>Subscription details</li>
            </ul>

            <div className="flex items-center justify-between gap-2 sm:gap-8">
              <Link
                className="border border-main text-main py-2 px-4 rounded-lg flex items-center justify-center font-semibold text-md sm:text-lg w-full xl:hover:bg-main xl:hover:text-white transition-all duration-300"
                href="/dashboard"
              >
                Cancel
              </Link>
              <button
                onClick={handleDelete}
                className="bg-main border border-main py-2 px-4 rounded-lg flex items-center justify-center font-semibold text-md sm:text-lg w-full xl:hover:bg-transparent xl:hover:text-main transition-all duration-300 text-white"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  );
}
