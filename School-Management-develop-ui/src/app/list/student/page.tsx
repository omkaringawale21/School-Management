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
  useCreateStudentMutation,
  useDeleteStudentDetailsMutation,
  useGetAllStudentListsQuery,
  useGetSpecificStudentDetailsQuery,
  useUpdateStudentMutation,
} from "@/redux/features/students/students.api";
import { useGlobally } from "@/context/protected.context";
import { StudentDTO } from "@/dtos/StudentsDTO";
import imageCompression from "browser-image-compression";
import AppLoader from "@/components/AppLoader";
import { PICTURE_URL } from "@/config/config";

const StudentHeader = [
  "Info",
  "Students ID",
  "Subjects",
  "Classes",
  "Phone",
  "Address",
  "Actions",
];

const StudentLists = () => {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const { handleLoadingFalse } = useGlobally();
  const [id, setId] = useState<string>("");

  const [cerateDetails, { isLoading: createStudentLoading }] =
    useCreateStudentMutation();

  const { data: studentDetails, isLoading: getStudentsDataLoading } =
    useGetAllStudentListsQuery?.(undefined);

  const {
    data: specificStudentDetails,
    isLoading: getSpecificStudentDataLoading,
  } = useGetSpecificStudentDetailsQuery(id, { skip: !id });

  const [deleteDetails, { isLoading: deleteStudentLoading }] =
    useDeleteStudentDetailsMutation?.(undefined);

  const [updateDetails, { isLoading: updateStudentLoading }] =
    useUpdateStudentMutation?.(undefined);

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

  const getSpecificStudentDetails = (id: string) => {
    setId(id);
    createDetails();
  };

  const handleFormSubmit = async (data: any) => {
    try {
      // Validate and transform form data using DTO
      const studentsData = StudentDTO.fromInputDTO(data);
      if (!studentsData) {
        throw new Error("Invalid student data");
      }

      // Prepare FormData payload
      const prepareFormData = async (studentData: any) => {
        const formData = new FormData();

        formData.append("studentName", studentData.studentName.trim());
        formData.append("phoneNumber", studentData.phoneNumber.trim());
        formData.append("address", studentData.address.trim());
        formData.append("studentEmail", studentData.studentEmail.trim());

        if (!id && studentData.studentPassword) {
          formData.append("studentPassword", studentData.studentPassword);
        }

        formData.append(
          "subject",
          JSON.stringify(
            Array.isArray(studentData.subject)
              ? studentData.subject
              : [studentData.subject].filter(Boolean)
          )
        );

        formData.append(
          "classList",
          JSON.stringify(
            Array.isArray(studentData.classList)
              ? studentData.classList
              : [studentData.classList].filter(Boolean)
          )
        );

        // Handle profile image if present
        if (studentData.profileUrl instanceof File) {
          try {
            const compressedImage = await compressImage(studentData.profileUrl);
            formData.append("profileUrl", compressedImage);
          } catch (compressError) {
            console.warn(
              "Image compression failed, using original",
              compressError
            );
            formData.append("profileUrl", studentData.profileUrl);
          }
        } else if (typeof studentData.profileUrl === "string") {
          formData.append("profileUrl", studentData.profileUrl);
        }

        return formData;
      };

      const payloadForm = await prepareFormData(studentsData);
      if (id) {
        const response = await updateDetails({
          studentDetails: payloadForm,
          id,
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
      console.error("Student operation failed:", error);
    } finally {
      handleLoadingFalse?.();
    }
  };

  return (
    <ProtectedRoute
      allowedRoles={[`${RoleTitle.ADMIN}`, `${RoleTitle.STUDENT}`]}
      validRoutes={["/list/student"]}
    >
      <div className="bg-white p-4 rounded-md m-2 min-h-[100vh]">
        <ListNavbar
          title="All Students"
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
              <UseTable headerLists={StudentHeader} />
              <TableBody>
                {studentDetails?.body.length > 0 ? (
                  studentDetails?.body
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((filterData: any) => {
                      return (
                        filterData?.studentName
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase()) ||
                        filterData?.studentEmail
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
                                {bodyData.studentName}
                              </span>
                              <span className="text-sm text-gray-500">
                                {bodyData.studentEmail}
                              </span>
                            </div>
                            <div className="w-8 h-8">
                              {bodyData.profileUrl ? (
                                <img
                                  src={`${PICTURE_URL}Student/${bodyData.profileUrl}`}
                                  alt={`${bodyData.studentName}'s photo`}
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
                                getSpecificStudentDetails(bodyData.id)
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
                    <TableCell colSpan={StudentHeader.length}>
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
            count={studentDetails?.body?.length || 0}
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
                entity="Student"
                onSubmit={handleFormSubmit}
                handleClose={closeModal}
                defaultValues={id ? { ...specificStudentDetails?.body } : {}}
              />
            }
            title={"Student"}
            maxHeight="70vh"
          />
        )}
      </div>
      {(createStudentLoading ||
        getStudentsDataLoading ||
        deleteStudentLoading ||
        updateStudentLoading ||
        getSpecificStudentDataLoading) && <AppLoader />}
    </ProtectedRoute>
  );
};

export default StudentLists;
