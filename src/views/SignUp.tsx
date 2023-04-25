import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth } from "../firebase.config";

interface formDataState {
  name: string;
  email: string;
  password: string;
}

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<formDataState>({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  // On form input change map over previous form data and update
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const isSignUp = pathname === "/sign-up";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>mot du jour</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="name"
          id="name"
          value={name}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          value={email}
          onChange={onChange}
        />

        {/* TODO - Add visibility icon */}
        <input
          type={showPassword ? "text" : "password"}
          placeholder="password"
          id="password"
          value={password}
          onChange={onChange}
        />
        <br />
        <button>{isSignUp ? "sign up" : "sign in"}</button>
        <br />
        <Link to="/forgot-password">Forgot Password?</Link>
      </form>

      {/* TODO - Add Google OAuth, link to sign up/sign in depending on page */}
    </>
  );
}
export default SignUp;
