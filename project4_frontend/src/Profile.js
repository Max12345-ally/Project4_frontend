import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";
import Create from "./Create";

function Profile(props) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return null; // Maybe a spinner.
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h1>My Profile ({user.email})</h1>
      <Create fetchAssets={props.fetchAssets} />
    </>
  );
}

export default Profile;
