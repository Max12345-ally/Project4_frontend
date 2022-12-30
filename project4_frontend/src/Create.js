import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { myFetch } from "./api";

export default function Create() {
  const [form, setForm] = useState({ title: "", image: "" });
  const navigate = useNavigate();

  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const newAsset = { ...form };

    await myFetch("api/assets", {
      method: "POST",
      body: JSON.stringify(newAsset),
    });

    setForm({ title: "", image: "" });
    navigate("/");
  }

  return (
    <div>
      <h3 className="titleLine">Create An Asset</h3>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <div className="form-group">
          <label htmlFor="title" style={{ fontWeight: 600 }}>
            Title{" "}
          </label>
          <input
            id="title"
            required
            type="text"
            className="form-control"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
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
            value={form.image}
            onChange={(e) => updateForm({ image: e.target.value })}
          />
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="pointer"
            disabled={!(form.title.trim() && form.image.trim())}
          >
            Create Asset
          </button>
        </div>
      </form>
    </div>
  );
}