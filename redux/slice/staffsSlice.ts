import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StaffSlice {
  staffsList: Staff[] | null;
}

const initialState: StaffSlice = {
  staffsList: null,
};

const staffsSlice = createSlice({
  name: "staffsList",
  initialState,
  reducers: {
    setStaffsList(state, action: PayloadAction<Staff[] | null>) {
      state.staffsList = action.payload;
    },
  },
});

export const { setStaffsList } = staffsSlice.actions;

export default staffsSlice;
