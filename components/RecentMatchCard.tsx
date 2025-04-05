// next
import Link from "next/link";

// types
import { RecentMatches } from "@/types/types";

// utils
import { formatDate } from "@/utils/formatDate";

interface RecentMatchCardProps {
  match: RecentMatches;
}

export default function RecentMatchCard({ match }: RecentMatchCardProps) {
  const formattedDate = formatDate(match.found);

  return (
    <div className="flex flex-col sm:w-[380px] relative">
      <div>
        {match.images.length ? (
          <img
            className="w-[380px] h-[192px] object-cover rounded-t-lg"
            src={match.images[0]}
            alt="Image of Match"
          />
        ) : (
          <div className="w-[380px] h-[192px] bg-[#e5e5e5] font-medium flex items-center justify-center text-lg uppercase rounded-t-lg">
            no image
          </div>
        )}
        <button className="absolute right-3 top-3">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.47913 3.07401C8.36419 2.92321 9.27181 2.97296 10.1351 3.21958C10.9984 3.46621 11.7953 3.90343 12.4671 4.49901L12.5041 4.53201L12.5381 4.50201C13.1793 3.93931 13.9331 3.51981 14.7493 3.27149C15.5655 3.02318 16.4252 2.95177 17.2711 3.06201L17.5171 3.09801C18.5834 3.28212 19.5801 3.75117 20.4016 4.45548C21.2231 5.1598 21.8388 6.07316 22.1836 7.09885C22.5283 8.12454 22.5893 9.22437 22.36 10.2819C22.1307 11.3394 21.6197 12.3152 20.8811 13.106L20.7011 13.291L20.6531 13.332L13.2031 20.711C13.0312 20.8812 12.8034 20.9832 12.562 20.9983C12.3206 21.0134 12.0819 20.9405 11.8901 20.793L11.7961 20.711L4.30313 13.289C3.50935 12.5167 2.94483 11.5397 2.67209 10.4663C2.39935 9.39287 2.42903 8.26491 2.75785 7.20733C3.08666 6.14974 3.70179 5.20381 4.53509 4.47428C5.36839 3.74476 6.38735 3.26011 7.47913 3.07401Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-2 bg-[#F8F8F8] py-3 px-6 rounded-b-lg max-w-[381px] min-h-[230px]">
        <div className="flex items-center justify-between">
          <a
            href={match.link}
            target="_blank"
            className="font-bold text-lg leading-[20px] text-main xl:hover:underline"
          >
            {match.title}
          </a>
          <div className="flex items-center justify-between gap-2">
            <span>
              <svg
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 0.21814C4.17392 0.21814 2.90215 0.684951 1.96447 1.51588C1.02678 2.34681 0.5 3.47379 0.5 4.6489C0.5 7.63967 4.90625 11.0181 5.09375 11.1621C5.20696 11.2479 5.35103 11.2951 5.5 11.2951C5.64897 11.2951 5.79304 11.2479 5.90625 11.1621C6.125 11.0181 10.5 7.63967 10.5 4.6489C10.5 3.47379 9.97322 2.34681 9.03553 1.51588C8.09785 0.684951 6.82608 0.21814 5.5 0.21814ZM5.5 9.99351C4.16875 8.88582 1.75 6.49874 1.75 4.6489C1.75 3.76757 2.14509 2.92233 2.84835 2.29913C3.55161 1.67594 4.50544 1.32583 5.5 1.32583C6.49456 1.32583 7.44839 1.67594 8.15165 2.29913C8.85491 2.92233 9.25 3.76757 9.25 4.6489C9.25 6.49874 6.83125 8.89135 5.5 9.99351ZM5.5 2.43352C5.00555 2.43352 4.5222 2.56345 4.11107 2.80688C3.69995 3.05031 3.37952 3.3963 3.1903 3.80111C3.00108 4.20592 2.95157 4.65136 3.04804 5.0811C3.1445 5.51084 3.3826 5.90559 3.73223 6.21541C4.08186 6.52524 4.52732 6.73623 5.01227 6.82171C5.49723 6.9072 5.99989 6.86332 6.45671 6.69565C6.91352 6.52797 7.30397 6.24402 7.57867 5.8797C7.85338 5.51538 8 5.08706 8 4.6489C8 4.06135 7.73661 3.49785 7.26777 3.08239C6.79893 2.66693 6.16304 2.43352 5.5 2.43352ZM5.5 5.75659C5.25277 5.75659 5.0111 5.69163 4.80554 5.56991C4.59998 5.4482 4.43976 5.2752 4.34515 5.0728C4.25054 4.87039 4.22579 4.64767 4.27402 4.4328C4.32225 4.21793 4.4413 4.02056 4.61612 3.86565C4.79093 3.71073 5.01366 3.60524 5.25614 3.56249C5.49861 3.51975 5.74995 3.54169 5.97835 3.62553C6.20676 3.70937 6.40199 3.85134 6.53934 4.0335C6.67669 4.21566 6.75 4.42982 6.75 4.6489C6.75 4.94268 6.6183 5.22442 6.38388 5.43216C6.14946 5.63989 5.83152 5.75659 5.5 5.75659Z"
                  fill="black"
                />
              </svg>
            </span>
            <h3 className="text-[16px] text-[#466FFF] first-letter:uppercase">
              {match?.area}
            </h3>
          </div>
        </div>
        <div>
          <span className="font-bold text-lg">€{match.price}</span> /{" "}
          <span className="font-bold text-lg text-[#707070]">month</span>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="flex items-center gap-1 font-semibold">
            <span>{match.floorspace}</span>
            <span>m&sup2;</span>
          </h3>

          {match.bedrooms && (
            <h3 className="font-semibold">/ {match.bedrooms} bedrooms</h3>
          )}
        </div>
        <div>
          <h3 className="text-[16px] text-[#707070]">On {formattedDate}</h3>
        </div>
        <Link
          className="flex items-end justify-end bg-main border border-main py-2 text-white rounded-lg font-semibold xl:hover:bg-transparent xl:hover:text-main transition-all duration-300 px-5 w-max"
          href={`/matches/${match.id}`}
        >
          View match
        </Link>
      </div>
    </div>
  );
}
