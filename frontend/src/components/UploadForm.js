import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";

const UploadForm = ({ getAllMedias }) => {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);
  const [upload, setUpload] = useState(null);

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
      .post(`${BACKEND_URI}/api/v1/media/create`, formData, {
        onUploadProgress: (data) => {
          setUpload(Math.round((data.loaded / data.total) * 100));
        },
      })
      .then((res) => {
        getAllMedias();
        alert(`Submitted successful!`);
      })
      .catch((err) => {
        console.log(err);
        alert(`Error happened!`);
      });
  };

  console.log("upload is ", upload);

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

        {upload && (
          <div className="progress mt-2">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={upload}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${upload}%` }}
            >
              {`${upload}%`}
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
