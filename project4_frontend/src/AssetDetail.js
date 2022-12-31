import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { myFetch } from "./api";

function AssetDetail() {
  const { id } = useParams();

  const [asset, setAsset] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAsset() {
      const response = await myFetch(`api/assets/${id}`);
      const data = await response.json();
      setLoading(false);
      if (!response.ok) {
        setError(data);
      } else {
        setAsset(data.asset);
      }
    }
    fetchAsset();
  }, [id]);

  if (loading) {
    return null;
  }

  if (error) {
    <div>
      {JSON.stringify(error)}
      {/* {error.status} */}
      {/* {error.message} */}
    </div>;
  }

  return (
    <div>
      <h1>{asset.title}</h1>
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
