import { useEffect, useState } from "react";

import SpotifyPlaylists from "../SpotifyPlaylists";

const App = () => {
  const [isSpotifyAuthorized, setIsSpotifyAuthorized] = useState(false);

  useEffect(() => {
    document.cookie.split("=")[0] === "isSpotifyAuthorized" &&
      setIsSpotifyAuthorized(true);
  }, []);

  return (
    <>
      <h1>Spotsterr</h1>
      <h2>Spotify Playlists</h2>
      {!isSpotifyAuthorized && (
        <a href="http://localhost:5000/api/spotify/login">Authorize Spotify</a>
      )}
      <SpotifyPlaylists isSpotifyAuthorized={isSpotifyAuthorized} />
    </>
  );
};
export default App;
