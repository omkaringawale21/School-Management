"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/auth.api";
import { teachersApi } from "./features/teachers/teachers.api";
import { studentsApi } from "./features/students/students.api";
import { parentsApi } from "./features/parents/parents.api";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [parentsApi.reducerPath]: parentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(teachersApi.middleware)
      .concat(studentsApi.middleware)
      .concat(parentsApi.middleware),
});

export default store;
