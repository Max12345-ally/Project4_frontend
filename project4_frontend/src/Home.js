import React from "react";
import { Link } from "react-router-dom";

function Home({ assets = [] }) {
  return (
    <div>
      <h1>Welcome to our app</h1>
      {assets.map((asset) => (
        <div key={asset._id}>
          <p>{asset.title}</p>
          <img src={asset.image} alt={asset.title} />
        </div>
      ))}
    </div>
  );
}
// add map to crab assets
export default Home;
