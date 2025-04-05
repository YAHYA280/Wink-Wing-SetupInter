// components
import TrialMessage from "./TrialMessage";
import DashboardInfo from "./DashboardInfo";
import DashboardMenu from "./DashboardMenu";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center gap-[60px] py-[150px] px-2 w-full md:px-20 xl:px-40 xxl:px-[300px]">
      <TrialMessage />
      <DashboardInfo />
      <DashboardMenu />
    </div>
  );
}
