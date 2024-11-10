"use client";

import Announcement from "@/components/Announcement";
import AttandanceChart from "@/components/AttandanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import { RoleTitle } from "@/enums/RoleTitle";
import ProtectedRoute from "@/protected.routes/protected.routes";

const AdminPage = () => {
  return (
    <ProtectedRoute
      allowedRoles={[`${RoleTitle.ADMIN}`]}
      validRoutes={[
        "/admin",
        "/admin/*",
        "/student",
        "/student/*",
        "/teacher",
        "/teacher/*",
        "/parent",
        "/parent/*",
      ]}
    >
      <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* LEFT */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {/* UERS CARD */}
          <div className="flex gap-4 justify-between flex-wrap">
            <UserCard type="student" />
            <UserCard type="teacher" />
            <UserCard type="parent" />
            <UserCard type="staff" />
          </div>
          {/* MIDDLE CHARTS */}
          <div className="flex gap-4 flex-col lg:flex-row">
            {/* COUNT CHART */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <CountChart />
            </div>
            <div className="w-full lg:w-2/3 h-[450px]">
              <AttandanceChart />
            </div>
          </div>
          {/* BOTTOM CHARTS */}
          <div className="w-full h-[450px]">
            <FinanceChart />
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full lg:w-1/3">
          <div className="flex gap-4 flex-col">
            <EventCalendar />
            <Announcement />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;
