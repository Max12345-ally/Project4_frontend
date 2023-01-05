import React from "react";
import { NavLink } from "react-router-dom";
import { auth, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "@emotion/styled";

const HeaderStyled = styled.header`
  a {
    color: #111;
    text-decoration: none;
  }
`;

const NavStyled = styled.nav`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  padding-block: 1rem;
  text-underline-offset: 2;
  text-decoration: none;
  font-family: Neue Machina;
  color: black;
  padding-left: 50px;
  padding-right: 50px;
`;

const RightPanel = styled.div`
  display: flex;
  gap: 20px;
`;

function navLinkStyle({ isActive }) {
  return isActive ? { fontWeight: 600 } : {};
}

function Nav() {
  const [user] = useAuthState(auth);

  return (
    <HeaderStyled>
      <NavStyled>
        <NavLink to="/" style={navLinkStyle}>
          Beehance
        </NavLink>
        <RightPanel>
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
        </RightPanel>
      </NavStyled>
    </HeaderStyled>
  );
}

export default Nav;
