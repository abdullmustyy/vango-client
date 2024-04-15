import { createSlice } from "@reduxjs/toolkit";

const initialState = { error: null, pageType: "signin", imageUrl: "" };

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
    setImageUrl(state, action) {
      state.imageUrl = action.payload;
    },
  },
});

export const { setError, setPageType, setImageUrl } = authSlice.actions;
export default authSlice.reducer;
