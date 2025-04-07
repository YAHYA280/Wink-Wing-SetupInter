export default function DashboardInfoExpectedMatchesPerWeek({
  translationData,
}: {
  translationData?: any;
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-bold text-lg text-[#19191A]">
        {translationData?.title || "Expected matches per week"}
      </h1>
      <span className="font-bold text-[24px] leading-[29px]">690</span>
    </div>
  );
}
