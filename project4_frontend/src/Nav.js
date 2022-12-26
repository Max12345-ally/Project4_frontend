import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/About">About</Link>
      <Link to="/Login">Login</Link>
    </header>
  );
}

export default Nav;
