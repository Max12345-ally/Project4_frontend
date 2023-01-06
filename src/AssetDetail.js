import { Link, useParams } from "react-router-dom";
import styled from "@emotion/styled";

const UserLink = styled(Link)`
  text-decoration: none;
  color: gray;
`;

function AssetDetail(props) {
  const { assets } = props;
  const { id } = useParams();

  const asset = assets.find((asset) => asset._id === id);

  return (
    <div>
      <h1>
        {asset.title}{" "}
        <UserLink to={`/users/${asset.userName}`}>by {asset.userName}</UserLink>
      </h1>
      <img src={asset.image} alt={asset.title} width="600" height="400" />
      <ul>
        {asset.comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.text}</p>
            by {comment.user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssetDetail;
