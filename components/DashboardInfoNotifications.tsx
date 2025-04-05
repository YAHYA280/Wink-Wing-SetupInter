"use client";
// next
import { useRouter } from "next/navigation";

// context
import { useProgress } from "@/context/progressContext";

// redux
import { useAppSelector } from "@/store/hooks/hooks";

export default function DashboardInfoNotifications() {
  const router = useRouter();
  const { goTo } = useProgress();

  const { user } = useAppSelector((state) => state.auth);

  function handleNotifications() {
    router.push("/moving-guide");
    goTo(2);
  }

  return (
    <div className="flex flex-col gap-4 w-full border-b pb-10 md:border-b-0 md:border-r md:pb-0 border-[#AEAEAE]">
      <h1 className="font-bold text-lg text-[#19191A]">Notifications</h1>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between pr-4 gap-2">
          <div className="flex items-center gap-2">
            {user?.whatsappNotifications ? (
              <span>
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9.495" cy="9.45999" r="8.5" stroke="#00B67A" />
                  <path
                    d="M3.32096 9.28052C3.2724 9.3276 3.245 9.39235 3.245 9.45999C3.245 9.52763 3.2724 9.59238 3.32096 9.63947L7.44596 13.6395C7.54293 13.7335 7.69706 13.7335 7.79403 13.6395L14.669 6.9728C14.7176 6.92571 14.745 6.86096 14.745 6.79332C14.745 6.72569 14.7176 6.66094 14.669 6.61385L13.294 5.28052C13.1971 5.18648 13.0429 5.18648 12.946 5.28052L7.62 10.4451L5.04403 7.94718C4.94706 7.85315 4.79293 7.85315 4.69596 7.94718L3.32096 9.28052Z"
                    fill="#00B67A"
                    stroke="#00B67A"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : (
              <span>
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9.495" cy="9.45999" r="8.5" stroke="#FF0000" />
                  <path
                    d="M14.4035 12.4936L11.3699 9.45999L14.4035 6.42639C14.4616 6.36755 14.4942 6.28817 14.4942 6.20546C14.4942 6.12275 14.4616 6.04338 14.4035 5.98454L12.9704 4.55148C12.9118 4.4929 12.8324 4.45999 12.7495 4.45999C12.6667 4.45999 12.5872 4.4929 12.5286 4.55148L9.495 7.58508L6.46139 4.55148C6.40279 4.4929 6.32333 4.45999 6.24047 4.45999C6.15761 4.45999 6.07814 4.4929 6.01954 4.55148L4.58649 5.98454C4.5279 6.04314 4.495 6.1226 4.495 6.20546C4.495 6.28832 4.5279 6.36779 4.58649 6.42639L7.62009 9.45999L4.58649 12.4936C4.5279 12.5522 4.495 12.6317 4.495 12.7145C4.495 12.7974 4.5279 12.8768 4.58649 12.9354L6.01954 14.3685C6.07814 14.4271 6.15761 14.46 6.24047 14.46C6.32333 14.46 6.40279 14.4271 6.46139 14.3685L9.495 11.3349L12.5286 14.3685C12.5872 14.4271 12.6667 14.46 12.7495 14.46C12.8324 14.46 12.9118 14.4271 12.9704 14.3685L14.4035 12.9354C14.4621 12.8768 14.495 12.7974 14.495 12.7145C14.495 12.6317 14.4621 12.5522 14.4035 12.4936Z"
                    fill="#FF0000"
                  />
                </svg>
              </span>
            )}
            <h1 className="text-lg text-black">Whatsapp</h1>
          </div>
          <button
            onClick={handleNotifications}
            className="text-lg text-[#FF4907] xl:hover:underline"
          >
            {user?.whatsappNotifications ? "Disable" : "Enable"}
          </button>
        </div>
        <div className="flex items-center justify-between pr-4 gap-2">
          <div className="flex items-center gap-2">
            {user?.emailNotifications ? (
              <span>
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9.495" cy="9.45999" r="8.5" stroke="#00B67A" />
                  <path
                    d="M3.32096 9.28052C3.2724 9.3276 3.245 9.39235 3.245 9.45999C3.245 9.52763 3.2724 9.59238 3.32096 9.63947L7.44596 13.6395C7.54293 13.7335 7.69706 13.7335 7.79403 13.6395L14.669 6.9728C14.7176 6.92571 14.745 6.86096 14.745 6.79332C14.745 6.72569 14.7176 6.66094 14.669 6.61385L13.294 5.28052C13.1971 5.18648 13.0429 5.18648 12.946 5.28052L7.62 10.4451L5.04403 7.94718C4.94706 7.85315 4.79293 7.85315 4.69596 7.94718L3.32096 9.28052Z"
                    fill="#00B67A"
                    stroke="#00B67A"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : (
              <span>
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9.495" cy="9.45999" r="8.5" stroke="#FF0000" />
                  <path
                    d="M14.4035 12.4936L11.3699 9.45999L14.4035 6.42639C14.4616 6.36755 14.4942 6.28817 14.4942 6.20546C14.4942 6.12275 14.4616 6.04338 14.4035 5.98454L12.9704 4.55148C12.9118 4.4929 12.8324 4.45999 12.7495 4.45999C12.6667 4.45999 12.5872 4.4929 12.5286 4.55148L9.495 7.58508L6.46139 4.55148C6.40279 4.4929 6.32333 4.45999 6.24047 4.45999C6.15761 4.45999 6.07814 4.4929 6.01954 4.55148L4.58649 5.98454C4.5279 6.04314 4.495 6.1226 4.495 6.20546C4.495 6.28832 4.5279 6.36779 4.58649 6.42639L7.62009 9.45999L4.58649 12.4936C4.5279 12.5522 4.495 12.6317 4.495 12.7145C4.495 12.7974 4.5279 12.8768 4.58649 12.9354L6.01954 14.3685C6.07814 14.4271 6.15761 14.46 6.24047 14.46C6.32333 14.46 6.40279 14.4271 6.46139 14.3685L9.495 11.3349L12.5286 14.3685C12.5872 14.4271 12.6667 14.46 12.7495 14.46C12.8324 14.46 12.9118 14.4271 12.9704 14.3685L14.4035 12.9354C14.4621 12.8768 14.495 12.7974 14.495 12.7145C14.495 12.6317 14.4621 12.5522 14.4035 12.4936Z"
                    fill="#FF0000"
                  />
                </svg>
              </span>
            )}
            <h1 className="text-lg text-black">Email</h1>
          </div>
          <button
            onClick={handleNotifications}
            className={`text-lg ${
              user?.emailNotifications ? "text-[#FF4907]" : "text-[#1C46D9]"
            } xl:hover:underline`}
          >
            {user?.emailNotifications ? "Disable" : "Enable"}
          </button>
        </div>
      </div>
    </div>
  );
}
