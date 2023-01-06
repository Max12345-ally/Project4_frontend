import styled from "@emotion/styled";
import { useNavigate, Link } from "react-router-dom";
import { myFetch } from "./api";
import ImageMain from "./Bee.png";
import { Asset, Assets } from "./Asset";

const Container = styled.div``;

function Home({ assets = [] }) {
  return (
    <Container>
      <img src={ImageMain} height="300" width="1900" />
      <Assets>
        {assets.map((asset) => {
          return <Asset key={asset.title + asset.link} asset={asset} />;
        })}
      </Assets>
    </Container>
  );
}

export default Home;
