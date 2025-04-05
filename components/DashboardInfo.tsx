// components
import DashboardInfoNotifications from "./DashboardInfoNotifications";
import DashboardInfoSearch from "./DashboardInfoSearch";
import DashboardInfoExpectedMatchesPerWeek from "./DashboardInfoExpectedMatchesPerWeek";
import DashboardInfoDaysSearching from "./DashboardInfoDaysSearching";
import DashboardInfoViewingRes from "./DashboardInfoViewingRes";
import DashboardInfoMovingGuide from "./DashboardInfoMovingGuide";

export default function DashboardInfo() {
  return (
    <div className="border border-[#AEAEAE] py-4 px-5 rounded-lg w-full">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row border-b border-[#aeaeae] pb-10">
          <DashboardInfoNotifications />
          <DashboardInfoSearch />
          <DashboardInfoExpectedMatchesPerWeek />
        </div>
        <div className="flex flex-col gap-4 md:flex-row pb-10">
          <DashboardInfoDaysSearching />
          <DashboardInfoViewingRes />
          <DashboardInfoMovingGuide />
        </div>
      </div>
    </div>
  );
}
