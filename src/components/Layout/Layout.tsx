import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <section>
      <ToastContainer />
      <NavBar />
      <Outlet />
      <Footer />
    </section>
  );
}
