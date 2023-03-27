const express = require("express");
const app = express();
const colors = require("colors");
const cors = require("cors");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;

// ALL ROUTES
const mediaRoute = require("./routes/media");

// connect to db
const connectedDB = require("./db/connect");
connectedDB();

app.use(express.json());
app.use(cors());
app.use("/api/v1/media", mediaRoute);
// video tag controls from backend must be necessary to play the video on frontend
app.use("/public", express.static(path.join(__dirname, "public")));

// listen app
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
