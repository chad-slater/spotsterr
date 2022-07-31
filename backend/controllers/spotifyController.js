const asyncHandler = require("express-async-handler");
const axios = require("axios").default;
const { v4: uuidv4 } = require("uuid");

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = "http://localhost:5000/api/spotify/callback";

// @desc Callback to Spotify
// @route POST /api/spotify/callback
// @access Private
const callback = asyncHandler(async (req, res) => {
  const code = req.query.code || null;
  const reqState = req.query.state || null;

  if (
    req.cookies.spotifyState === null ||
    reqState !== req.cookies.spotifyState
  ) {
    const params = new URLSearchParams({
      error: "state_mismatch",
    });
    return res.redirect("/#" + params.toString());
  }

  const data = new URLSearchParams({
    code: code,
    grant_type: "authorization_code",
    redirect_uri: redirect_uri,
  });
  const stringifiedData = data.toString();

  const spotifyTokens = await axios.post(
    "https://accounts.spotify.com/api/token",
    stringifiedData,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  res.cookie("spotifyAccessToken", spotifyTokens.data.access_token, {
    httpOnly: true,
    maxAge: 1000 * 3600,
  });
  res.cookie("spotifyRefreshToken", spotifyTokens.data.refresh_token, {
    httpOnly: true,
  });
  res.redirect("http://localhost:3000/");
});

// @desc Log in to Spotify
// @route POST /api/spotify/login
// @access Public
const logIn = (req, res) => {
  const state = uuidv4();
  const scope = "user-read-private user-read-email";
  const params = new URLSearchParams({
    client_id: client_id,
    redirect_uri: redirect_uri,
    response_type: "code",
    scope: scope,
    state: state,
  });

  res.cookie("spotifyState", state, {
    httpOnly: true,
    maxAge: 1000 * 30,
  });
  res.redirect("https://accounts.spotify.com/authorize?" + params.toString());
};

// @desc Refresh Spotify access token
// @route POST /api/spotify/refresh
// @access Private
const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.spotifyRefreshToken;

  const data = new URLSearchParams({
    grant_type: "authorization_code",
    refresh_token: refreshToken,
  });
  const stringifiedData = data.toString();

  const spotifyTokens = await axios.post(
    "https://accounts.spotify.com/api/token",
    stringifiedData,
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  res.cookie("spotifyAccessToken", spotifyTokens.data.access_token, {
    httpOnly: true,
    maxAge: 1000 * 3600,
  });
  res.redirect("http://localhost:3000/");
});

module.exports = {
  callback,
  logIn,
  refresh,
};
