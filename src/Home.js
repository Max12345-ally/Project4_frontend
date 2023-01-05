import styled from "@emotion/styled";
import { useNavigate, Link } from "react-router-dom";
import { myFetch } from "./api";
import ImageMain from "./Bee.png";
import { Asset, Assets } from "./Asset";

const Container = styled.div``;

function Home({ assets = [] }) {
  const navigate = useNavigate();

  async function handleDelete(assetId) {
    console.log(`Delete asset with id "${assetId}"`);
    await myFetch(`api/assets/${assetId}`, { method: "DELETE" });
    navigate("/");
  }

  return (
    <Container>
      <img src={ImageMain} height="300" width="1900" />
      <Assets>
        {assets.map((asset) => {
          return <Asset asset={asset} handleDelete={handleDelete} />;
        })}
      </Assets>
    </Container>
  );
}

export default Home;
