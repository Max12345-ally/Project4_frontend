import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import "./App.css";
import Home from "./Home";
import AssetDetail from "./AssetDetail";
import About from "./About";
import Nav from "./Nav";
import Create from "./Create";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Profile from "./Profile";
import { myFetch } from "./api";

function App() {
  const [assets, setAssets] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    myFetch("api/assets")
      .then((response) => response.json())
      .then((data) => setAssets(data));
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
          <Route path="/assets/:id" element={<AssetDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
