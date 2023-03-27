import React from "react";
import { BACKEND_URI } from "../config/constants";

const UploadList = ({ medias }) => {
  console.log(medias);
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th width="200">Name</th>
                <th>Videos</th>
              </tr>
            </thead>
            <tbody>
              {medias &&
                medias.map((media) => {
                  return (
                    <tr key={media._id}>
                      <td>{media.name}</td>
                      <td>
                        {media.videos.map((video) => {
                          return (
                            <video
                              width="320"
                              height="240"
                              preload="auto"
                              controls
                            >
                              <source src={`${BACKEND_URI}${video}`} />
                              Your browser does not support the video tag.
                            </video>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UploadList;
