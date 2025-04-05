// redux
import { configureStore } from "@reduxjs/toolkit";

// slices
import { authSlice } from "./features/authSlice";
import { paymentSlice } from "./features/paymentSlice";
import { searchJobsSlice } from "./features/searchJobsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      payment: paymentSlice.reducer,
      searchJobs: searchJobsSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
