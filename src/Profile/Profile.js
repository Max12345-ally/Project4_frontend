import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import CreateAsset from "./CreateAsset";
import ProfileInfo from "./ProfileInfo";
import styled from "@emotion/styled";
import UserAssets from "./UserAssets";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;
  gap: 50px;
`;

function Profile(props) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return null; // Maybe a spinner.
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <h1>My Profile ({user.email})</h1>
      <CreateAsset fetchAssets={props.fetchAssets} />
      <ProfileInfo />

      <UserAssets />
    </Container>
  );
}

export default Profile;
