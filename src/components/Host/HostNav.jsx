import { NavLink } from "react-router-dom";

export default function HostNav() {
  const activeStyle = {
    color: "black",
    textDecoration: "underline",
  };

  return (
    <nav className="py-6 md:px-0 px-4">
      <div className="container mx-auto text-base text-[#161616] font-medium space-x-6">
        <NavLink
          end
          to="."
          style={({ isActive }) => (isActive ? activeStyle : null)}
          className="hover:text-black hover:font-semibold hover:underline transition"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="income"
          style={({ isActive }) => (isActive ? activeStyle : null)}
          className="hover:text-black hover:font-semibold hover:underline transition"
        >
          Income
        </NavLink>
        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? activeStyle : null)}
          className="hover:text-black hover:font-semibold hover:underline transition"
        >
          Vans
        </NavLink>
        <NavLink
          to="reviews"
          style={({ isActive }) => (isActive ? activeStyle : null)}
          className="hover:text-black hover:font-semibold hover:underline transition"
        >
          Reviews
        </NavLink>
      </div>
    </nav>
  );
}
