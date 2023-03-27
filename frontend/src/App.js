import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadList from "./components/UploadList";
import UploadForm from "./components/UploadForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "./config/constants";

function App() {
  const [medias, setMedias] = useState([]);

  // get all videos from db

  const getAllMedias = () => {
    // api call 👍

    axios
      .get(`${BACKEND_URI}/api/v1/media/all`)
      .then((res) => {
        setMedias(res.data.media);
        // console.log(res.data);
      })
      .catch((err) => {
        setMedias([]);
        alert("error occurred!");
        console.log(err.message);
      });
  };

  useEffect(() => {
    getAllMedias();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div
            className="card"
            style={{
              height: "auto",
              width: "800px",
              margin: "40px",
              border: "1px solid black",
            }}
          >
            <div className="card-body">
              <UploadForm getAllMedias={getAllMedias} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="card"
            style={{
              height: "auto",
              width: "800px",
              margin: "40px",
              border: "1px solid black",
            }}
          >
            <div className="card-body">
              <UploadList medias={medias} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
