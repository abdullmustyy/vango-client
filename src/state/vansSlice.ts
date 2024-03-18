import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../app/store";

export interface VansState {
  filterOptions: { id: number; type: string; buttonStyle: string }[];
}

const initialState: VansState = {
  filterOptions: [],
};

const vansSlice = createSlice({
  name: "vans",
  initialState,
  reducers: {
    setFilterOptions(
      state,
      action: PayloadAction<{ id: number; type: string; buttonStyle: string }[]>
    ) {
      state.filterOptions = action.payload;
    },
  },
});

export const { setFilterOptions } = vansSlice.actions;
export default vansSlice.reducer;
