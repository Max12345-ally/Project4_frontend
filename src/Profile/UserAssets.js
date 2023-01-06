import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { myFetch } from "../api";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Panel, FormGroup } from "./Panel";
import { Asset, Assets } from "../Asset";
const Container = styled(Panel)`
  width: auto;
  gap: 0;
  // @media (max-width: 1500px) {
  //    width: calc(50vw - 180px);
  // }

  padding-bottom: 150px;
`;

const Avatar = styled.img`
  width: 380px;
  border-radius: 20px;
`;

const Header = styled.h3`
  margin-bottom: 0;
`;

export default function UserAssets(props) {
  const { userAssets, onDelete } = props;
  async function handleDelete(assetId) {
    console.log(`Delete asset with id "${assetId}"`);

    if (window.confirm("Delete the asset?")) {
      await myFetch(`api/assets/${assetId}`, { method: "DELETE" });
      onDelete && onDelete(assetId);
    }
  }

  return (
    <Container>
      <Header>User Assets</Header>
      <Assets>
        {userAssets.map((asset) => {
          return <Asset asset={asset} handleDelete={handleDelete} />;
        })}
      </Assets>
    </Container>
  );
}
