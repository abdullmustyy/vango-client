import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isUserAuthorized } from "../utils/auth.util";

export default function ProtectedRoutes() {
  const location = useLocation();

  const isSignedIn = isUserAuthorized();

  return isSignedIn ? (
    <Outlet />
  ) : (
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
