"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/auth.api";
import { teachersApi } from "./features/teachers/teachers.api";
import { studentsApi } from "./features/students/students.api";
import { parentsApi } from "./features/parents/parents.api";
import { subjectsApi } from "./features/subjects/subjects.api";
import { classsApi } from "./features/classes/classes.api";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [parentsApi.reducerPath]: parentsApi.reducer,
    [subjectsApi.reducerPath]: subjectsApi.reducer,
    [classsApi.reducerPath]: classsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(teachersApi.middleware)
      .concat(studentsApi.middleware)
      .concat(parentsApi.middleware)
      .concat(subjectsApi.middleware)
      .concat(classsApi.middleware),
});

export default store;
