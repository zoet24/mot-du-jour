import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { useAppContext } from "../context/AppContext";

interface formDataState {
  name: string;
  email: string;
  password: string;
}

function Access() {
  const { appName } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<formDataState>({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/words");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1>{appName}</h1>
        <form className="form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          {/* TODO - Add visibility icon */}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
          />
          <button className="btn">Sign in</button>

          {/* TODO - Add in forgot password functionality */}
          {/* <Link to="/forgot-password">Forgot Password?</Link> */}
        </form>
        <Link to="/sign-up" className="mt-2 underline">
          Sign up
        </Link>

        {/* TODO - Add Google OAuth, link to sign up/sign in depending on page */}
      </div>
    </>
  );
}
export default Access;
