import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    <p>Loading...</p>
  ) : (
    <>
      <h2 className="font-bold mb-2 text-xl text-center">
        Your Spotify Playlist - {playlistData.name}
      </h2>
      <table className="border-collapse border border-slate-400 border-spacing-2 my-8 table-fixed w-full">
        <thead>
          <tr>
            <th className="p-2 w-full sm:w-1/2 md:w-1/3">Track</th>
            <th className="hidden sm:table-cell">Artist</th>
            <th className="hidden md:table-cell">Album</th>
          </tr>
        </thead>
        <tbody>
          {playlistData.tracks.items.map((track) => {
            const { id: trackId, name: title, artists, album } = track.track;

            return (
              <tr
                className="hover:bg-slate-100 hover:cursor-pointer"
                key={trackId}
                onClick={() => handleRowClick(trackId)}
              >
                <td className="p-4 truncate">{title}</td>
                <td className="hidden p-4 truncate sm:table-cell">
                  {artists[0].name}
                </td>
                <td className="hidden p-4 truncate md:table-cell">
                  {album.name}
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
