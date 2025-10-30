// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import CustomerDashboard from "@/components/CustomerDashboard";
import ProviderDashboard from "@/components/ProviderDashboard";

type UserRole = "customer" | "provider";

const Dashboard = () => {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // get user object stored during login/signup
    const storedUser = localStorage.getItem("user");
    let storedRole: UserRole = "customer"; // default fallback

    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj.role === "provider") storedRole = "provider";
      } catch (err) {
        console.error("Invalid user data in localStorage");
      }
    } else {
      // backward compatibility: if only role stored
      const localRole = localStorage.getItem("userRole");
      if (localRole === "provider") storedRole = "provider";
    }

    setRole(storedRole);
  }, []);

  // avoid rendering until we know the role
  if (!role) return <div className="p-8 text-center">Loading dashboard...</div>;

  return role === "provider" ? <ProviderDashboard /> : <CustomerDashboard />;
};

export default Dashboard;
