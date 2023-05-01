import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore, auth } from "../firebase.config";
import { useAppContext } from "../context/AppContext";

interface formDataState {
  name: string;
  email: string;
  password: string;
}

function SignUp() {
  const { appName } = useAppContext();
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

      const formDataCopy = {
        name: formData.name,
        email: formData.email,
        languages: [],
        wordRefs: [],
      };

      await setDoc(doc(firestore, "users", user.uid), formDataCopy);

      navigate("/words");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="mb-4">{appName}</h1>
        <form className="form" onSubmit={onSubmit}>
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
          <button className="btn">Sign up</button>
          {/* TODO - Add in forgot password functionality */}
          {/* <Link to="/forgot-password">Forgot Password?</Link> */}
        </form>
        <Link to="/sign-in" className="mt-2 underline">
          Sign in
        </Link>

        {/* TODO - Add Google OAuth, link to sign up/sign in depending on page */}
      </div>
    </>
  );
}
export default SignUp;
