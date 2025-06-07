"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TEACHER_APIS, BASE_URL } from "@/config/config";

interface TeachersResponse {
  body?: any;
  message: string;
  status: number;
}

export const teachersApi = createApi({
  reducerPath: "teachersApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["teachersList"],
  endpoints: (builder) => ({
    createTeacher: builder.mutation<TeachersResponse, any>({
      query: (teacherDetails) => ({
        url: TEACHER_APIS.SAVE,
        method: "POST",
        headers: {
          businessPackageName: "private@school",
        },
        body: teacherDetails,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 200) {
            dispatch(
              teachersApi.endpoints.getAllTeacherLists?.initiate(undefined)
            ) as any;
          }
        } catch (error) {
          console.error("Error creating teacher:", error);
        }
      },
      invalidatesTags: ["teachersList"],
    }),
    getAllTeacherLists: builder.query<TeachersResponse, any>({
      query: () => ({
        url: TEACHER_APIS.ALL,
        method: "GET",
        headers: {
          businessPackageName: "private@school",
        },
        providedTags: ["teachersList"],
      }),
    }),
    getSpecificTeacherDetails: builder.query<TeachersResponse, any>({
      query: (id) => ({
        url: TEACHER_APIS.GET(id),
        method: "GET",
        headers: {
          businessPackageName: "private@school",
        },
        invalidatesTags: ["teachersList"],
      }),
    }),
    deleteTeacherDetails: builder.mutation<TeachersResponse, any>({
      query: (id) => ({
        url: TEACHER_APIS.DELETE(id),
        method: "DELETE",
        headers: {
          businessPackageName: "private@school",
        },
        body: {},
      }),
      invalidatesTags: ["teachersList"],
    }),
    updateTeacher: builder.mutation<TeachersResponse, { teacherDetails: any; id: string }>({
      query: ({ teacherDetails, id }) => ({
        url: TEACHER_APIS.UPDATE(id),
        method: "PUT",
        headers: {
          businessPackageName: "private@school",
        },
        body: teacherDetails,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 200) {
            dispatch(
              teachersApi.endpoints.getAllTeacherLists?.initiate(undefined)
            ) as any;
          }
        } catch (error) {
          console.error("Error update teacher:", error);
        }
      },
      invalidatesTags: ["teachersList"],
    }),
  }),
});

export const {
  useCreateTeacherMutation,
  useGetAllTeacherListsQuery,
  useGetSpecificTeacherDetailsQuery,
  useDeleteTeacherDetailsMutation,
  useUpdateTeacherMutation,
} = teachersApi;
