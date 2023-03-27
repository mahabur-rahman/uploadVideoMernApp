const Media = require("../models/Media");

// create video
const createVideo = async (req, res) => {
  const { name } = req.body;

  let videosPaths = [];

  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    for (let video of req.files.videos) {
      videosPaths.push("/" + video.path);
    }
  }

  try {
    const createMedia = await Media.create({
      name,
      videos: videosPaths,
    });

    //  save on db
    const savedMedia = await createMedia.save();

    return res.json({ message: "Media created successfully", savedMedia });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

// get all videos
const getAll = async (req, res) => {
  try {
    const media = await Media.find();

    return res.status(200).json({
      success: true,
      message: `Get all media successful.`,

      media: media,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  getAll,
  createVideo,
};
