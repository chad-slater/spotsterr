import axios from "axios";
import { useEffect, useState } from "react";

import "./index.css";

const Track = ({ artist, spotifyTrackId, title }) => {
  const cleanedTitle = title.replace(/ *\([^)]*\) */g, "").split("-")[0];
  const [isLoading, setIsLoading] = useState(true);
  const [songsterrData, setSongsterrData] = useState("");
  const [spotifyAudioFeaturesData, setSpotifyAudioFeaturesData] = useState("");
  const [spotifyTrackData, setSpotifyTrackData] = useState("");

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
      setSongsterrData(data[0] || "No Spotsterr data");
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
      <div className="track" onClick={() => loadTrackData()}>
        <p>Artist: {artist}</p>
        <p>Track: {title}</p>
      </div>
    </>
  ) : (
    <div className="track">
      <p>Artist: {artist}</p>
      <p>Track: {title}</p>
      <img
        src={spotifyTrackData && spotifyTrackData.album.images.at(-2).url}
        alt={`${spotifyTrackData && spotifyTrackData.artists[0].name} - ${
          spotifyTrackData.name
        } album art`}
        width="200"
        height="200"
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
          `http://www.songsterr.com/a/wa/bestMatchForQueryString?s=${cleanedTitle}&a=${artist}`
        }
        rel="noreferrer"
        target="_blank"
      >
        Get tabs
      </a>
    </div>
  );
};
export default Track;
