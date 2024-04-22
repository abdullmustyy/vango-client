import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setLoggedIn } from "../state/authSlice";
import { useCallback, useEffect } from "react";

export default function NavBar() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      dispatch(setLoggedIn("true"));
    }
  }, [dispatch]);

  // Log out the user and set the isLoggedIn state to false
  const handleLogOut = useCallback(() => {
    localStorage.setItem("isLoggedIn", "false");
    dispatch(setLoggedIn("false"));
  }, [dispatch]);

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
          {isLoggedIn === "true" ? (
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
