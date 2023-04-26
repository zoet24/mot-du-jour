import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";

function NavTop() {
  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();

    navigate("/");
  };

  return (
    <nav className="bg-blue-200 flex justify-evenly">
      <div>french flag icon</div>
      <div>mot du jour</div>
      <button type="button" onClick={onLogout}>
        logout icon
      </button>
    </nav>
  );
}
export default NavTop;
