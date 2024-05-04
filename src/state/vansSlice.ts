import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../app/store";

export interface VansState {
  filterOptions: { id: number; type: string; buttonStyle: string }[];
  vanImageUrl: string;
}

const initialState: VansState = {
  filterOptions: [],
  vanImageUrl: "",
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
    setVanImageUrl(state, action: PayloadAction<string>) {
      state.vanImageUrl = action.payload;
    },
  },
});

export const { setFilterOptions, setVanImageUrl } = vansSlice.actions;
export default vansSlice.reducer;
