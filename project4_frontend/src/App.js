import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Nav from "./Nav";
import Create from "./Create";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [assets, setAssets] = useState([]);

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
        <Nav></Nav>
        <Create />
        <Routes>
          <Route path="/" element={<Home assets={assets} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
