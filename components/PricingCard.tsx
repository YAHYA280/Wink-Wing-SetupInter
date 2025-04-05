export default function PricingCard({
  id,
  month,
  price,
  handleSelect,
  selectedOption,
}: {
  id: number;
  month: string;
  price: string;
  handleSelect: (id: number) => void;
  selectedOption: number;
}) {
  return (
    <div
      onClick={() => handleSelect(id)}
      className={`flex items-center justify-between bg-[#F8F8F8] rounded-[10px] border p-5 w-full ${
        selectedOption == id && "border-main"
      }`}
    >
      <h1 className="flex flex-col sm:flex-row items-center gap-3 font-bold text-[#19191A] text-lg">
        <span className="flex items-center gap-3">
          {selectedOption == id && (
            <span>
              <svg
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_69_6551)">
                  <path
                    d="M21.33 12.59C21.33 7.6194 17.3005 3.58997 12.33 3.58997C7.35939 3.58997 3.32996 7.6194 3.32996 12.59C3.32996 17.5605 7.35939 21.59 12.33 21.59C17.3005 21.59 21.33 17.5605 21.33 12.59Z"
                    fill="white"
                  />
                  <path
                    d="M21.33 12.59C21.33 7.6194 17.3005 3.58997 12.33 3.58997C7.35939 3.58997 3.32996 7.6194 3.32996 12.59C3.32996 17.5605 7.35939 21.59 12.33 21.59C17.3005 21.59 21.33 17.5605 21.33 12.59Z"
                    stroke="#F45D48"
                    strokeWidth="6"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_69_6551">
                    <rect
                      width="24"
                      height="25"
                      fill="white"
                      transform="translate(0.329956 0.0899658)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
          )}
          {month}
        </span>
        {id == 2 && (
          <div className="bg-[#F45D4833] px-4 py-2 rounded-[160px]">
            <h3 className="text-main font-bold text-[14px] leading-[14px]">
              Most chosen
            </h3>
          </div>
        )}
      </h1>
      <div className="flex flex-col sm:flex-row items-center gap-1 text-[15px] text-[#19191A]">
        {id == 2 && (
          <span className="text-[#0A806C] font-bold text-[14px] mr-2">
            Save 33%
          </span>
        )}
        {id == 3 && (
          <span className="text-[#0A806C] font-bold text-[14px] mr-2">
            Save 44%
          </span>
        )}
        <h3 className="font-bold">
          <span className="text-2xl">{price.slice(0, 3)}</span>
          {price.slice(3)}
          p/m
        </h3>
      </div>
    </div>
  );
}
