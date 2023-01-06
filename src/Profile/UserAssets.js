import { myFetch } from "../api";
import styled from "@emotion/styled";
import { Panel } from "./Panel";
import { Asset, Assets } from "../Asset";
const Container = styled(Panel)`
  width: auto;
  gap: 0;
  // @media (max-width: 1500px) {
  //    width: calc(50vw - 180px);
  // }

  padding-bottom: 150px;
`;

const Header = styled.h3`
  margin-bottom: 0;
`;

export default function UserAssets(props) {
  const { userAssets, onDelete } = props;
  async function handleDelete(assetId) {
    if (window.confirm("Delete the asset?")) {
      await myFetch(`api/assets/${assetId}`, { method: "DELETE" });
      onDelete && onDelete(assetId);
    }
  }

  return (
    <Container>
      <Header>User Assets</Header>
      <Assets>
        {userAssets.map((asset) => {
          return (
            <Asset
              asset={asset}
              handleDelete={onDelete ? handleDelete : undefined}
            />
          );
        })}
      </Assets>
    </Container>
  );
}
