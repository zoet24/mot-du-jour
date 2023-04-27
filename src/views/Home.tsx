import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1>mot du jour</h1>
        <div>
          <Link to="/sign-in">sign in</Link>
          <Link to="/sign-up">sign up</Link>
        </div>
      </div>
    </>
  );
}
export default Home;
