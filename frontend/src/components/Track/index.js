import axios from "axios";
import { useEffect, useState } from "react";

const Track = ({ artist, title }) => {
  const [track, setTrack] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      const data = await axios("/api/songsterr", {
        data: { artist, title },
        method: "POST",
      });

      console.log(data.data[0]);
      return mounted && setTrack(data.data[0]);
    })();

    return () => (mounted = false);
  }, [artist, title]);

  return (
    <div>
      <a
        href={`http://www.songsterr.com/a/wa/song?id=${track.songId}`}
        rel="noreferrer"
        target="_blank"
      >
        Get tabs
      </a>
    </div>
  );
};
export default Track;
