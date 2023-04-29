import { useNavigate } from "react-router-dom";
import { AiOutlineUnorderedList, AiOutlinePlus } from "react-icons/ai";

function NavBottom() {
  const navigate = useNavigate();

  return (
    <nav className="navbar fixed bottom-0 left-0 right-0">
      <div className="flex space-x-8 mx-auto">
        <div onClick={() => navigate("/add-word")} className="icon">
          <AiOutlinePlus />
          <span className="icon-text">Add word</span>
        </div>
        <div onClick={() => navigate("/words")} className="icon">
          <AiOutlineUnorderedList />
          <span className="icon-text">View words</span>
        </div>
      </div>
    </nav>
  );
}
export default NavBottom;
