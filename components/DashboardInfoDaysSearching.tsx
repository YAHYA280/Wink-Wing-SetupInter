export default function DashboardInfoDaysSearching({
  translationData,
}: {
  translationData?: any;
}) {
  return (
    <div className="flex flex-col gap-4 w-full  border-b pb-10 md:border-b-0 md:border-r md:pb-0 border-[#AEAEAE]">
      <h1 className="font-bold text-lg text-[#19191A]">
        {translationData?.title || "Days searching"}
      </h1>
      <span className="font-bold text-[24px] leading-[29px]">
        0 {translationData?.searching || "days"}
      </span>
    </div>
  );
}
