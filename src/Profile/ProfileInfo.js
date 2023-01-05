import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { myFetch } from "../api";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "@emotion/styled";

import { MdOutlineModeEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import { auth } from "../firebase";
import { Panel, FormGroup } from "./Panel";

const Container = styled(Panel)``;

const EditIcon = styled(MdOutlineModeEdit)`
  cursor: pointer;
`;

const StopEditingIcon = styled(TiTick)`
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 380px;
  border-radius: 20px;
`;

const FullName = styled.div`
  font-weight: bold;
  font-size: 22pt;
`;
const About = styled.div``;
const Label = styled.div`
  font-size: 16pt;
  color: #999;
`;
const Title = styled.div``;
const Contacts = styled.div``;
const Header = styled.h3``;

export default function ProfileInfo() {
  const [user, loading] = useAuthState(auth);
  console.log(user);

  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [avatarLink, setAvatarLink] = useState("");

  const [mode, setMode] = useState("show");

  const anotherMode = useMemo(() => {
    return mode == "show" ? "edit" : "show";
  }, [mode]);
  const switchMode = () => {
    setMode(anotherMode);
  };

  const fetchUser = useCallback(
    async function fetchUser() {
      const userMongoResponse = await myFetch(`api/users/${user.email}`, {
        method: "GET",
      });
      if (userMongoResponse.ok) {
        const userMongo = await userMongoResponse.json();
        setFullName(userMongo.fullName);
        setTitle(userMongo.title);
        setAbout(userMongo.about);
        setAvatarLink(userMongo.avatarLink);
      } else {
        setMode("edit");
      }
    },
    [setMode]
  );

  useEffect(() => {
    fetchUser();
  }, []);

  const saveUser = async () => {
    const userToSave = {
      fullName,
      title,
      about,
      avatarLink,
      email: user.email,
    };

    await myFetch("api/users", {
      method: "POST",
      body: JSON.stringify(userToSave),
    });
  };

  const stopEditing = () => {
    saveUser();
    switchMode();
  };

  return (
    <Container>
      <Header>
        Profile Info
        {mode == "show" && (
          <EditIcon onClick={switchMode} title={anotherMode} />
        )}
        {mode == "edit" && (
          <StopEditingIcon onClick={stopEditing} title="save" />
        )}
      </Header>
      {mode == "show" && (
        <>
          <Avatar src={avatarLink} />
          <FullName>{fullName}</FullName>
          <Title>{title}</Title>
          <Label>About</Label>
          <About>{about}</About>
          <Label>Contacts</Label>
          <Contacts>{user.email}</Contacts>
        </>
      )}
      {mode == "edit" && (
        <>
          <FormGroup>
            <label htmlFor="image">Avatar</label>
            <input
              name="image"
              value={avatarLink}
              onChange={(e) => setAvatarLink(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>FullName</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <label>About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </FormGroup>
        </>
      )}
    </Container>
  );
}
