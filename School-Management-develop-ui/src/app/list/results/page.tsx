"use client";

import ListNavbar from "@/components/ListNavbar";
import UseTable from "@/components/UseTable";
import { resultsData } from "@/lib/data";
import ProtectedRoute from "@/protected.routes/protected.routes";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { RoleTitle } from "@/enums/RoleTitle";

const ResultsHeader = [
  "Subject",
  "Classes",
  "Teacher",
  "Student",
  "Date",
  "Type",
  "Score",
  "Actions",
];

const ResultsLists = () => {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const createDetails = () => {
    setOpen(true);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ProtectedRoute
      allowedRoles={[
        `${RoleTitle.ADMIN}`,
        `${RoleTitle.STUDENT}`,
        `${RoleTitle.TEACHER}`,
        `${RoleTitle.PARENT}`,
      ]}
      validRoutes={["/list/results"]}
    >
      <div className="bg-white p-4 rounded-md m-2 min-h-[100vh]">
        <ListNavbar
          title="All Results"
          createDetails={createDetails}
          searchText={search}
          setSearch={setSearch}
        />
        <Paper className="w-full">
          <TableContainer className="w-full">
            <Table
              className="rounded-md w-full overflow-x-auto"
              aria-labelledby="tableTitle"
            >
              <UseTable headerLists={ResultsHeader} />
              <TableBody>
                {resultsData.length > 0 ? (
                  resultsData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((filterData: any) => {
                      return (
                        filterData?.subject
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase()) ||
                        filterData?.class
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase()) ||
                        filterData?.teacher
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase()) ||
                        filterData?.student
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase())
                      );
                    })
                    .map((bodyData, index) => (
                      <TableRow key={index} className="even:bg-slate-50">
                        <TableCell>
                          <div className="flex justify-start items-center gap-4 w-full">
                            <div className="flex flex-col">
                              <span className="text-md font-thin text-gray-500">
                                {bodyData.subject}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.class}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.teacher}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.student}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.date}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.type}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.score}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-around items-center">
                            <div className="w-[36px] h-[36px] bg-cyan-500 rounded-full flex justify-center items-center hover:opacity-55 cursor-pointer">
                              <Edit
                                className="text-white"
                                sx={{
                                  width: "18px",
                                  height: "18px",
                                }}
                              />
                            </div>
                            <div className="w-[36px] h-[36px] bg-cyan-700 rounded-full flex justify-center items-center cursor-pointer hover:opacity-55">
                              <Delete
                                className="text-white"
                                sx={{
                                  width: "18px",
                                  height: "18px",
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={ResultsHeader.length}>
                      <div className="flex justify-center items-center w-full text-md">
                        No Results
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={resultsData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </ProtectedRoute>
  );
};

export default ResultsLists;
