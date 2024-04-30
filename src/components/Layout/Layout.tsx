import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { isUserSignedIn } from "../../utils/auth.util";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setSignedIn } from "../../state/authSlice";

export default function Layout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isSignedIn = isUserSignedIn();

    if (isSignedIn) {
      dispatch(setSignedIn("true"));
    }
  }, [dispatch]);

  return (
    <section>
      <NavBar />
      <Outlet />
      <Footer />
    </section>
  );
}
