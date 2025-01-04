"use client";

import { TableHead, TableCell, TableRow } from "@mui/material";
import React from "react";

interface UseTableProps {
  headerLists: string[];
}

const UseTable = ({ headerLists }: UseTableProps) => {
  return (
    <TableHead>
      <TableRow>
        {headerLists?.length &&
          headerLists
            ?.slice(0, headerLists.length - 1)
            ?.map((header: string, index: number) => {
              return (
                <TableCell
                  className="md:min-w-[200px] bg-slate-100"
                  key={index}
                >
                  <div className="text-md font-semibold text-gray-600">
                    {header}
                  </div>
                </TableCell>
              );
            })}
        {headerLists?.length &&
          headerLists
            ?.slice(headerLists.length - 1)
            ?.map((header: string, index: number) => {
              if (header.toString() === "Actions") {
                return (
                  <TableCell className="bg-slate-100" key={index}>
                    <div className="text-md font-semibold text-gray-600 w-[100px]">
                      {header}
                    </div>
                  </TableCell>
                );
              }
            })}
      </TableRow>
    </TableHead>
  );
};

export default UseTable;
