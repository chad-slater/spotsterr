import SpotifyAuth from "../SpotifyAuth";
import Track from "../Track";

const App = () => {
  return (
    <>
      <SpotifyAuth />
      <Track artist={"Lorna Shore"} title={"Sun Eater"} />
    </>
  );
};
export default App;
