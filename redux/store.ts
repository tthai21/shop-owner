import { configureStore } from "@reduxjs/toolkit";
import staffsSlice from "./slice/staffsSlice";

const store = configureStore({
  reducer: {
    staffsList: staffsSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
