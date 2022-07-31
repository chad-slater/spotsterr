const axios = require("axios").default;

const SpotifyAuth = () => {
  // const accessToken = document.cookie.split("=")[1];

  // axios("https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V", {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  return (
    <>
      <a href="http://localhost:5000/api/spotify/login">Log in to Spotify</a>
    </>
  );
};

export default SpotifyAuth;
