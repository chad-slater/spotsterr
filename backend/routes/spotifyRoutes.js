const express = require("express");
const router = express.Router();
const {
  callback,
  getAudioFeatures,
  getPlaylists,
  getTrack,
  logIn,
  refresh,
} = require("../controllers/spotifyController");

router.get("/audio-features/:id", getAudioFeatures);
router.get("/callback", callback);
router.get("/login", logIn);
router.get("/me/playlists", getPlaylists);
router.get("/refresh", refresh);
router.get("/tracks/:id", getTrack);

module.exports = router;
