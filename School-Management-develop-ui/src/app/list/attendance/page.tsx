"use client";

import ListNavbar from "@/components/ListNavbar";
import UseTable from "@/components/UseTable";
import { attendancesData } from "@/lib/data";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { RoleTitle } from "@/enums/RoleTitle";
import Modal from "@/components/FormModal";
import ReusableForm from "@/components/ReusableForm";

const AttendancesHeader = [
  "Student Name",
  "Month",
  "Year",
  "Total Days",
  "Active Days",
  "Present",
  "Absent",
  "Actions",
];

const AttendanceLists = () => {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const createDetails = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
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

  const handleFormSubmit = (data: any) => {
    console.log(data);
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }
  };

  return (
    <ProtectedRoute
      allowedRoles={[
        `${RoleTitle.ADMIN}`,
        `${RoleTitle.STUDENT}`,
        `${RoleTitle.TEACHER}`,
        `${RoleTitle.PARENT}`,
      ]}
      validRoutes={["/list/attendance"]}
    >
      <div className="bg-white p-4 rounded-md m-2 min-h-[100vh]">
        <ListNavbar
          title="All Attendances"
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
              <UseTable headerLists={AttendancesHeader} />
              <TableBody>
                {attendancesData.length > 0 ? (
                  attendancesData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((filterData: any) => {
                      return filterData?.name
                        ?.toLowerCase()
                        ?.includes(search?.toLowerCase());
                    })
                    .map((bodyData, index) => (
                      <TableRow key={index} className="even:bg-slate-50">
                        <TableCell>
                          <div className="flex justify-start items-center gap-4 w-full">
                            <div className="flex flex-col">
                              <span className="text-md font-thin text-gray-500">
                                {bodyData.name}
                              </span>
                            </div>
                            <div className="w-[50px] h-[50px] overflow-hidden">
                              {bodyData.photo?.length ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={bodyData.photo}
                                  alt={`${bodyData.name}'s photo`}
                                  className="rounded-full object-cover"
                                />
                              ) : (
                                <AccountCircleIcon />
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.month}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.year}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.totalDays}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.activeDays}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.presentDays}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.absentDays}
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
                    <TableCell colSpan={AttendancesHeader.length}>
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
            count={attendancesData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
                {/* Form Modal */}
                {open && (
          <Modal
            isOpen={open}
            closeModal={closeModal}
            // eslint-disable-next-line react/no-children-prop
            children={
              <ReusableForm
                entity="Attendance"
                onSubmit={handleFormSubmit}
                handleClose={closeModal}
              />
            }
            title={"Attendance"}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default AttendanceLists;
