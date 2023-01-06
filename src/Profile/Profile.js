import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useParams } from "react-router-dom";
import { auth } from "../firebase";
import CreateAsset from "./CreateAsset";
import ProfileInfo from "./ProfileInfo";
import styled from "@emotion/styled";
import UserAssets from "./UserAssets";
import { useMemo } from "react";
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
  const { email } = useParams();
  const urlEmail = email;

  const [user, loading] = useAuthState(auth);

  const isMyProfile = !urlEmail || (user && urlEmail == user.email);

  const emailToFilterAssets = urlEmail || user?.email;

  const userAssets = useMemo(() => {
    //to avoid not needed calculations. Calculated only if dependencies are changed
    return assets.filter((asset) => asset.userName == emailToFilterAssets); // to filter assets from App.js
  }, [assets]);

  if (loading) {
    return null; // Maybe a spinner.
  }

  if (!user && isMyProfile) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <h1>
        {isMyProfile && <>My Profile</>} {emailToFilterAssets}
      </h1>

      <HorizontalStack>
        <VerticalStack>
          {isMyProfile && <CreateAsset onCreate={onCreate} />}
          <ProfileInfo isMyProfile={isMyProfile} />
        </VerticalStack>
        <UserAssets
          userAssets={userAssets}
          onDelete={isMyProfile ? onDelete : undefined}
        />
      </HorizontalStack>
    </Container>
  );
}

export default Profile;
