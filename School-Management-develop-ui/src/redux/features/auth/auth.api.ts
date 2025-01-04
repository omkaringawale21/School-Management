"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, AUTH_APIS } from "@/config/config";

interface UserLoginRequest {
  email: string;
  password: string;
}

interface UserLoginResponse {
  body?: any,
  message: string,
  status: number
}

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    userLogin: builder.mutation<UserLoginResponse, UserLoginRequest>({
      query: (userDetails) => ({
        url: AUTH_APIS.LOGIN_API,
        method: "POST",
        headers: {
          businessPackageName: "private@school",
        },
        body: userDetails,
      }),
      onQueryStarted: async (__args, { queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          console.log("Login successful:", result.data);
        } catch (error) {}
      },
    }),
  }),
});

export const { useUserLoginMutation } = authApi;
