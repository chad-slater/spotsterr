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
      <h2 className="font-bold text-xl text-center">Your Spotify Playlists</h2>
      <div className="gap-8 grid grid-cols-1 my-8 sm:grid-cols-2 md:grid-cols-4">
        {playlists &&
          playlists.map((playlist) => {
            return (
              <div
                className="bg-slate-200 overflow-hidden p-3 rounded-xl text-center"
                key={playlist.id}
              >
                <Link to={`/playlist/${playlist.id}`}>
                  <img
                    className="rounded-xl"
                    src={playlist.images[0].url}
                    alt={`${playlist.name} playlist`}
                  />
                  <h3 className="font-medium my-4 truncate">{playlist.name}</h3>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Playlists;
