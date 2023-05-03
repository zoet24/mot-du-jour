import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Loading from "./Loading";

const PrivateRoute = () => {
  const { user, loading } = useAppContext();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    toast.error("Please sign in to access site.");
    return <Navigate to="/sign-in" />;
  } else {
    return <Outlet />;
  }
};
export default PrivateRoute;
