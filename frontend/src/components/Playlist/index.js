import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Track from "../Track";

const Playlist = () => {
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

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <h2>Your Spotify Playlist - {playlistData.name}</h2>
      {playlistData.tracks.items.map((track) => {
        return (
          <Track
            key={track.track.id}
            artist={track.track.artists[0].name}
            spotifyTrackId={track.track.id}
            title={track.track.name}
          />
        );
      })}
    </>
  );
};
export default Playlist;
