import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Nav from "./Nav";
import Create from "./Create";
import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Profile from "./Profile";

function App() {
  const [assets, setAssets] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    axios
      .request({
        method: "GET",
        // url: "http://185.20.225.250/api/assets",
        url: "http://localhost:4000/api/assets",
      })
      .then(function (response) {
        setAssets(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Nav />
        {user ? <Create /> : null} {/* NOTE: Beware of layout shift here. */}
        <Routes>
          <Route path="/" element={<Home assets={assets} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/me" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
