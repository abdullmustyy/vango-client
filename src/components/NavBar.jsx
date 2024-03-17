import { NavLink } from "react-router-dom";

export default function NavBar() {
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
            style={({ isActive }) => (isActive ? activeStyle : null)}
            className="hover:underline"
          >
            Host
          </NavLink>
          <NavLink
            to="about"
            style={({ isActive }) => (isActive ? activeStyle : null)}
            className="hover:underline"
          >
            About
          </NavLink>
          <NavLink
            to="vans"
            style={({ isActive }) => (isActive ? activeStyle : null)}
            className="hover:underline"
          >
            Vans
          </NavLink>
          <button onClick={() => localStorage.setItem("isLoggedIn", false)}>
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}
