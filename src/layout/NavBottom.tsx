import { Link } from "react-router-dom";

function NavBottom() {
  return (
    <nav className="bg-blue-200 absolute bottom-0 left-0 right-0">
      <Link to="/add-word">add word</Link>
      <Link to="/words">words</Link>
    </nav>
  );
}
export default NavBottom;
