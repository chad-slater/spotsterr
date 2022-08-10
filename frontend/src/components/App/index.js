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
      <header>
        <nav className="flex items-center justify-around">
          <p className="font-bold my-4 text-5xl text-center sm:text-6xl">
            <Link to={"/"}>Spotsterr</Link>
          </p>
        </nav>
      </header>

      <main>
        <div className="text-center">
          {!isSpotifyAuth && (
            <>
              <p className="my-8">
                Find tabs on Songsterr for tracks from your Spotify playlists.
              </p>
              <a
                className="bg-slate-300 drop-shadow font-medium my-8 px-4 py-2 rounded-md hover:bg-slate-200"
                href={loginUrl}
              >
                Authorize Spotify
              </a>
            </>
          )}
        </div>
        <Outlet />
      </main>
    </div>
  );
};
export default App;
