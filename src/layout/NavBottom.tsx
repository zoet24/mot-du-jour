import { Link, Navigate, useNavigate } from "react-router-dom";

function NavBottom() {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-200 absolute bottom-0 left-0 right-0 flex justify-evenly">
      <div onClick={() => navigate("/add-word")}>add word</div>
      <div onClick={() => navigate("/words")}>words</div>
    </nav>
  );
}
export default NavBottom;
