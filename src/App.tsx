import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharedLayout from "./layout/SharedLayout";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import AddWord from "./views/AddWord";
import Words from "./views/Words";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/add-word" element={<AddWord />} />
            <Route path="/words" element={<Words />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
