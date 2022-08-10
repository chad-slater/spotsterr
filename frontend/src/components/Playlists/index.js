import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LoadingSpinner from "../LoadingSpinner";

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
  }, [isLoading]);

  useEffect(() => {
    playlists && setIsLoading(false);
  }, [playlists]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <h2 className="font-bold my-4 text-xl text-center">
        Your Spotify Playlists
      </h2>
      <div className="gap-8 grid grid-cols-1 my-8 sm:grid-cols-2 md:grid-cols-4">
        {playlists &&
          playlists.map((playlist) => {
            return (
              <div
                className="bg-slate-300 overflow-hidden p-3 rounded-xl text-center hover:bg-slate-200"
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
