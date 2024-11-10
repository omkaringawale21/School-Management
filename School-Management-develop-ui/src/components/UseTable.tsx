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
          headerLists?.map((header: string, index: number) => {
            return (
              <TableCell
                className="md:min-w-[150px] w-full bg-slate-100"
                key={index}
              >
                <div className="text-md font-semibold text-gray-600">{header}</div>
              </TableCell>
            );
          })}
      </TableRow>
    </TableHead>
  );
};

export default UseTable;
