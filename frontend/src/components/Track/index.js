import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../App";
import LoadingSpinner from "../LoadingSpinner";
import { cleanTitle, pitch, tuningNames, tuningToPitch } from "../../utils";
import useCheckCookies from "../../hooks/useCheckCookies";

const Track = () => {
  const { trackId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSpotifyAuth, setIsSpotifyAuth] = useContext(AuthContext);
  const [songsterrData, setSongsterrData] = useState("");
  const [spotifyAudioFeaturesData, setSpotifyAudioFeaturesData] = useState("");
  const [spotifyTrackData, setSpotifyTrackData] = useState("");

  useCheckCookies(setIsSpotifyAuth);

  useEffect(() => {
    let mounted = true;

    mounted &&
      isSpotifyAuth &&
      (async () => {
        const { data } = await axios(`/api/spotify/audio-features/${trackId}`);

        setSpotifyAudioFeaturesData(data.audio_features[0]);
      })();

    mounted &&
      isSpotifyAuth &&
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
  }, [isSpotifyAuth, trackId]);

  useEffect(() => {
    let mounted = true;

    mounted &&
      isSpotifyAuth &&
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
            guitar: tuningNames[guitarPitch] || guitarPitch,
            bass: tuningNames[bassPitch] || bassPitch,
          });
        }

        setSongsterrData(-1);
      })();

    return () => (mounted = false);
  }, [isSpotifyAuth, spotifyTrackData]);

  useEffect(() => {
    songsterrData &&
      spotifyAudioFeaturesData &&
      spotifyTrackData &&
      setIsLoading(false);
  }, [songsterrData, spotifyAudioFeaturesData, spotifyTrackData]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="flex flex-col items-center my-4 w-full sm:flex-row sm:justify-evenly sm:my-8">
        <img
          className="w-1/3"
          src={spotifyTrackData.albumArtUrl}
          alt={`${spotifyTrackData.artist} - ${spotifyTrackData.title} album art`}
        />
        <div className="flex flex-col justify-between m-4 text-center sm:text-left">
          <h1 className="font-bold my-2 text-4xl sm:text-5xl lg:text-6xl">
            {spotifyTrackData.title}
          </h1>
          <p>{spotifyTrackData.artist}</p>
        </div>
      </div>

      <table className="border border-collapse border-slate-400 border-spacing-2 mx-auto my-8 table-auto text-center w-full sm:w-3/4">
        <tbody>
          <tr>
            <th className="border bg-slate-200 border-slate-400 p-2 truncate">
              Key
            </th>
            <td className="border border-slate-400 p-2 truncate">
              {pitch[Math.round(spotifyAudioFeaturesData.key)]}
            </td>
          </tr>
          <tr>
            <th className="border bg-slate-200 border-slate-400 p-2 truncate">
              Tempo
            </th>
            <td className="border border-slate-400 p-2 truncate">
              ~{Math.round(spotifyAudioFeaturesData.tempo)} BPM
            </td>
          </tr>
          <tr>
            <th className="border bg-slate-200 border-slate-400 p-2 truncate">
              Danceability
            </th>
            <td className="border border-slate-400 p-2 truncate">
              {Math.round(spotifyAudioFeaturesData.danceability * 100)}%
            </td>
          </tr>
          {songsterrData !== -1 && songsterrData.guitar && (
            <tr>
              <th className="border bg-slate-200 border-slate-400 p-2 truncate">
                Guitar
              </th>
              <td className="border border-slate-400 p-2 truncate">
                {songsterrData.guitar}
              </td>
            </tr>
          )}
          {songsterrData !== -1 && songsterrData.bass && (
            <tr>
              <th className="border bg-slate-200 border-slate-400 p-2 truncate">
                Bass
              </th>
              <td className="border border-slate-400 p-2 truncate">
                {songsterrData.bass}
              </td>
            </tr>
          )}
          <tr>
            <td className="p-2" colSpan={2}>
              {songsterrData !== -1 ? (
                <a
                  className="font-bold text-center"
                  href={`http://www.songsterr.com/a/wa/bestMatchForQueryString?s=${spotifyTrackData.title}&a=${spotifyTrackData.artist}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Get tabs
                </a>
              ) : (
                "No tabs found"
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default Track;
