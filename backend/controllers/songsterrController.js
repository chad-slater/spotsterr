const asyncHandler = require("express-async-handler");
const axios = require("axios").default;

// @desc Get tabs
// @route POST /api/songsterr
// @access Public
const getTabs = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please provide track details.");
  }

  const { artist, title } = req.body;
  const params = new URLSearchParams({
    pattern: artist + " " + title,
  });

  const tabs = await axios.get("https://www.songsterr.com/api/songs", {
    params,
  });

  res.status(200).json(tabs.data);
});

module.exports = {
  getTabs,
};
