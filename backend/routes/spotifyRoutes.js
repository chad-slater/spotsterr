const express = require("express");
const router = express.Router();
const {
  callback,
  logIn,
  refresh,
} = require("../controllers/spotifyController");

router.get("/login", logIn);
router.get("/callback", callback);
router.get("/refresh", refresh);

module.exports = router;
