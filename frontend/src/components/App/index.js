import axios from "axios";
import { useEffect, useState } from "react";

import SpotifyPlaylists from "../SpotifyPlaylists";

const App = () => {
  const [isSpotifyAuthorized, setIsSpotifyAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    document.cookie
      ? setIsSpotifyAuthorized(document.cookie.split("=")[1])
      : mounted &&
        (async () => {
          const response = await axios.get("/api/spotify/refresh");
          response.status === 200 && setIsSpotifyAuthorized(true);
        })();

    return () => (mounted = false);
  }, []);

  return (
    <>
      {!isSpotifyAuthorized && (
        <a href="http://localhost:5000/api/spotify/login">Authorize Spotify</a>
      )}
      <SpotifyPlaylists isSpotifyAuthorized={isSpotifyAuthorized} />
    </>
  );
};
export default App;
