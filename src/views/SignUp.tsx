import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore, auth } from "../firebase.config";

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
        <h1>mot du jour</h1>
        <form className="text-center" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="name"
            id="name"
            value={name}
            onChange={onChange}
            className="w-1/3"
          />
          <input
            type="text"
            placeholder="email"
            id="email"
            value={email}
            onChange={onChange}
            className="w-1/3"
          />

          {/* TODO - Add visibility icon */}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            id="password"
            value={password}
            onChange={onChange}
            className="w-1/3"
          />
          {/* TODO - Remove brs */}
          <br />
          <button>{isSignUp ? "sign up" : "sign in"}</button>
          <br />
          <Link to="/forgot-password">Forgot Password?</Link>
        </form>

        {/* TODO - Add Google OAuth, link to sign up/sign in depending on page */}
      </div>
    </>
  );
}
export default SignUp;
