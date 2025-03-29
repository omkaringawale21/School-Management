"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/auth.api";
import { teachersApi } from "./features/teachers/teachers.api";
import { studentsApi } from "./features/students/students.api";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(teachersApi.middleware)
      .concat(studentsApi.middleware),
});

export default store;
