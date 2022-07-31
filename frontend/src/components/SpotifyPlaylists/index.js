import { useEffect, useState } from "react";
import axios from "axios";

const SpotifyPlaylists = ({ isLoggedIn }) => {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const data = await axios("/api/spotify/me/playlists");

      return mounted && setPlaylists(data.data.items);
    })();

    return () => (mounted = false);
  }, []);

  return (
    <>
      {playlists &&
        playlists.map((playlist) => {
          return <div key={playlist.id}>{playlist.name}</div>;
        })}
    </>
  );
};
export default SpotifyPlaylists;
