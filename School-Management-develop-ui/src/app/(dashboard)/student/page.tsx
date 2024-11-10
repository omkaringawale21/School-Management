"use client";

import Announcement from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";
import EventCalendar from "@/components/EventCalendar";
import { RoleTitle } from "@/enums/RoleTitle";
import ProtectedRoute from "@/protected.routes/protected.routes";
import "react-big-calendar/lib/css/react-big-calendar.css";

const StudentPage = () => {
  return (
    <ProtectedRoute
      allowedRoles={[`${RoleTitle.ADMIN}`, `${RoleTitle.STUDENT}`]}
      validRoutes={["/student", "/student/*"]}
    >
      <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* LEFT */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          <div className="h-full bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold">Schedule (4A)</h1>
            <BigCalendar />
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

export default StudentPage;
