import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const { user } = useAppContext();

  if (!user) {
    toast.error("Please sign in to access site.");
    return <Navigate to="/sign-in" />;
  } else {
    return <Outlet />;
  }
};
export default PrivateRoute;
