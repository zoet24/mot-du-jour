import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import SharedLayout from "./layout/SharedLayout";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import Home from "./views/Home";
import AddWord from "./views/AddWord";
import Words from "./views/Words";
import ForgotPassword from "./views/ForgotPassword";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/add-word" element={<PrivateRoute />}>
              <Route path="/add-word" element={<AddWord />} />
            </Route>
            <Route path="/words" element={<PrivateRoute />}>
              <Route path="/words" element={<Words />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
