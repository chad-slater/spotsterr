import axios from "axios";
import { useEffect, useState } from "react";
import Playlists from "../Playlists";
import Track from "../Track";

const App = () => {
  const [authCookies, setAuthCookies] = useState(null);
  const [isSpotifyAuth, setIsSpotifyAuth] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios("/api/spotify/check");
      setAuthCookies(data);
    })();
  }, []);

  useEffect(() => {
    if (authCookies) {
      authCookies.spotifyAccessToken && setIsSpotifyAuth(true);

      if (authCookies.spotifyRefreshToken && !authCookies.spotifyAccessToken) {
        (async () => {
          axios("/api/spotify/refresh");
        })();
        setIsSpotifyAuth(true);
      }

      !authCookies.spotifyRefreshToken && setIsSpotifyAuth(false);
    }
  }, [authCookies]);

  return (
    <>
      {/* <h1>Spotsterr</h1>
      <h2>Spotify Playlists</h2> */}
      {!isSpotifyAuth && (
        <a href="http://localhost:5000/api/spotify/login">Authorize Spotify</a>
      )}
      {/* <SpotifyPlaylists isSpotifyAccess={isSpotifyAccess} /> */}
      <Track
        artist="Lorna Shore"
        spotifyId="0O26gtfjuscAOnQobjNPPL"
        title={"To the Hellfire"}
      />
    </>
  );
};
export default App;
