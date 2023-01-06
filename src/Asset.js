import styled from "@emotion/styled";
import { Link } from "react-router-dom";
const AssetContainer = styled.div`
  display: flex;
  //cursor: pointer;
  width: 350px;
  height: 350px;
  position: relative;
  transition: transform 0.5s;
  //background-image: url(${(props) => props.img});
  &:hover {
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  position: absolute;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 350px;
  height: 350px;
  border-radius: 20px;
  transition: transform 0.5s;
`;

const TitleStyledLink = styled(Link)`
  z-index: 1;
  position: absolute;
  bottom: 40px;
  left: 20px;
  text-decoration: none;
  color: white;
  //box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.8);
`;

const Username = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 20px;
  left: 20px;
  text-decoration: none;
  color: white;
  //box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.8);
`;

const DeleteButton = styled.button`
  z-index: 1;
  position: absolute;
  bottom: -100px;
  right: -100px;
`;

export function Asset(props) {
  const { asset, handleDelete } = props;

  return (
    <AssetContainer key={asset._id}>
      <TitleStyledLink to={`/assets/${asset._id}`}>
        {asset.title}{" "}
      </TitleStyledLink>
      <Username>{asset.userName}</Username>
      <Image src={asset.image} alt={asset.title} />
      {handleDelete && (
        <DeleteButton
          // visible={!!handleDelete}
          onClick={() => handleDelete(asset._id)}
        >
          Delete
          <span className="sr-only">{asset.title}</span>
        </DeleteButton>
      )}

      {/* <button onClick={likeButtonHandler}>♡</button> */}
    </AssetContainer>
  );
}

export const Assets = styled.div`
  display: flex;
  gap: 90px;
  padding: 5vw 10vw;
  flex-wrap: wrap;
`;
