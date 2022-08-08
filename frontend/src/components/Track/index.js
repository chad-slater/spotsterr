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
      <div>Loading ...</div>
    </>
  ) : (
    <>
      <header className="flex flex-col items-center justify-around my-4 sm:flex-row sm:my-8">
        <img
          className="w-1/3"
          src={spotifyTrackData.albumArtUrl}
          alt={`${spotifyTrackData.artist} - ${spotifyTrackData.title} album art`}
        />
        <div className="flex flex-col m-4">
          <h1 className="font-bold my-2 text-4xl sm:text-6xl">
            {spotifyTrackData.title}
          </h1>
          <p>{spotifyTrackData.artist}</p>
        </div>
      </header>

      <table className="border border-collapse border-slate-400 border-spacing-2 my-8 table-fixed text-center w-full">
        <tbody>
          <tr>
            <th className="border bg-slate-200 border-slate-400 p-2 truncate">
              Key
            </th>
            <td className="border border-slate-400 p-2 truncate">
              {
                pitch[
                  Math.round(spotifyAudioFeaturesData.audio_features[0].key)
                ]
              }
            </td>
          </tr>
          <tr>
            <th className="border bg-slate-200 border-slate-400 p-2 truncate">
              Tempo
            </th>
            <td className="border border-slate-400 p-2 truncate">
              ~{Math.round(spotifyAudioFeaturesData.audio_features[0].tempo)}
            </td>
          </tr>
          {songsterrData !== -1 && songsterrData.guitarTuning && (
            <tr>
              <th className="border bg-slate-200 border-slate-400 p-2 truncate">
                Guitar
              </th>
              <td className="border border-slate-400 p-2 truncate">
                {songsterrData.guitarTuning.name}
              </td>
            </tr>
          )}
          {songsterrData !== -1 && songsterrData.bassTuning && (
            <tr>
              <th className="border bg-slate-200 border-slate-400 p-2 truncate">
                Bass
              </th>
              <td className="border border-slate-400 p-2 truncate">
                {songsterrData.bassTuning.name}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <a
        className="bg-slate-300 font-medium px-8 py-4 rounded-md hover:bg-slate-200"
        href={`http://www.songsterr.com/a/wa/bestMatchForQueryString?s=${spotifyTrackData.title}&a=${spotifyTrackData.artist}`}
        rel="noreferrer"
        target="_blank"
      >
        Get tabs
      </a>
    </>
  );
};
export default Track;
