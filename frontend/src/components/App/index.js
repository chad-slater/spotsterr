import axios from "axios";
import { useEffect, useState } from "react";

import { cookiesToObj } from "../../utils";
import SpotifyPlaylists from "../SpotifyPlaylists";
import Track from "../Track";

const App = () => {
  const [isSpotifyAccess, setIsSpotifyAccess] = useState(false);
  const [isSpotifyRefresh, setIsSpotifyRefresh] = useState(false);

  useEffect(() => {
    const cookies = cookiesToObj;

    cookies.hasOwnProperty("isSpotifyAccess")
      ? setIsSpotifyAccess(true)
      : setIsSpotifyAccess(false);
    cookies.hasOwnProperty("isSpotifyRefresh")
      ? setIsSpotifyRefresh(true)
      : setIsSpotifyRefresh(false);
    // (async () => axios("/api/spotify/refresh"))();
  }, []);

  return (
    <>
      {/* <h1>Spotsterr</h1>
      <h2>Spotify Playlists</h2> */}
      {!isSpotifyAccess && (
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
