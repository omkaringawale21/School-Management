"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { STUDENT_APIS, BASE_URL } from "@/config/config";

interface StudentsResponse {
  body?: any;
  message: string;
  status: number;
}

export const studentsApi = createApi({
  reducerPath: "studentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["studentsList"],
  endpoints: (builder) => ({
    createStudent: builder.mutation<StudentsResponse, any>({
      query: (studentDetails) => ({
        url: STUDENT_APIS.SAVE,
        method: "POST",
        headers: {
          businessPackageName: "private@school",
        },
        body: studentDetails,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 200) {
            dispatch(
              studentsApi.endpoints.getAllStudentLists?.initiate(undefined)
            ) as any;
          }
        } catch (error) {
          console.error("Error creating teacher:", error);
        }
      },
      invalidatesTags: ["studentsList"],
    }),
    getAllStudentLists: builder.query<StudentsResponse, any>({
      query: () => ({
        url: STUDENT_APIS.ALL,
        method: "GET",
        headers: {
          businessPackageName: "private@school",
        },
        invalidatesTags: ["studentsList"],
      }),
    }),
    getSpecificStudentDetails: builder.query<StudentsResponse, any>({
      query: (id) => ({
        url: STUDENT_APIS.GET(id),
        method: "GET",
        headers: {
          businessPackageName: "private@school",
        },
        invalidatesTags: ["studentsList"],
      }),
    }),
    deleteStudentDetails: builder.mutation<StudentsResponse, any>({
      query: (id) => ({
        url: STUDENT_APIS.DELETE(id),
        method: "DELETE",
        headers: {
          businessPackageName: "private@school",
        },
        body: {},
      }),
      invalidatesTags: ["studentsList"],
    }),
    updateStudent: builder.mutation<
      StudentsResponse,
      { studentDetails: any; id: string }
    >({
      query: ({ studentDetails, id }) => ({
        url: STUDENT_APIS.UPDATE(id),
        method: "PUT",
        headers: {
          businessPackageName: "private@school",
        },
        body: studentDetails,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 200) {
            dispatch(
              studentsApi.endpoints.getAllStudentLists?.initiate(undefined)
            ) as any;
          }
        } catch (error) {
          console.error("Error update teacher:", error);
        }
      },
      invalidatesTags: ["studentsList"],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useDeleteStudentDetailsMutation,
  useGetAllStudentListsQuery,
  useGetSpecificStudentDetailsQuery,
  useUpdateStudentMutation,
} = studentsApi;
