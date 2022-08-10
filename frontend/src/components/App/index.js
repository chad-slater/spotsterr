import React, { useState } from "react";
import { Link } from "react-router-dom";

import { loginUrl } from "../../utils";
import useCheckCookies from "../../hooks/useCheckCookies";

import { Routes, Route } from "react-router-dom";

import FourOhFour from "../FourOhFour";
import Playlist from "../Playlist";
import Playlists from "../Playlists";
import Track from "../Track";

export const AuthContext = React.createContext(undefined);

const App = () => {
  const [isSpotifyAuth, setIsSpotifyAuth] = useState(false);

  useCheckCookies(setIsSpotifyAuth);

  return (
    <div className="container mx-auto px-4">
      <div className="min-h-screen">
        <header>
          <nav className="flex items-center justify-around">
            <p className="font-bold my-4 text-5xl text-center tracking-widest sm:text-6xl">
              <Link to={"/"}>
                Spot<span className="bg-slate-300">sterr</span>
              </Link>
            </p>
          </nav>
        </header>

        <main>
          <div className="my-8 text-center">
            {!isSpotifyAuth && (
              <>
                <a
                  className="bg-slate-300 drop-shadow font-medium px-4 py-2 rounded-md hover:bg-slate-200"
                  href={loginUrl}
                >
                  Authorize Spotify
                </a>
              </>
            )}
          </div>

          <AuthContext.Provider value={[isSpotifyAuth, setIsSpotifyAuth]}>
            <Routes>
              <Route index element={<Playlists />} />
              <Route path="/playlist/:playlistId" element={<Playlist />} />
              <Route path="/track/:trackId" element={<Track />} />
              <Route path="*" element={<FourOhFour />} />
            </Routes>
          </AuthContext.Provider>
        </main>
      </div>

      <footer className="font-medium my-8 text-center">
        <a
          href="https://github.com/chad-slater/spotsterr"
          rel="noopener noreferrer"
          target="_blank"
        >
          View source on GitHub
        </a>
      </footer>
    </div>
  );
};
export default App;
