import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth-slice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});

export default store;
