/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-children-prop */
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Delete, Edit } from "@mui/icons-material";
import { RoleTitle } from "@/enums/RoleTitle";
import ReusableForm from "@/components/ReusableForm";
import Modal from "@/components/FormModal";
import {
  useCreateTeacherMutation,
  useDeleteTeacherDetailsMutation,
  useGetAllTeacherListsQuery,
  useGetSpecificTeacherDetailsQuery,
  useUpdateTeacherMutation,
} from "@/redux/features/teachers/teachers.api";
import { useGlobally } from "@/context/protected.context";
import { TeacherDTO } from "@/dtos/TeachersDTO";
import imageCompression from "browser-image-compression";
import AppLoader from "@/components/AppLoader";
import { PICTURE_URL } from "@/config/config";

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
  const { handleLoadingFalse } = useGlobally();
  const [id, setId] = useState<string>("");

  const [cerateDetails, { isLoading: createTeacherLoading }] =
    useCreateTeacherMutation();

  const { data: teacherDetails, isLoading: getTeachersDataLoading } =
    useGetAllTeacherListsQuery?.(undefined);

  const {
    data: specificTeacherDetails,
    isLoading: getSpecificTeacherDataLoading,
  } = useGetSpecificTeacherDetailsQuery(id, { skip: !id });

  const [deleteDetails, { isLoading: deleteTeacherLoading }] =
    useDeleteTeacherDetailsMutation?.(undefined);

  const [updateDetails, { isLoading: updateTeacherLoading }] =
    useUpdateTeacherMutation?.(undefined);

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

  const compressImage = async (image: File) => {
    try {
      const compressedFile = await imageCompression(image, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
      });
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      return image;
    }
  };

  const getSpecificTeachersdetails = (id: string) => {
    setId(id);
    createDetails();
  };

  const handleFormSubmit = async (data: any) => {
    try {
      // Validate and transform form data using DTO
      const teachersData = TeacherDTO.fromInputDTO(data);
      if (!teachersData) {
        throw new Error("Invalid teacher data");
      }
  
      // Prepare FormData payload
      const prepareFormData = async (teacherData: any) => {
        const formData = new FormData();
        
        formData.append("teacherName", teacherData.teacherName.trim());
        formData.append("phoneNumber", teacherData.phoneNumber.trim());
        formData.append("address", teacherData.address.trim());
        formData.append("teacherEmail", teacherData.teacherEmail.trim());
        
        if (!id && teacherData.teacherPassword) {
          formData.append("teacherPassword", teacherData.teacherPassword);
        }
  
        formData.append(
          "subject", 
          JSON.stringify(
            Array.isArray(teacherData.subject) 
              ? teacherData.subject 
              : [teacherData.subject].filter(Boolean)
        ));
        
        formData.append(
          "classList", 
          JSON.stringify(
            Array.isArray(teacherData.classList) 
              ? teacherData.classList 
              : [teacherData.classList].filter(Boolean)
          )
        );
  
        // Handle profile image if present
        if (teacherData.profileUrl instanceof File) {
          try {
            const compressedImage = await compressImage(teacherData.profileUrl);
            formData.append("profileUrl", compressedImage);
          } catch (compressError) {
            console.warn("Image compression failed, using original", compressError);
            formData.append("profileUrl", teacherData.profileUrl);
          }
        } else if (typeof teacherData.profileUrl === 'string') {
          formData.append("profileUrl", teacherData.profileUrl);
        }
  
        return formData;
      };
  
      const payloadForm = await prepareFormData(teachersData);
      if (id) {
        const response = await updateDetails({ 
          teacherDetails: payloadForm, 
          id 
        }).unwrap();
        
        if (response.status === 200) {
          closeModal();
          setId("");
        }
      } else {
        const response = await cerateDetails(payloadForm).unwrap();
        if (response.status === 200) {
          closeModal();
        }
      }
  
    } catch (error) {
      console.error("Teacher operation failed:", error);
    } finally {
      handleLoadingFalse?.();
    }
  };

  return (
    <ProtectedRoute
      allowedRoles={[
        `${RoleTitle.ADMIN}`,
        `${RoleTitle.TEACHER}`,
      ]}
      validRoutes={["/list/teacher"]}
    >
      <div className="bg-white p-4 rounded-md m-2 min-h-[100vh]">
        <ListNavbar
          title="All Teachers"
          createDetails={createDetails}
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
              <UseTable headerLists={TeacherHeader} />
              <TableBody>
                {teacherDetails?.body.length > 0 ? (
                  teacherDetails?.body
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((filterData: any) => {
                      return (
                        filterData?.teacherName
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase()) ||
                        filterData?.teacherEmail
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase())
                      );
                    })
                    .map((bodyData: any, index: any) => (
                      <TableRow key={index} className="even:bg-slate-50">
                        <TableCell>
                          <div className="flex justify-between items-center gap-4 w-full">
                            <div className="flex flex-col">
                              <span className="text-md font-light text-gray-500">
                                {bodyData.teacherName}
                              </span>
                              <span className="text-sm text-gray-500">
                                {bodyData.teacherEmail}
                              </span>
                            </div>
                            <div className="w-8 h-8">
                              {bodyData.profileUrl ? (
                                <img
                                  src={`${PICTURE_URL}Teacher/${bodyData.profileUrl}`}
                                  alt={`${bodyData.teacherName}'s photo`}
                                  className="rounded-full object-cover"
                                />
                              ) : (
                                <AccountCircleIcon className="w-8 h-8 rounded-full object-cover" />
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500 truncate">
                            {bodyData.id
                              ?.toString()
                              ?.substring(0, 10)
                              ?.concat("...")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500 truncate">
                            <TableCell>
                              <div className="text-md font-thin text-gray-500 truncate">
                                {bodyData.subject?.length
                                  ? bodyData.subject.join(", ")
                                  : "---"}
                              </div>
                            </TableCell>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500 truncate">
                            <TableCell>
                              <div className="text-md font-thin text-gray-500 truncate">
                                {bodyData.classList?.length
                                  ? bodyData.classList.join(", ")
                                  : "---"}
                              </div>
                            </TableCell>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500 truncate">
                            {bodyData.phoneNumber}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-md font-thin text-gray-500 truncate">
                            {bodyData.address}
                          </div>
                        </TableCell>
                        <TableCell className="w-[100px]">
                          <div className="flex justify-around items-center">
                            <div
                              className="w-[36px] h-[36px] bg-cyan-500 rounded-full flex justify-center items-center hover:opacity-55 cursor-pointer"
                              onClick={() =>
                                getSpecificTeachersdetails(bodyData.id)
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
            count={teacherDetails?.body?.length || 0}
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
                defaultValues={id ? { ...specificTeacherDetails?.body } : {}}
              />
            }
            title={"Teacher"}
            maxHeight="70vh"
          />
        )}
      </div>
      {(createTeacherLoading ||
        getTeachersDataLoading ||
        deleteTeacherLoading ||
        updateTeacherLoading ||
        getSpecificTeacherDataLoading) && <AppLoader />}
    </ProtectedRoute>
  );
};

export default TeachersLists;
