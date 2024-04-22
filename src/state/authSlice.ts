import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  pageType: "signin",
  imageUrl: "",
  isLoggedIn: "false",
};

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
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setError, setPageType, setImageUrl, setLoggedIn } =
  authSlice.actions;
export default authSlice.reducer;
