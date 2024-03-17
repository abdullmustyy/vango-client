import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const hostSlice = createSlice({
  name: "host",
  initialState,
  reducers: {},
});

// export const {} = hostSlice.actions;
export default hostSlice.reducer;
