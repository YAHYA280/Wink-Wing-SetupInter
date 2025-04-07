// components
import DashboardLeftMenu from "./DashboardLeftMenu";
import DashboardRightMenu from "./DashboardRightMenu";

export default function DashboardMenu({
  translationData,
}: {
  translationData?: any;
}) {
  console.log(
    "hahia tanslation data oject a yahya",
    translationData?.DashboardServices
  );
  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr] lg:grid-cols-[2fr,1fr] gap-[50px]">
        <DashboardLeftMenu
          translationData={translationData?.DashboardMovingGuide}
        />
        <DashboardRightMenu
          translationData={translationData.DashboardServices}
        />
      </div>
    </div>
  );
}
