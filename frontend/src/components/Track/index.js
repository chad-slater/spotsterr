import axios from "axios";
import { useEffect, useState } from "react";

import "./index.css";
import { pitch, tuningToPitch } from "../../utils";

const Track = ({ album, albumArtUrl, artist, spotifyTrackId, title }) => {
  const cleanedTitle = title
    .replace(/ *\([^)]*\) */g, "")
    .split("-")[0]
    .trim();
  const [isLoading, setIsLoading] = useState(true);
  const [songsterrData, setSongsterrData] = useState("");
  const [spotifyAudioFeaturesData, setSpotifyAudioFeaturesData] = useState("");

  useEffect(() => {
    songsterrData && spotifyAudioFeaturesData && setIsLoading(false);
  }, [songsterrData, spotifyAudioFeaturesData]);

  const loadTrackData = () => {
    (async () => {
      const { data } = await axios("/api/songsterr", {
        data: { artist, title: cleanedTitle },
        method: "POST",
      });

      data.length > 0 ? setSongsterrData(data[0]) : setSongsterrData(-1);
    })();

    (async () => {
      const { data } = await axios(
        `/api/spotify/audio-features/${spotifyTrackId}`
      );

      setSpotifyAudioFeaturesData(data);
    })();
  };

  const trackInfo = () => {
    return (
      <>
        <p>Artist: {artist}</p>
        <p>Album: {album}</p>
        <p>Track: {title}</p>
        <img
          src={albumArtUrl}
          alt={`${artist} - ${title} album art`}
          width="200"
          height="200"
        />
      </>
    );
  };

  return isLoading ? (
    <>
      <div className="track" onClick={() => loadTrackData()}>
        {trackInfo()}
      </div>
    </>
  ) : (
    <div className="track">
      {trackInfo()}
      <p>
        Key: {pitch[Math.round(spotifyAudioFeaturesData.audio_features[0].key)]}
      </p>
      {songsterrData !== -1 && (
        <p>Tuning: {tuningToPitch(songsterrData.tracks[0].tuning).join(" ")}</p>
      )}
      <p>
        Tempo: ~{Math.round(spotifyAudioFeaturesData.audio_features[0].tempo)}{" "}
        BPM
      </p>
      <a
        href={`http://www.songsterr.com/a/wa/bestMatchForQueryString?s=${cleanedTitle}&a=${artist}`}
        rel="noreferrer"
        target="_blank"
      >
        Get tabs
      </a>
    </div>
  );
};
export default Track;
