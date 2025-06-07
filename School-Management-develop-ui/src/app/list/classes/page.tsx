"use client";

import ListNavbar from "@/components/ListNavbar";
import UseTable from "@/components/UseTable";
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
import Modal from "@/components/FormModal";
import ReusableForm from "@/components/ReusableForm";
import {
  useCreateClassMutation,
  useGetAllClassListsQuery,
  useGetSpecificClassDetailsQuery,
  useUpdateClassMutation,
  useDeleteClassMutation,
} from "@/redux/features/classes/classes.api";
import AppLoader from "@/components/AppLoader";

const ClassesHeader = [
  "Class Names",
  "Capacity",
  "Grade",
  "Supervisor",
  "Actions",
];

const ClassesLists = () => {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [id, setId] = useState<string>("");

  const [cerateDetails, { isLoading: createClassLoading }] =
    useCreateClassMutation();

  const { data: classDetails, isLoading: getClassDataLoading } =
    useGetAllClassListsQuery?.(undefined);

  const { data: specificClassDetails, isLoading: getSpecificClassDataLoading } =
    useGetSpecificClassDetailsQuery(id, { skip: !id });

  const [updateDetails, { isLoading: updateClassLoading }] =
    useUpdateClassMutation?.(undefined);

  const [deleteDetails, { isLoading: deleteClassLoading }] =
    useDeleteClassMutation?.(undefined);

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
    if (id) {
      const response = await updateDetails({
        classesDetails: data,
        id,
      }).unwrap();
      if (response.status === 200) {
        closeModal();
      }
    } else {
      const response = await cerateDetails(data).unwrap();
      if (response.status === 200) {
        closeModal();
      }
    }
  };

  const getSpecificClassDetails = (id: string) => {
    setId(id);
    createDetails();
  };

  return (
    <ProtectedRoute
      allowedRoles={[
        `${RoleTitle.ADMIN}`,
        `${RoleTitle.TEACHER}`,
        `${RoleTitle.PARENT}`,
      ]}
      validRoutes={["/list/classes"]}
    >
      <div className="bg-white p-4 rounded-md m-2 min-h-[100vh]">
        <ListNavbar
          title="All Classes"
          createDetails={() => {
            createDetails();
            setId("");
          }}
          searchText={search}
          setSearch={setSearch}
        />
        <Paper className="w-full">
          <TableContainer className="w-full">
            <Table
              className="rounded-md w-full overflow-x-auto"
              aria-labelledby="tableTitle"
            >
              <UseTable headerLists={ClassesHeader} />
              <TableBody>
                {classDetails?.body?.length > 0 ? (
                  classDetails?.body
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((filterData: any) => {
                      return (
                        filterData?.className
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase()) ||
                        filterData?.classGrade
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase()) ||
                        filterData?.classCapacity
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase()) ||
                        filterData?.classSupervisor
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
                                {bodyData.className}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.classCapacity}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.classGrade}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.classSupervisor}
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
                                onClick={() => {
                                  getSpecificClassDetails(bodyData?.id);
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
                                onClick={() => {
                                  deleteDetails(bodyData?.id);
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={ClassesHeader.length}>
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
            count={classDetails?.body?.length}
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
                entity="Class"
                onSubmit={handleFormSubmit}
                handleClose={closeModal}
                defaultValues={id ? { ...specificClassDetails?.body } : {}}
              />
            }
            title={"Class"}
          />
        )}
      </div>
      {(createClassLoading ||
        getClassDataLoading ||
        getSpecificClassDataLoading ||
        updateClassLoading ||
        deleteClassLoading) && <AppLoader />}
    </ProtectedRoute>
  );
};

export default ClassesLists;
