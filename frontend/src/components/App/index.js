import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { loginUrl } from "../../utils";

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
      <h1>
        <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
          Spotsterr
        </Link>
      </h1>

      {!isSpotifyAuth && <a href={loginUrl}>Authorize Spotify</a>}

      {isSpotifyAuth && <Outlet />}
    </>
  );
};
export default App;
