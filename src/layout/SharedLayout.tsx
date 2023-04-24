import { Outlet, useLocation } from "react-router-dom";
import NavBottom from "./NavBottom";
import NavTop from "./NavTop";

function SharedLayout() {
  const location = useLocation();
  const pathname = location.pathname;
  const showNav = pathname === "/words" || pathname === "/add-word";

  return (
    <>
      {showNav && <NavTop />}
      <main>
        <Outlet />
      </main>
      {showNav && <NavBottom />}
    </>
  );
}
export default SharedLayout;
