import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <header>
      <nav
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          paddingBlock: "1rem",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Nav;
