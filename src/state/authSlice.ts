import { createSlice } from "@reduxjs/toolkit";

const initialState = { error: null, pageType: "signin" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    setPageType(state, action) {
      state.pageType = action.payload;
    },
  },
});

export const { setError, setPageType } = authSlice.actions;
export default authSlice.reducer;
