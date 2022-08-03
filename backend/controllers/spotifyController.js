const asyncHandler = require("express-async-handler");
const axios = require("axios").default;

// @desc Get current user's playlists
// @route GET /api/spotify/playlists/:id
const getPlaylist = asyncHandler(async (req, res) => {
  const playlistId = req.params.playlistId;
  const data = await axios(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: "Bearer " + req.cookies.spotifyAccessToken,
      },
    }
  );

  res.json(data.data);
});

// @desc Get current user's playlists
// @route GET /api/spotify/me/playlists
const getPlaylists = asyncHandler(async (req, res) => {
  const data = await axios("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: "Bearer " + req.cookies.spotifyAccessToken,
    },
  });

  res.json(data.data);
});

// @desc Get Spotify Track from ID
// @route GET /api/spotify/tracks/:id
const getTrack = asyncHandler(async (req, res) => {
  const trackId = req.params.trackId;
  const data = await axios(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: "Bearer " + req.cookies.spotifyAccessToken,
    },
  });

  res.json(data.data);
});

// @desc Get Spotify Track from ID
// @route GET /api/spotify/audio-features/:id
const getAudioFeatures = asyncHandler(async (req, res) => {
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
});

module.exports = {
  getAudioFeatures,
  getPlaylist,
  getPlaylists,
  getTrack,
};
