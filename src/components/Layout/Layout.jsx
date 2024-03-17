import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";

export default function Layout() {
  return (
    <section>
      <NavBar />
      <Outlet />
      <Footer />
    </section>
  );
}
