import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export default function ProtectedRoutes() {
  const location = useLocation();
  let isLoggedIn = null;

  onAuthStateChanged(auth, (user) =>
    user ? (isLoggedIn = true) : (isLoggedIn = false)
  );

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to="/auth"
      state={{
        from: location.pathname,
        message: `To view this page, you have to sign in.`,
      }}
      replace
    />
  );
}
