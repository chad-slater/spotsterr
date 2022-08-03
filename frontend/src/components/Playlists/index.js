import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Playlists = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await axios("/api/spotify/me/playlists");
      return mounted && setPlaylists(data.items);
    })();

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    playlists && setIsLoading(false);
  }, [playlists]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      {playlists &&
        playlists.map((playlist) => {
          return (
            <div key={playlist.id}>
              <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
            </div>
          );
        })}
    </>
  );
};
export default Playlists;