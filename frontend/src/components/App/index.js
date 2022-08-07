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
            setIsSpotifyAuth(true);
          })();
      }

      !cookies.isSpotifyRefreshToken && setIsSpotifyAuth(false);
    }

    return () => (mounted = false);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="font-bold my-4 text-4xl text-center">
        <Link to={"/"}>Spotsterr</Link>
      </h1>

      {!isSpotifyAuth && <a href={loginUrl}>Authorize Spotify</a>}

      {isSpotifyAuth && <Outlet />}
    </div>
  );
};
export default App;
