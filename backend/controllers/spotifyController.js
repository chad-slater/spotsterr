const asyncHandler = require("express-async-handler");
const axios = require("axios").default;

const frontend_redirect_uri =
  process.env.NODE_ENV === "production"
    ? "https://spotsterr.herokuapp.com/"
    : "http://localhost:3000/";

// @desc Get current user's playlists
// @route GET /api/spotify/playlists/:id
const getPlaylist = asyncHandler(async (req, res, next) => {
  const playlistId = req.params.playlistId;
  try {
    const data = await axios(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: "Bearer " + req.cookies.spotifyAccessToken,
        },
      }
    );
    res.json(data.data);
  } catch (err) {
    const error = new Error(err.response.statusText);
    error.stack = err.response.data;
    error.statusCode = err.response.status;
    next(error);
  }
});

// @desc Get current user's playlists
// @route GET /api/spotify/me/playlists
const getPlaylists = asyncHandler(async (req, res, next) => {
  try {
    const data = await axios(
      "https://api.spotify.com/v1/me/playlists?limit=50",
      {
        headers: {
          Authorization: "Bearer " + req.cookies.spotifyAccessToken,
        },
      }
    );

    res.json(data.data);
  } catch (err) {
    const error = new Error(err.response.statusText);
    error.stack = err.response.data;
    error.statusCode = err.response.status;
    next(error);
  }
});

// @desc Get Spotify Track from ID
// @route GET /api/spotify/track/:id
const getTrack = asyncHandler(async (req, res, next) => {
  try {
    const trackId = req.params.trackId;
    const data = await axios(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: "Bearer " + req.cookies.spotifyAccessToken,
      },
    });

    res.json(data.data);
  } catch (err) {
    const error = new Error(err.response.statusText);
    error.stack = err.response.data;
    error.statusCode = err.response.status;
    next(error);
  }
});

// @desc Get Spotify Track from ID
// @route GET /api/spotify/audio-features/:id
const getAudioFeatures = asyncHandler(async (req, res) => {
  try {
    const trackId = req.params.trackId;
    const data = await axios(
      `https://api.spotify.com/v1/audio-features?ids=${trackId}`,
      {
        headers: {
          Authorization: "Bearer " + req.cookies.spotifyAccessToken,
        },
      }
    );
    res.json(data.data);
  } catch (err) {
    const error = new Error(err.response.statusText);
    error.stack = err.response;
    error.statusCode = err.response.status;
    next(error);
  }
});

module.exports = {
  getAudioFeatures,
  getPlaylist,
  getPlaylists,
  getTrack,
};
