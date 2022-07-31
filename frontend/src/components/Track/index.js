import axios from "axios";
import { useEffect, useState } from "react";

const Track = ({ artist, title }) => {
  const [songId, setSongId] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      const data = await axios("/api/songsterr", {
        method: "POST",
        data: { artist, title },
      });

      console.log(data.data);
      return mounted && setSongId(data.data[0].songId);
    })();

    return () => (mounted = false);
  }, [artist, title]);

  return (
    <div>
      <a
        href={`http://www.songsterr.com/a/wa/song?id=${songId}`}
        rel="noreferrer"
        target="_blank"
      >
        Get tabs
      </a>
    </div>
  );
};
export default Track;
