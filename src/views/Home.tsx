import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

function Home() {
  const { appName } = useAppContext();

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1>{appName}</h1>
        <div className="space-x-4">
          <Link to="/sign-in" className="btn">
            Sign in
          </Link>
          <Link to="/sign-up" className="btn">
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
export default Home;
