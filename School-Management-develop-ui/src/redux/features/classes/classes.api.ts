"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CLASSES_APIS, BASE_URL } from "@/config/config";

interface ClassesResponse {
  body?: any;
  message: string;
  status: number;
}

export const classsApi = createApi({
  reducerPath: "classsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["classesList"],
  endpoints: (builder) => ({
    getAllClassLists: builder.query<ClassesResponse, any>({
      query: () => ({
        url: CLASSES_APIS.ALL,
        method: "GET",
        headers: {
          businessPackageName: "private@school",
        },
        providedTags: ["classesList"],
      }),
    }),
    createClass: builder.mutation<ClassesResponse, any>({
      query: (classesDetails) => ({
        url: CLASSES_APIS.SAVE,
        method: "POST",
        headers: {
          businessPackageName: "private@school",
        },
        body: classesDetails,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 200) {
            dispatch(
              classsApi.endpoints.getAllClassLists?.initiate(undefined)
            ) as any;
          }
        } catch (error) {
          console.error("Error creating class:", error);
          return error;
        }
      },
      invalidatesTags: ["classesList"],
    }),
    getSpecificClassDetails: builder.query<ClassesResponse, any>({
      query: (id) => ({
        url: CLASSES_APIS.GET(id),
        method: "GET",
        headers: {
          businessPackageName: "private@school",
        },
        providedTags: ["classesList"],
      }),
    }),
    updateClass: builder.mutation<ClassesResponse, any>({
      query: ({ classesDetails, id }) => ({
        url: CLASSES_APIS.UPDATE(id),
        method: "PUT",
        headers: {
          businessPackageName: "private@school",
        },
        body: classesDetails,
      }),
      invalidatesTags: ["classesList"],
    }),
    deleteClass: builder.mutation<ClassesResponse, any>({
      query: (id) => ({
        url: CLASSES_APIS.DELETE(id),
        method: "DELETE",
        headers: {
          businessPackageName: "private@school",
        },
      }),
      invalidatesTags: ["classesList"],
    }),
  }),
});

export const {
  useCreateClassMutation,
  useGetAllClassListsQuery,
  useGetSpecificClassDetailsQuery,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classsApi;
