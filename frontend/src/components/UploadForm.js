import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";

const UploadForm = ({ getAllMedias }) => {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    for (let key in videos) {
      formData.append("videos", videos[key]);
    }

    formData.append("name", name);

    //  api call 👍
    axios
      .post(`${BACKEND_URI}/api/v1/media/create`, formData)
      .then((res) => {
        getAllMedias();
        alert(`Submitted successful!`);
      })
      .catch((err) => {
        console.log(err);
        alert(`Error happened!`);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="videos">Upload Videos</label>
          <input
            type="file"
            className="form-control"
            multiple
            accept=".mp4, .mkv"
            onChange={(e) => setVideos(e.target.files)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
