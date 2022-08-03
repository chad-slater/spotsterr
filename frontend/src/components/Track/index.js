import axios from "axios";
import { useEffect, useState } from "react";

const Track = ({ artist, spotifyId, title }) => {
  const [loading, setLoading] = useState(true);
  const [songsterrData, setSongsterrData] = useState("");
  const [spotifyAudioFeaturesData, setSpotifyAudioFeaturesData] = useState("");
  const [spotifyTrackData, setSpotifyTrackData] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      const data = await axios("/api/songsterr", {
        data: { artist, title },
        method: "POST",
      });

      console.log("Songsterr", data.data[0]);
      return mounted && setSongsterrData(data.data[0]);
    })();

    (async () => {
      const data = await axios(`api/spotify/tracks/${spotifyId}`);

      console.log("Spotify Track", data.data);
      return mounted && setSpotifyTrackData(data.data);
    })();

    (async () => {
      const data = await axios(`/api/spotify/audio-features/${spotifyId}`);

      console.log("Spotify Audio Features", data.data.audio_features[0].tempo);
      return mounted && setSpotifyAudioFeaturesData(data.data);
    })();

    return () => (mounted = false);
  }, [artist, spotifyId, title]);

  useEffect(() => {
    songsterrData &&
      spotifyAudioFeaturesData &&
      spotifyTrackData &&
      setLoading(false);
  }, [songsterrData, spotifyAudioFeaturesData, spotifyTrackData]);

  return loading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <img
        src={spotifyTrackData && spotifyTrackData.album.images.at(-1).url}
        alt={`${spotifyTrackData && spotifyTrackData.artists[0].name} - ${
          spotifyTrackData.name
        } album art`}
      />
      <p>Artist: {spotifyTrackData && spotifyTrackData.artists[0].name}</p>
      <p>Track: {spotifyTrackData && spotifyTrackData.name}</p>
      <a
        href={
          songsterrData &&
          `http://www.songsterr.com/a/wa/song?id=${songsterrData.songId}`
        }
        rel="noreferrer"
        target="_blank"
      >
        Get tabs
      </a>
    </>
  );
};
export default Track;
