"use client";

import React, { useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "@/lib/data";

const BigCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleChangeView = (selectedView: View) => {
    setView(selectedView);
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "98%" }}
        view={view}
        views={["work_week", "day"]}
        onView={handleChangeView}
        min={new Date(2025, 1, 0, 8, 0, 0)}
        max={new Date(2025, 1, 0, 17, 0, 0)}
      />
    </div>
  );
};

export default BigCalendar;
