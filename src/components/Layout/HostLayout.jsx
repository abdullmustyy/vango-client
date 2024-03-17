import { Outlet } from "react-router-dom";
import HostNav from "../Host/HostNav";

export default function HostLayout() {
  return (
    <section className="min-h-screen">
      <HostNav />
      <Outlet />
    </section>
  );
}
