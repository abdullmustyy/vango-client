import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isUserSignedIn, isTokenExpired } from "../utils/auth.util";

export default function ProtectedRoutes() {
  const location = useLocation();

  const isLoggedIn = isUserSignedIn() && !isTokenExpired();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to="/auth"
      state={{
        from: location.pathname,
        message: `Session expired. Please sign in again.`,
      }}
      replace
    />
  );
}
