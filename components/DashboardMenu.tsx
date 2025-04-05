// components
import DashboardLeftMenu from "./DashboardLeftMenu";
import DashboardRightMenu from "./DashboardRightMenu";

export default function DashboardMenu() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr] lg:grid-cols-[2fr,1fr] gap-[50px]">
        <DashboardLeftMenu />
        <DashboardRightMenu />
      </div>
    </div>
  );
}
