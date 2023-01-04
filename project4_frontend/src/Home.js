import styled from "@emotion/styled";
import { useNavigate, Link } from "react-router-dom";
import { myFetch } from "./api";
import ImageMain from "./pasted-image-0.png";

const Container = styled.div``;

const Assets = styled.div`
  display: flex;
  gap: 50px;
  padding: 0 20vw;
  flex-wrap: wrap;
`;

function Home({ assets = [] }) {
  const navigate = useNavigate();

  async function handleDelete(assetId) {
    console.log(`Delete asset with id "${assetId}"`);
    await myFetch(`api/assets/${assetId}`, { method: "DELETE" });
    navigate("/");
  }

  return (
    <Container>
      <div className="main-title">Beehance</div>
      <img src={ImageMain} height="300" width="1400" />
      <Assets>
        {assets.map((asset) => {
          return <Asset asset={asset} handleDelete={handleDelete} />;
        })}
      </Assets>
    </Container>
  );
}

const AssetContainer = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  position: relative;
  //background-image: url(${(props) => props.img});
`;

const Image = styled.img`
  position: absolute;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  transition: transform 0.5s;

  &:hover {
    transform: scale(1.1);
  }
`;

const TitleStyledLink = styled(Link)`
  z-index: 1;
  position: absolute;
  bottom: 30px;
  left: 10px;
  text-decoration: none;
  color: white;
  box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.8);
`;

const Username = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 10px;
  left: 10px;
  text-decoration: none;
  color: white;
  box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.8);
`;

function Asset(props) {
  const asset = props.asset;
  // function likeButtonHandler() {
  //   console.log("test");
  // }

  return (
    <AssetContainer key={asset._id}>
      <TitleStyledLink to={`/assets/${asset._id}`}>
        {asset.title}{" "}
      </TitleStyledLink>
      <Username>{asset.userName}</Username>
      <Image src={asset.image} alt={asset.title} />
      <button
        type="submit"
        style={{ display: "none" }}
        onClick={() => props.handleDelete(asset._id)}
      >
        Delete
        <span className="sr-only">{asset.title}</span>
      </button>

      {/* <button onClick={likeButtonHandler}>♡</button> */}
    </AssetContainer>
  );
}

export default Home;
