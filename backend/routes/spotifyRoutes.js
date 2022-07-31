const express = require("express");
const router = express.Router();
const {
  callback,
  getPlaylists,
  logIn,
  refresh,
} = require("../controllers/spotifyController");

router.get("/callback", callback);
router.get("/login", logIn);
router.get("/me/playlists", getPlaylists);
router.get("/refresh", refresh);

module.exports = router;
