import { useLocation } from "react-router-dom";

function Access() {
  const location = useLocation();
  const pathname = location.pathname;
  const isSignUp = pathname === "/sign-up";

  return (
    <>
      <h1>mot du jour</h1>
      <form>
        <input type="text" placeholder="name" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button>{isSignUp ? "sign up" : "sign in"}</button>
      </form>

      {isSignUp && <p>Google OAuth</p>}
    </>
  );
}
export default Access;
