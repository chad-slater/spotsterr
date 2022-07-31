import { useEffect, useState } from "react";

import SpotifyPlaylists from "../SpotifyPlaylists";
import Track from "../Track";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.cookie && setIsLoggedIn(document.cookie.split("=")[1]);
  }, []);

  return (
    <>
      {!isLoggedIn && (
        <a href="http://localhost:5000/api/spotify/login">Authorize Spotify</a>
      )}
      <SpotifyPlaylists isLoggedIn={isLoggedIn} />
    </>
  );
};
export default App;
