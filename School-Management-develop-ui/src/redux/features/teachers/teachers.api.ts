"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TEACHER_APIS, BASE_URL } from "@/config/config";

interface TeachersRequest {
  teacherName: string;
  teacherId: string;
  subject: string[] | any;
  classList: string[] | any;
  phone: string;
  address: string;
  profilePhoto: string;
}

interface TeachersResponse {
  body?: Record<string, unknown>;
  message: string;
  status: number;
}

export const teachersApi = createApi({
  reducerPath: "teachersApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    createTeacher: builder.mutation<TeachersResponse, TeachersRequest>({
      query: (teacherDetails) => ({
        url: TEACHER_APIS.SAVE,
        method: "POST",
        headers: {
          businessPackageName: "private@school",
        },
        body: teacherDetails,
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log("Teacher created successfully:", result.data);
        } catch (error) {
          console.error("Error creating teacher:", error);
        }
      },
    }),
  }),
});

export const { useCreateTeacherMutation } = teachersApi;
