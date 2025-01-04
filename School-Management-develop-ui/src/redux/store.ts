"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/auth.api";
import { teachersApi } from "./features/teachers/teachers.api";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(teachersApi.middleware),
});

export default store;
