const express = require("express");
const router = express.Router();
const {
  callback,
  check,
  logIn,
  refresh,
} = require("../controllers/spotifyAuthController");

const {
  getAudioFeatures,
  getPlaylists,
  getTrack,
} = require("../controllers/spotifyController");

router.get("/callback", callback);
router.get("/check", check);
router.get("/login", logIn);
router.get("/refresh", refresh);

router.get("/audio-features/:id", getAudioFeatures);
router.get("/me/playlists", getPlaylists);
router.get("/tracks/:id", getTrack);

module.exports = router;
