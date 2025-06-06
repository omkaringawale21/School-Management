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
import ReusableForm from "@/components/ReusableForm";
import Modal from "@/components/FormModal";
import {
  useGetAllParentsListsQuery,
  useCreateParentMutation,
  useDeleteParentMutation,
  useGetSpecificParentDetailsQuery,
  useUpdateParentMutation,
} from "@/redux/features/parents/parents.api";
import { ParentsDTO } from "@/dtos/ParentsDTO";
import AppLoader from "@/components/AppLoader";

const ParentsHeader = ["Info", "Students", "Phone", "Address", "Actions"];

const ParentsLists = () => {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [id, setId] = useState<string>("");

  const { data: parentDetails, isLoading: getParentsDataLoading } =
    useGetAllParentsListsQuery?.(undefined);

  const [cerateDetails, { isLoading: createParentLoading }] =
    useCreateParentMutation();

  const [deleteDetails, { isLoading: deleteParentLoading }] =
    useDeleteParentMutation();

  const {
    data: specificParentDetails,
    isLoading: getSpecificParentDataLoading,
  } = useGetSpecificParentDetailsQuery(id, { skip: !id });

  const [updateDetails, { isLoading: updateParentLoading }] =
    useUpdateParentMutation?.(undefined);

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

  const getSpecificParentDetails = (id: string) => {
    setId(id);
    createDetails();
  };

  const handleFormSubmit = async (data: any) => {
    if (Object.keys(data).length) {
      const parentData = ParentsDTO.fromInputDTO(data);
      if (!parentData) {
        throw new Error("Invalid parent data");
      }

      if (id) {
        const response = await updateDetails({
          parentsDetails: data,
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
    }
  };

  return (
    <ProtectedRoute
      allowedRoles={[`${RoleTitle.ADMIN}`, `${RoleTitle.PARENT}`]}
      validRoutes={["/list/parent"]}
    >
      <div className="bg-white p-4 rounded-md m-2 min-h-[100vh]">
        <ListNavbar
          title="All Parents"
          createDetails={() => {
            createDetails();
            setId("");
          }}
          searchText={search}
          setSearch={setSearch}
          setId={setId}
        />
        <Paper className="w-full">
          <TableContainer className="w-full">
            <Table
              className="rounded-md w-full overflow-x-auto"
              aria-labelledby="tableTitle"
            >
              <UseTable headerLists={ParentsHeader} />
              <TableBody>
                {parentDetails?.body?.length > 0 ? (
                  parentDetails?.body
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
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.students.studentName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.phoneNumber}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500">
                            {bodyData.address}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-around items-center">
                            <div
                              className="w-[36px] h-[36px] bg-cyan-500 rounded-full flex justify-center items-center hover:opacity-55 cursor-pointer"
                              onClick={() =>
                                getSpecificParentDetails(bodyData.id)
                              }
                            >
                              <Edit
                                className="text-white"
                                sx={{
                                  width: "18px",
                                  height: "18px",
                                }}
                              />
                            </div>
                            <div
                              className="w-[36px] h-[36px] bg-cyan-700 rounded-full flex justify-center items-center cursor-pointer hover:opacity-55"
                              onClick={() => {
                                deleteDetails(bodyData?.id);
                              }}
                            >
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
                    <TableCell colSpan={ParentsHeader.length}>
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
            count={parentDetails?.data?.length}
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
                entity="Parent"
                onSubmit={handleFormSubmit}
                handleClose={closeModal}
                defaultValues={id ? { ...specificParentDetails?.body } : {}}
              />
            }
            title={"Student"}
          />
        )}
      </div>
      {(getParentsDataLoading ||
        createParentLoading ||
        deleteParentLoading ||
        getSpecificParentDataLoading ||
        updateParentLoading) && <AppLoader />}
    </ProtectedRoute>
  );
};

export default ParentsLists;
