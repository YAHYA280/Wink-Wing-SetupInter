// components
import DashboardInfoNotifications from "./DashboardInfoNotifications";
import DashboardInfoSearch from "./DashboardInfoSearch";
import DashboardInfoExpectedMatchesPerWeek from "./DashboardInfoExpectedMatchesPerWeek";
import DashboardInfoDaysSearching from "./DashboardInfoDaysSearching";
import DashboardInfoViewingRes from "./DashboardInfoViewingRes";
import DashboardInfoMovingGuide from "./DashboardInfoMovingGuide";

export default function DashboardInfo({
  
  translationData,
}: {
  translationData?: any;
}) {

  console.log("This is the data of dashboard", translationData);
  
  // Fix: Access the nested DashboardInfo object if it exists
  const dashboardTranslations = translationData?.DashboardInfo || {};

  console.log("this is  dashboardTranslations", dashboardTranslations.Notifications)

  return (
    <div className="border border-[#AEAEAE] py-4 px-5 rounded-lg w-full">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row border-b border-[#aeaeae] pb-10">
          <DashboardInfoNotifications
            translationData={dashboardTranslations.Notifications}
          />
          <DashboardInfoSearch translationData={dashboardTranslations.SearchBuddy} />
          <DashboardInfoExpectedMatchesPerWeek
            translationData={dashboardTranslations.ExpectedMatchesPerWeek}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row pb-10">
          <DashboardInfoDaysSearching
            translationData={dashboardTranslations.DaysSearching}
          />
          <DashboardInfoViewingRes
            translationData={dashboardTranslations.StandardViewingResponse}
          />
          <DashboardInfoMovingGuide
            translationData={dashboardTranslations.MovingGuide}
          />
        </div>
      </div>
    </div>
  );
}
