import { configureStore } from "@reduxjs/toolkit";
import vansReducer from "../state/vansSlice";
import hostReducer from "../state/hostSlice";
import authReducer from "../state/authSlice";

export const store = configureStore({
  reducer: { vans: vansReducer, host: hostReducer, auth: authReducer },
});
