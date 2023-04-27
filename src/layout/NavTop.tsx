import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";

function NavTop() {
  const navigate = useNavigate();

  const { user } = useAppContext();

  console.log(user);

  const onLogout = () => {
    auth.signOut();

    navigate("/");
  };

  return (
    <nav className="bg-blue-200 flex justify-evenly">
      <div>french flag icon</div>
      <div>{user && user.name} le mot du jour</div>
      <button type="button" onClick={onLogout}>
        logout icon
      </button>
    </nav>
  );
}
export default NavTop;
