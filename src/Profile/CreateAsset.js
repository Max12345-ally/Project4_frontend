import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { myFetch } from "../api";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "@emotion/styled";

import { auth } from "../firebase";

import { Panel, FormGroup } from "./Panel";

const Container = styled(Panel)``;

export default function CreateAsset(props) {
  // start to #create new imaage in profile
  const [user, loading] = useAuthState(auth);
  console.log(user);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  async function saveAsset(e) {
    const newAsset = { title, image, userName: user.email };

    const response = await myFetch("api/assets", {
      method: "POST",
      body: JSON.stringify(newAsset),
    });

    if (response.ok) {
      const createdAsset = await response.json();
      setTitle("");
      setImage("");
      props.onCreate(createdAsset);
    }
  }

  return (
    <Container>
      <h3 className="titleLine">Create An Asset</h3>
      <FormGroup>
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
      </FormGroup>

      <FormGroup>
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
      </FormGroup>

      <FormGroup>
        <button
          onClick={saveAsset}
          className="pointer"
          disabled={!(title.trim() && image.trim())}
        >
          Create Asset
        </button>
      </FormGroup>
    </Container>
  );
}
