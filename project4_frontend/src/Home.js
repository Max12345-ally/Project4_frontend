import { useNavigate, Link } from "react-router-dom";
import { myFetch } from "./api";

function Home({ assets = [] }) {
  const navigate = useNavigate();

  async function handleDelete(assetId) {
    console.log(`Delete asset with id "${assetId}"`);
    await myFetch(`api/assets/${assetId}`, { method: "DELETE" });
    navigate("/");
  }

  return (
    <div>
      <h1>Welcome to our app</h1>
      {assets.map((asset) => (
        <div key={asset._id}>
          <Link to={`/assets/${asset._id}`}>{asset.title}</Link>
          <img src={asset.image} alt={asset.title} width="300" height="200" />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleDelete(asset._id);
            }}
          >
            <button type="submit">
              Delete
              <span className="sr-only">{asset.title}</span>
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default Home;
