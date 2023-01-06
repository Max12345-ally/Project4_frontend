import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import CreateAsset from "./CreateAsset";
import ProfileInfo from "./ProfileInfo";
import styled from "@emotion/styled";
import UserAssets from "./UserAssets";
import { useState, useCallback, useEffect, useMemo } from "react";
import { myFetch } from "../api";

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Container = styled(VerticalStack)`
  align-items: flex-start;
  padding: 50px;
  gap: 50px;
`;

const HorizontalStack = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 50px;
`;

function Profile(props) {
  const { onDelete, onCreate, assets } = props;
  const [user, loading] = useAuthState(auth);

  const userAssets = useMemo(() => {
    //to avoid not needed calculations. Calculated only if dependencies are changed
    return assets.filter((asset) => asset.userName == user.email); // to filter assets from App.js
  }, [assets]);

  if (loading) {
    return null; // Maybe a spinner.
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <h1>My Profile ({user.email})</h1>

      <HorizontalStack>
        <VerticalStack>
          <CreateAsset onCreate={onCreate} />
          <ProfileInfo />
        </VerticalStack>
        <UserAssets userAssets={userAssets} onDelete={onDelete} />
      </HorizontalStack>
    </Container>
  );
}

export default Profile;
