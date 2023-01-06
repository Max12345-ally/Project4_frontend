import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import "./App.css";
import Home from "./Home";
import AssetDetail from "./AssetDetail";
import About from "./About";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Profile from "./Profile/Profile";
import { myFetch } from "./api";

function App() {
  const [assets, setAssets] = useState([]);
  // const [user] = useAuthState(auth);

  const fetchAssets = () => {
    myFetch("api/assets")
      .then((response) => response.json())
      .then((data) => setAssets(data));
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const onDelete = (assetId) => {
    const newAssets = assets.filter((asset) => asset._id != assetId); // to instant render
    setAssets(newAssets);
  };

  const onCreate = (newAsset) => {
    const newAssets = [...assets, newAsset];
    setAssets(newAssets);
  };

  return (
    <div className="App">
      <Router>
        <Nav />

        <Routes>
          <Route path="/" element={<Home assets={assets} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/me"
            element={
              <Profile
                onDelete={onDelete}
                onCreate={onCreate}
                assets={assets}
              />
            }
          />
          <Route path="/assets/:id" element={<AssetDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
