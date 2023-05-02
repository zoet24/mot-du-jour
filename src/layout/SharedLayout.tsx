import { Outlet, useLocation } from "react-router-dom";
import NavBottom from "./NavBottom";
import NavTop from "./NavTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SharedLayout() {
  const location = useLocation();
  const pathname = location.pathname;
  const showNav = pathname === "/words" || pathname === "/add-word";

  return (
    <>
      {showNav && <NavTop />}
      <main className={`container ${showNav && `py-32`}`}>
        <Outlet />
      </main>
      {showNav && <NavBottom />}
      <ToastContainer closeButton={false} autoClose={1500} />
    </>
  );
}
export default SharedLayout;
