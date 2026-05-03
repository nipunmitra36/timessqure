import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Exported member for store is used in src/app/lib/redux/hooks.ts.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;