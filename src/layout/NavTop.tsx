import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { FiLogOut } from "react-icons/fi";

function NavTop() {
  const navigate = useNavigate();

  const { user, languages } = useAppContext();

  const onLogout = () => {
    auth.signOut();

    navigate("/");
  };

  return (
    <nav className="navbar fixed top-0 left-0 right-0 border-b border-white shadow-card">
      {/* TODO - Language dropdown menu to select current language */}
      {languages &&
        languages.map((language, index) => {
          return (
            <div
              className="h-14 w-14 rounded-full cursor-pointer relative overflow-hidden border-2 border-white"
              key={index}
            >
              <img
                className="absolute h-full w-full top-0 left-0 right-0 bottom-0"
                src={language.flag}
              />
            </div>
          );
        })}

      {/* TODO - replace [0] with current language funcitonality */}
      {/* <h1>{languages[0].appName}</h1> */}
      <h1>Le Mot Du Jour</h1>

      <button type="button" className="icon" onClick={onLogout}>
        <FiLogOut />
        <span className="icon-text">Logout</span>
      </button>
    </nav>
  );
}
export default NavTop;
