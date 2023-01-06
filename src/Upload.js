import { useState, useRef } from "react";
import "./App.css";

const hostUrl = "/upload";

export const UploadFile = () => {
  const filePicker = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUpLoaded] = useState();

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData(); // mandatory form/objet  to server upload
    formData.append("file", selectedFile); // key from server check

    const res = await fetch(hostUrl, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setUpLoaded(data);
  };
  const handlePick = () => {
    filePicker.current.click();
  };

  return (
    <>
      <button onClick={handlePick}>Pick File</button>
      <input
        type="file"
        ref={filePicker}
        onChange={handleChange}
        accept="image/* ,.png,.jpg,.gif,.web" //error *
      />
      <button onClick={handleUpload}>Upload</button>;
      {uploaded && (
        <div>
          <h2>{uploaded.filename}</h2>
          <img alt="" src={uploaded.filePath} width="200" />
        </div>
      )}
    </>
  );
};
