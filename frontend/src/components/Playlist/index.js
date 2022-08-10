import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LoadingSpinner from "../LoadingSpinner";
import { msToMinsSecs } from "../../utils";

const Playlist = () => {
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [playlistData, setPlaylistData] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await axios(`/api/spotify/playlists/${playlistId}`);

      return mounted && setPlaylistData(data);
    })();

    return () => (mounted = false);
  }, [playlistId]);

  useEffect(() => {
    playlistData && setIsLoading(false);
  }, [playlistData]);

  const handleRowClick = (trackId) => {
    navigate(`/track/${trackId}`);
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <h2 className="font-bold my-4 text-xl text-center">
        Playlist - {playlistData.name}
      </h2>
      <table className="border border-collapse border-slate-400 border-spacing-2 my-8 table-fixed w-full">
        <thead>
          <tr className="bg-slate-200">
            <th className="p-2 w-12 md:table-cell">#</th>
            <th className="p-2 md:w-1/2 md:table-cell">Title</th>
            <th className="hidden p-2 md:table-cell">Album</th>
            <th className="flex hidden p-2 md:table-cell">Duration</th>
          </tr>
        </thead>
        <tbody>
          {playlistData.tracks.items.map((track, i) => {
            const { id: trackId, name: title, artists, album } = track.track;
            const duration = msToMinsSecs(track.track.duration_ms);

            return (
              <tr
                className="hover:bg-slate-100 hover:cursor-pointer"
                key={trackId}
                onClick={() => handleRowClick(trackId)}
              >
                <td className="p-4 text-center">{i + 1}</td>
                <td className="flex p-4 truncate">
                  <img
                    src={album.images.at(-1).url}
                    alt={`${album.name} album cover`}
                  />
                  <div className="px-4 self-center truncate">
                    <p className="font-medium truncate">{title}</p>
                    <p className="text-sm truncate">{artists[0].name}</p>
                  </div>
                </td>
                <td className="hidden p-4 truncate md:table-cell">
                  {album.name}
                </td>
                <td className="hidden p-4 text-center truncate md:table-cell">
                  {duration}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Playlist;
