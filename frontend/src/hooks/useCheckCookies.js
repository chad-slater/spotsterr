import axios from "axios";
import { useEffect } from "react";

import { cookiesToObj } from "../utils";

const useCheckCookies = (setIsSpotifyAuth) => {
  useEffect(() => {
    let mounted = true;
    const cookies = cookiesToObj(document.cookie);

    if (cookies) {
      cookies.isSpotifyAccessToken && setIsSpotifyAuth(true);

      if (cookies.isSpotifyRefreshToken && !cookies.isSpotifyAccessToken) {
        mounted &&
          (async () => {
            await axios("/api/spotify/refresh");
            setIsSpotifyAuth(true);
          })();
      }

      !cookies.isSpotifyRefreshToken && setIsSpotifyAuth(false);
    }

    return () => (mounted = false);
  }, [setIsSpotifyAuth]);
};
export default useCheckCookies;
