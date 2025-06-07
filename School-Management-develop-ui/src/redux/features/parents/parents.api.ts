"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PARENT_APIS, BASE_URL } from "@/config/config";

interface ParentsResponse {
  body?: any;
  message: string;
  status: number;
}

export const parentsApi = createApi({
  reducerPath: "parentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["parentsList"],
  endpoints: (builder) => ({
    getAllParentsLists: builder.query<ParentsResponse, any>({
      query: () => ({
        url: PARENT_APIS.ALL,
        method: "GET",
        headers: {
          businessPackageName: "private@school",
        },
        providedTags: ["parentsList"],
      }),
    }),
    createParent: builder.mutation<ParentsResponse, any>({
      query: (parentsDetails) => ({
        url: PARENT_APIS.SAVE,
        method: "POST",
        headers: {
          businessPackageName: "private@school",
        },
        body: parentsDetails,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 200) {
            dispatch(
              parentsApi.endpoints.getAllParentsLists?.initiate(undefined)
            ) as any;
          }
        } catch (error) {
          console.error("Error creating parent:", error);
          return error;
        }
      },
      invalidatesTags: ["parentsList"],
    }),
    deleteParent: builder.mutation<ParentsResponse, any>({
      query: (id) => ({
        url: PARENT_APIS.DELETE(id),
        method: "DELETE",
        headers: {
          businessPackageName: "private@school",
        },
        body: {},
      }),
      invalidatesTags: ["parentsList"],
    }),
    getSpecificParentDetails: builder.query<ParentsResponse, any>({
      query: (id) => ({
        url: PARENT_APIS.GET(id),
        method: "GET",
        headers: {
          businessPackageName: "private@school",
        },
        providedTags: ["parentsList"],
      }),
    }),

    updateParent: builder.mutation<
      ParentsResponse,
      { parentsDetails: any; id: string }
    >({
      query: ({ parentsDetails, id }) => ({
        url: PARENT_APIS.UPDATE(id),
        method: "PUT",
        headers: {
          businessPackageName: "private@school",
        },
        body: parentsDetails,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.status === 200) {
            dispatch(
              parentsApi.endpoints.getAllParentsLists?.initiate(undefined)
            ) as any;
          }
        } catch (error) {
          console.error("Error updating parent:", error);
          return error;
        }
      },
      invalidatesTags: ["parentsList"],
    }),
  }),
});

export const {
  useGetAllParentsListsQuery,
  useCreateParentMutation,
  useDeleteParentMutation,
  useGetSpecificParentDetailsQuery,
  useUpdateParentMutation,
} = parentsApi;
