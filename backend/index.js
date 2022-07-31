require("dotenv").config();
const axios = require("axios").default;
const { errorHandler } = require("./middleware/errorMiddleware");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const PORT = process.env.PORT || 5000;
const redirect_uri = "http://localhost:5000/api/spotify/callback";
let state;

app.use(express.json());

app.use("/api/songsterr", require("./routes/songsterrRoutes"));

app.get("/api/spotify/login", (req, res) => {
  console.log("Logging in!");
  state = uuidv4();
  const scope = "user-read-private user-read-email";
  const params = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  });

  res.redirect("https://accounts.spotify.com/authorize?" + params.toString());
});

app.get("/api/spotify/callback", (req, res) => {
  console.log("Calling back!");
  const cookies = {
    data: undefined,
  };
  const code = req.query.code || null;
  const reqState = req.query.state || null;

  if (state === null || reqState !== state) {
    console.log("state bad");
    const params = new URLSearchParams({
      error: "state_mismatch",
    });
    return res.redirect("/#" + params.toString());
  }

  const data = new URLSearchParams({
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  });
  const stringifiedData = data.toString();

  return axios
    .post("https://accounts.spotify.com/api/token", stringifiedData, {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("Sending token!");
        cookies.data = response.data;
      }
      console.log(cookies.data);
      res.cookie("spotify_auth", cookies.data.access_token, {
        httpOnly: true,
      });
      res.redirect("http://localhost:3000/");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Spotsterr listening on port http://localhost:${PORT}`);
});
