import React from "react";
import { NavLink } from "react-router-dom";
import { auth, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function navLinkStyle({ isActive }) {
  return isActive ? { fontWeight: 600 } : {};
}

function Nav() {
  const [user] = useAuthState(auth);

  return (
    <header>
      <nav
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          paddingBlock: "1rem",
          textUnderlineOffset: 2,
        }}
      >
        <NavLink to="/" style={navLinkStyle}>
          Home
        </NavLink>
        <NavLink to="/about" style={navLinkStyle}>
          About
        </NavLink>
        {user ? (
          <NavLink to="/me" style={navLinkStyle}>
            {user.email}
          </NavLink>
        ) : null}
        {!user ? (
          <NavLink to="/login" style={navLinkStyle}>
            Log in
          </NavLink>
        ) : (
          <NavLink onClick={logout} style={navLinkStyle}>
            Log out
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Nav;
