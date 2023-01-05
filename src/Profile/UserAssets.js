import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { myFetch } from "../api";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "@emotion/styled";

import { auth } from "../firebase";
import { Panel, FormGroup } from "./Panel";
import { Asset, Assets } from "../Asset";
const Container = styled(Panel)``;

const Avatar = styled.img`
  width: 380px;
  border-radius: 20px;
`;

const Header = styled.h3``;

export default function UserAssets() {
  const [user, loading] = useAuthState(auth);

  const [userAssets, setUserAssets] = useState([]);

  const fetchUserAssets = useCallback(async function fetchUser() {
    const userAssetsResponse = await myFetch(`api/assets/${user.email}`, {
      method: "GET",
    });
    if (userAssetsResponse.ok) {
      const userAssets = await userAssetsResponse.json();
      setUserAssets(userAssets);
    } else {
      console.log("can not fetch user assets");
    }
  }, []);

  useEffect(() => {
    fetchUserAssets();
  }, []);

  return (
    <Container>
      <Header>User Assets</Header>
      <Assets>
        {userAssets.map((asset) => {
          return <Asset asset={asset} handleDelete={() => {}} />;
        })}
      </Assets>
    </Container>
  );
}
