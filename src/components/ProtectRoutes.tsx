import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isUserAuthorized, logOut } from "../utils/auth.util";
import { useAppDispatch } from "@/app/hooks";
import { setSignedIn } from "@/state/authSlice";

export default function ProtectRoutes() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  if (isUserAuthorized()) {
    return <Outlet />;
  } else {
    logOut();
    dispatch(setSignedIn("false"));

    return (
      <Navigate
        to="/auth"
        state={{
          from: location.pathname,
          message: `Session expired, please sign in again.`,
        }}
        replace
      />
    );
  }
}
