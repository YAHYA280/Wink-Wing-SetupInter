// components
import Dashboard from "@/components/Dashboard";

// components
import ProtectedRoutes from "@/components/ProtectedRoutes";

export default function DashboardPage() {
  return (
    <ProtectedRoutes>
      <Dashboard />
    </ProtectedRoutes>
  );
}
