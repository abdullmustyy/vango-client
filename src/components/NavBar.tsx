import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setSignedIn } from "../state/authSlice";
import { useCallback, useEffect } from "react";
import { localStorageAuthValues, logOut } from "../utils/auth.util";

export default function NavBar() {
  const { isSignedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const { isSignedIn } = localStorageAuthValues();

    if (isSignedIn === "true") {
      dispatch(setSignedIn("true"));
    }
  }, [dispatch]);

  // Log out the user and set the isSignedIn state to false
  const handleLogOut = useCallback(() => {
    logOut();
    dispatch(setSignedIn("false"));

    navigate("/auth", { replace: true });
  }, [dispatch, navigate]);

  const activeStyle = {
    color: "black",
    textDecoration: "underline",
  };

  return (
    <nav className="py-4 md:px-0 px-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <NavLink
            to="."
            className="flex items-center text-black text-[1.58456rem] font-black leading-[2.51694rem]"
          >
            <span className="z-10">VanGo</span>
            <img src="/logo.png" alt="logo" className="w-12 -ml-5 " />
          </NavLink>
        </div>
        <div className="flex space-x-6 items-center text-base font-semibold text-[#4D4D4D]">
          <NavLink
            to="host"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="hover:underline"
          >
            Host
          </NavLink>
          <NavLink
            to="about"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="hover:underline"
          >
            About
          </NavLink>
          <NavLink
            to="vans"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="hover:underline"
          >
            Vans
          </NavLink>
          {isSignedIn === "true" ? (
            <button type="button" onClick={handleLogOut}>
              Log Out
            </button>
          ) : (
            <NavLink
              to={"/auth"}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="hover:underline"
            >
              Log In
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
