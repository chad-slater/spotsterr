import axios from "axios";
import { useEffect, useState } from "react";

const Track = ({ artist, spotifyTrackId, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [songsterrData, setSongsterrData] = useState("");
  const [spotifyAudioFeaturesData, setSpotifyAudioFeaturesData] = useState("");
  const [spotifyTrackData, setSpotifyTrackData] = useState("");

  // useEffect(() => {
  //   let mounted = true;

  //   (async () => {
  //     const { data } = await axios("/api/songsterr", {
  //       data: { artist, title },
  //       method: "POST",
  //     });

  //     console.log("Songsterr", data[0]);
  //     return mounted && setSongsterrData(data[0] || 0);
  //   })();

  //   (async () => {
  //     const { data } = await axios(`/api/spotify/tracks/${spotifyTrackId}`);

  //     console.log("Spotify Track", data);
  //     return mounted && setSpotifyTrackData(data);
  //   })();

  //   (async () => {
  //     const { data } = await axios(
  //       `/api/spotify/audio-features/${spotifyTrackId}`
  //     );

  //     console.log("Spotify Audio Features", data.audio_features[0].tempo);
  //     return mounted && setSpotifyAudioFeaturesData(data);
  //   })();

  //   return () => (mounted = false);
  // }, [artist, spotifyTrackId, title]);

  useEffect(() => {
    songsterrData &&
      spotifyAudioFeaturesData &&
      spotifyTrackData &&
      setIsLoading(false);
  }, [songsterrData, spotifyAudioFeaturesData, spotifyTrackData]);

  const loadTrackData = () => {
    (async () => {
      const { data } = await axios("/api/songsterr", {
        data: { artist, title },
        method: "POST",
      });

      console.log("Songsterr", data[0]);
      setSongsterrData(data[0]);
    })();

    (async () => {
      const { data } = await axios(`/api/spotify/tracks/${spotifyTrackId}`);

      console.log("Spotify Track", data);
      setSpotifyTrackData(data);
    })();

    (async () => {
      const { data } = await axios(
        `/api/spotify/audio-features/${spotifyTrackId}`
      );

      console.log("Spotify Audio Features", data.audio_features[0].tempo);
      setSpotifyAudioFeaturesData(data);
    })();
  };

  return isLoading ? (
    <>
      <div onClick={() => loadTrackData()}>
        <p>Artist: {artist}</p>
        <p>Track: {title}</p>
      </div>
    </>
  ) : (
    <>
      <p>Artist: {artist}</p>
      <p>Track: {title}</p>
      <img
        src={spotifyTrackData && spotifyTrackData.album.images.at(-1).url}
        alt={`${spotifyTrackData && spotifyTrackData.artists[0].name} - ${
          spotifyTrackData.name
        } album art`}
      />
      <p>
        Tempo: ~
        {spotifyAudioFeaturesData &&
          Math.round(spotifyAudioFeaturesData.audio_features[0].tempo)}{" "}
        BPM
      </p>
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
