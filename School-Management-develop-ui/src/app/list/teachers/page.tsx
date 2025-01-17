/* eslint-disable react/no-children-prop */
"use client";

import ListNavbar from "@/components/ListNavbar";
import UseTable from "@/components/UseTable";
import { teachersData } from "@/lib/data";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Delete, Edit } from "@mui/icons-material";
import { RoleTitle } from "@/enums/RoleTitle";
import ReusableForm from "@/components/ReusableForm";
import Modal from "@/components/FormModal";
import { useCreateTeacherMutation } from "@/redux/features/teachers/teachers.api";
import { useGlobally } from "@/context/protected.context";
import TeachersDTO from "@/dtos/TeachersDTO";

const TeacherHeader = [
  "Info",
  "Teachers ID",
  "Subjects",
  "Classes",
  "Phone",
  "Address",
  "Actions",
];

const TeachersLists = () => {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const { handleLoadingFalse, handleLoadingTrue } = useGlobally();

  const [
    cerateDetails,
    { isLoading: createTeacherLoading, data: teacherInfo },
  ] = useCreateTeacherMutation();

  console.log("Teacher Details ==>> ", teacherInfo);

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

  const handleFormSubmit = async (data: any) => {
    handleLoadingTrue?.();
    try {
      const teachersData = TeachersDTO.fromJSON(data);
      console.log(teachersData.teacherName);
      if (teachersData) {
        const response = await cerateDetails({
          address: teachersData.address,
          classList: teachersData.classList,
          phone: teachersData.phone,
          subject: teachersData.subject,
          teacherId: teachersData.teacherId,
          teacherName: teachersData.teacherName,
          profilePhoto: teachersData.profilePhoto,
        }).unwrap();

        console.log("Teachers ==>> ", response);
      }
    } catch (error) {
      console.log("Teachers Registration failture ==>> ", error);
    } finally {
      handleLoadingFalse?.();
    }
    // for (let [key, value] of data.entries()) {
    //   console.log(key, value);
    // }
  };

  return (
    <ProtectedRoute
      allowedRoles={[
        `${RoleTitle.ADMIN}`,
        `${RoleTitle.STUDENT}`,
        `${RoleTitle.TEACHER}`,
        `${RoleTitle.PARENT}`,
      ]}
      validRoutes={["/list/teachers"]}
    >
      <div className="bg-white p-4 rounded-md m-2 min-h-[100vh]">
        <ListNavbar
          title="All Teachers"
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
              <UseTable headerLists={TeacherHeader} />
              <TableBody>
                {teachersData.length > 0 ? (
                  teachersData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((filterData: any) => {
                      return (
                        filterData?.name
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase()) ||
                        filterData?.email
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
                                {bodyData.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                {bodyData.email}
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
                            {bodyData.teacherId}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.subjects?.join(", ")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.classes?.join(", ")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.address}
                          </div>
                        </TableCell>
                        <TableCell className="w-[100px]">
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
                    <TableCell colSpan={TeacherHeader.length}>
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
            count={teachersData.length}
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
            children={
              <ReusableForm
                entity="Teacher"
                onSubmit={handleFormSubmit}
                handleClose={closeModal}
              />
            }
            title={"Teacher"}
            maxHeight="70vh"
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default TeachersLists;
