"use client";

import Image from "next/image";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  {
    name: "Mon",
    present: 10,
    absent: 2,
    amt: 12,
  },
  {
    name: "Tue",
    present: 9,
    absent: 5,
    amt: 14,
  },
  {
    name: "Wed",
    present: 8,
    absent: 9,
    amt: 17,
  },
  {
    name: "Thu",
    present: 12,
    absent: 2,
    amt: 14,
  },
  {
    name: "Fri",
    present: 13,
    absent: 6,
    amt: 19,
  },
];

const AttandanceChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src={"/moreDark.png"} alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="w-full h-[100%] relative mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart className="w-full h-full" data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
                paddingBottom: "40px",
                textTransform: "capitalize",
              }}
            />
            <Bar
              dataKey="absent"
              fill="#fae27c"
              activeBar={<Rectangle fill="#fae58c" stroke="#fae58c" />}
              legendType="circle"
            />
            <Bar
              dataKey="present"
              fill="#c3ebfa"
              activeBar={<Rectangle fill="#cdecf7" stroke="#cdecf7" />}
              legendType="circle"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttandanceChart;
