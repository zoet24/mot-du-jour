import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset email");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1>Forgot Password</h1>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
        />
        <button className="btn">Send reset link</button>
      </form>
      <Link to="/sign-in" className="mt-2 underline">
        Sign in
      </Link>
    </div>
  );
}
export default ForgotPassword;
