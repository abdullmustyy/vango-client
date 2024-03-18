import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterOptions: [],
};

const vansSlice = createSlice({
  name: "vans",
  initialState,
  reducers: {
    setFilterOptions(state, action) {
      state.filterOptions = action.payload;
    },
  },
});

export const { setFilterOptions } = vansSlice.actions;
export default vansSlice.reducer;
