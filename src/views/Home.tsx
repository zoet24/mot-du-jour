import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>mot du jour</h1>
      <div>
        <Link to="/sign-in">sign in</Link>
        <Link to="/sign-up">sign up</Link>
      </div>
    </>
  );
}
export default Home;
