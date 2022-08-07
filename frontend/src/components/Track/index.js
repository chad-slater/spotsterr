import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { cleanTitle, pitch, tuningNames, tuningToPitch } from "../../utils";

const Track = () => {
  const { trackId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [songsterrData, setSongsterrData] = useState("");
  const [spotifyAudioFeaturesData, setSpotifyAudioFeaturesData] = useState("");
  const [spotifyTrackData, setSpotifyTrackData] = useState("");

  useEffect(() => {
    let mounted = true;

    mounted &&
      (async () => {
        const { data } = await axios(`/api/spotify/audio-features/${trackId}`);

        setSpotifyAudioFeaturesData(data);
      })();

    mounted &&
      (async () => {
        const { data } = await axios(`/api/spotify/track/${trackId}`);
        const cleanedTitle = cleanTitle(data.name);

        setSpotifyTrackData({
          album: data.album.name,
          albumArtUrl: data.album.images[0].url,
          artist: data.artists[0].name,
          title: cleanedTitle,
        });
      })();

    return () => (mounted = false);
  }, [trackId]);

  useEffect(() => {
    let mounted = true;

    mounted &&
      spotifyTrackData &&
      (async () => {
        const artist = spotifyTrackData.artist;
        const title = spotifyTrackData.title;

        const { data } = await axios("/api/songsterr", {
          data: { artist, title },
          method: "POST",
        });

        if (data.length > 0) {
          const guitar = data[0].tracks.find(
            (track) => track.tuning.length >= 6
          );
          const bass = data[0].tracks.find(
            (track) => track.tuning.length === 4 || track.tuning.length === 5
          );

          const guitarPitch = tuningToPitch(guitar.tuning).join(" ");
          const bassPitch = tuningToPitch(bass.tuning).join(" ");

          return setSongsterrData({
            guitarTuning: {
              name: tuningNames[guitarPitch],
              tuning: guitarPitch,
            },
            bassTuning: {
              name: tuningNames[bassPitch],
              tuning: bassPitch,
            },
          });
        }

        setSongsterrData(-1);
      })();

    return () => (mounted = false);
  }, [spotifyTrackData]);

  useEffect(() => {
    songsterrData &&
      spotifyAudioFeaturesData &&
      spotifyTrackData &&
      setIsLoading(false);
  }, [songsterrData, spotifyAudioFeaturesData, spotifyTrackData]);

  return isLoading ? (
    <>
      <div className="track">Loading ...</div>
    </>
  ) : (
    <div className="track">
      <img
        src={spotifyTrackData.albumArtUrl}
        alt={`${spotifyTrackData.artist} - ${spotifyTrackData.title} album art`}
      />
      <p>Track: {spotifyTrackData.title}</p>
      <p>Artist: {spotifyTrackData.artist}</p>
      <p>Album: {spotifyTrackData.album}</p>{" "}
      <p>
        Key: {pitch[Math.round(spotifyAudioFeaturesData.audio_features[0].key)]}
      </p>
      {songsterrData !== -1 && songsterrData.guitarTuning && (
        <p>
          Guitar:
          {` ${songsterrData.guitarTuning.name} (${songsterrData.guitarTuning.tuning})`}
        </p>
      )}
      {songsterrData !== -1 && songsterrData.bassTuning && (
        <p>
          Bass:
          {` ${songsterrData.bassTuning.name} (${songsterrData.bassTuning.tuning})`}
        </p>
      )}
      <p>
        Tempo: ~{Math.round(spotifyAudioFeaturesData.audio_features[0].tempo)}{" "}
        BPM
      </p>
      <a
        href={`http://www.songsterr.com/a/wa/bestMatchForQueryString?s=${spotifyTrackData.title}&a=${spotifyTrackData.artist}`}
        rel="noreferrer"
        target="_blank"
      >
        Get tabs
      </a>
    </div>
  );
};
export default Track;
