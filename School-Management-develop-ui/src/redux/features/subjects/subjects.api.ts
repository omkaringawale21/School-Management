"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SUBJECT_APIS, BASE_URL } from "@/config/config";

interface SubjectResponse {
  body?: any;
  message: string;
  status: number;
}

export const subjectsApi = createApi({
  reducerPath: "subjectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["subjectsList"],
  endpoints: (builder) => ({
    createSubject: builder.mutation<SubjectResponse, any>({
      query: (subjectDetails) => ({
        url: SUBJECT_APIS.SAVE,
        method: "POST",
        headers: {
          businessPackageName: "private@school",
        },
        body: subjectDetails,
      }),
      invalidatesTags: ["subjectsList"],
    }),
    getAllSubjectList: builder.query<SubjectResponse, any>({
      query: () => ({
        url: SUBJECT_APIS.ALL,
        method: "GET",
        headers: {
          businessPackageName: "private@school",
        },
      }),
      providedTags: ["subjectsList"],
    }),
    getSpecificSubjectDetails: builder.query<SubjectResponse, any>({
      query: (id) => ({
        url: SUBJECT_APIS.GET(id),
        method: "GET",
        headers: {
          businessPackageName: "private@school",
        },
      }),
    }),
    updateSubject: builder.mutation<SubjectResponse, any>({
      query: ({ subjectDetails, id }) => ({
        url: SUBJECT_APIS.UPDATE(id),
        method: "PUT",
        headers: {
          businessPackageName: "private@school",
        },
        body: subjectDetails,
      }),
      invalidatesTags: ["subjectsList"],
    }),
    deleteSubject: builder.mutation<SubjectResponse, any>({
      query: (id) => ({
        url: SUBJECT_APIS.DELETE(id),
        method: "DELETE",
        headers: {
          businessPackageName: "private@school",
        },
      }),
      invalidatesTags: ["subjectsList"],
    }),
  }),
});

export const {
  useCreateSubjectMutation,
  useGetAllSubjectListQuery,
  useGetSpecificSubjectDetailsQuery,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectsApi;
