const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const { createVideo, getAll } = require("../controllers/mediaController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }

    cb(null, "public/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// upload a video on backend root
const upload = multer({
  storage: storage,

  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".mkv" && ext !== ".mp4") {
      return cb(new Error(`Only videos are allowed!`));
    }

    cb(null, true);
  },
});

// get all videos
router.get("/all", getAll); // http://localhost:5000/api/v1/media/all

// create video
router.post(
  "/create",
  upload.fields([
    {
      name: "videos",
      maxCount: 5,
    },
  ]),
  createVideo
); // http://localhost:5000/api/v1/media/create

module.exports = router;
