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
  useCreateSubjectMutation,
  useGetAllSubjectListQuery,
  useGetSpecificSubjectDetailsQuery,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} from "@/redux/features/subjects/subjects.api";
import AppLoader from "@/components/AppLoader";

const SubjectsHeader = ["Subject Name", "Teachers", "Actions"];

const SubjectsLists = () => {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [id, setId] = useState<string>("");

  const [cerateDetails, { isLoading: createSubjectLoading }] =
    useCreateSubjectMutation();

  const { data: subjectDetails, isLoading: getSubjectsDataLoading } =
    useGetAllSubjectListQuery?.(undefined);

  const {
    data: specificSubjectDetails,
    isLoading: getSpecificSubjectDataLoading,
  } = useGetSpecificSubjectDetailsQuery(id, { skip: !id });

  const [updateDetails, { isLoading: updateSubjectLoading }] =
    useUpdateSubjectMutation?.(undefined);

  const [deleteDetails, { isLoading: deleteSubjectLoading }] =
    useDeleteSubjectMutation?.(undefined);

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
        subjectDetails: data,
        id,
      }).unwrap();
      if (response.status === 200) {
        closeModal();
        setId("");
      }
    } else {
      const response = await cerateDetails(data).unwrap();
      if (response.status === 200) {
        closeModal();
      }
    }
  };

  const getSpecificSubjectDetails = (id: string) => {
    setId(id);
    createDetails();
  };

  return (
    <ProtectedRoute
      allowedRoles={[
        `${RoleTitle.ADMIN}`,
        `${RoleTitle.STUDENT}`,
        `${RoleTitle.TEACHER}`,
        `${RoleTitle.PARENT}`,
      ]}
      validRoutes={["/list/subjects"]}
    >
      <div className="bg-white p-4 rounded-md m-2 min-h-[100vh]">
        <ListNavbar
          title="All Subjects"
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
              <UseTable headerLists={SubjectsHeader} />
              <TableBody>
                {subjectDetails?.body?.length > 0 ? (
                  subjectDetails?.body
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((filterData: any) => {
                      return (
                        filterData?.subjectName
                          ?.toLowerCase()
                          .includes(search?.toLowerCase()) ||
                        filterData?.teachers?.some((teacher: string) =>
                          teacher?.toLowerCase().includes(search?.toLowerCase())
                        )
                      );
                    })
                    .map((bodyData, index) => (
                      <TableRow key={index} className="even:bg-slate-50">
                        <TableCell>
                          <div className="flex justify-start items-center gap-4 w-full">
                            <div className="flex flex-col">
                              <span className="text-md font-thin text-gray-500">
                                {bodyData.subjectName}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.teachers?.join(", ")}
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
                                onClick={() =>
                                  getSpecificSubjectDetails(bodyData?.id)
                                }
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
                    <TableCell colSpan={SubjectsHeader.length}>
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
            count={subjectDetails?.body?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {/* Form Modal */}
          {open && (
            <Modal
              isOpen={open}
              closeModal={closeModal}
              // eslint-disable-next-line react/no-children-prop
              children={
                <ReusableForm
                  entity="Subject"
                  onSubmit={handleFormSubmit}
                  handleClose={closeModal}
                  defaultValues={id ? { ...specificSubjectDetails?.body } : {}}
                />
              }
              title={"Subject"}
            />
          )}
        </Paper>
      </div>
      {(createSubjectLoading ||
        getSubjectsDataLoading ||
        updateSubjectLoading ||
        deleteSubjectLoading ||
        getSpecificSubjectDataLoading) && <AppLoader />}
    </ProtectedRoute>
  );
};

export default SubjectsLists;
