import React from "react";
import { Outlet } from "react-router"; // This is where nested routes will render
import DashboardSidebar from "./DashboardSide";


const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
    <DashboardSidebar></DashboardSidebar>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
