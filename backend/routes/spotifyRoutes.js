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
  getPlaylist,
  getPlaylists,
  getTrack,
} = require("../controllers/spotifyController");

router.get("/callback", callback);
router.get("/check", check);
router.get("/login", logIn);
router.get("/refresh", refresh);

router.get("/audio-features/:trackId", getAudioFeatures);
router.get("/playlists/:playlistId", getPlaylist);
router.get("/me/playlists", getPlaylists);
router.get("/tracks/:trackId", getTrack);

module.exports = router;
