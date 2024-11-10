"use client";

import Image from "next/image";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consector adipiscing elint",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consector adipiscing elint",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consector adipiscing elint",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const currentDate = new Date(Date.now());

  return (
    <div className="w-full h-full p-4 bg-white rounded-xl flex justify-center items-center flex-col gap-4">
      <Calendar
        onChange={onChange}
        value={value}
        className={"w-full h-full overflow-scroll"}
        minDate={currentDate}
      />
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image
          src={"/moreDark.png"}
          alt="calender-image"
          width={20}
          height={20}
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        {events?.map((event) => {
          return (
            <div
              className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-omkarSky even:border-t-omkarPurple"
              key={event.id}
            >
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-gray-600">{event.title}</h1>
                <span className="text-xs text-gray-400">{event.time}</span>
              </div>
              <div className="text-xs text-gray-500">{event.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
