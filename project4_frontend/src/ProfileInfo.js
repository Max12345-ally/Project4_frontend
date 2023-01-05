import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { myFetch } from "./api";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "@emotion/styled";

import { MdOutlineModeEdit } from "react-icons/md";

import { auth } from "./firebase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  .form-group {
    width: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  input {
    height: 24px;
    border-radius: 20px;
    padding: 0 15px;
  }
`;

const EditIcon = styled(MdOutlineModeEdit)`
  cursor: pointer;
`;

export default function ProfileInfo() {
  const [user, loading] = useAuthState(auth);
  console.log(user);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  async function saveAsset(e) {
    const newAsset = { title, image, userName: user.email };

    await myFetch("api/assets", {
      method: "POST",
      body: JSON.stringify(newAsset),
    });

    setTitle("");
    setImage("");
    navigate("/");
  }

  const [mode, setMode] = useState("show");

  const anotherMode = useMemo(() => {
    return mode == "show" ? "edit" : "show";
  }, [mode]);
  const switchMode = () => {
    setMode(anotherMode);
  };

  return (
    <Container>
      <h3 className="titleLine">
        Profile Info <EditIcon onClick={switchMode} title={anotherMode} />
      </h3>
      <div className="form-group">
        <label htmlFor="title" style={{ fontWeight: 600 }}>
          Title{" "}
        </label>
        <input
          id="title"
          required
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image" style={{ fontWeight: 600 }}>
          Image{" "}
        </label>
        <input
          id="image"
          required
          type="url"
          className="form-control"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div className="form-group">
        <button
          onClick={saveAsset}
          className="pointer"
          disabled={!(title.trim() && image.trim())}
        >
          Create Asset
        </button>
      </div>
    </Container>
  );
}
