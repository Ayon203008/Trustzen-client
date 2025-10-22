import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import DashboardSidebar from "./DashboardSide";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {

    navigate("add-service");
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
