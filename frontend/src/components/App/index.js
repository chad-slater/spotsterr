import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { cookiesToObj, loginUrl } from "../../utils";

const App = () => {
  const [isSpotifyAuth, setIsSpotifyAuth] = useState(false);

  useEffect(() => {
    let mounted = true;
    const cookies = cookiesToObj(document.cookie);

    if (cookies) {
      cookies.isSpotifyAccessToken && setIsSpotifyAuth(true);

      if (cookies.isSpotifyRefreshToken && !cookies.isSpotifyAccessToken) {
        mounted &&
          (async () => {
            await axios("/api/spotify/refresh");
          })();
        setIsSpotifyAuth(true);
      }

      !cookies.isSpotifyRefreshToken && setIsSpotifyAuth(false);
    }

    return () => (mounted = false);
  }, []);

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
