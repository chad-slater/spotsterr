import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./components/App";
import FourOhFour from "./components/FourOhFour";
import Playlist from "./components/Playlist";
import Playlists from "./components/Playlists";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Playlists />} />
        <Route path="/playlist/:playlistId" element={<Playlist />} />
        <Route path="*" element={<FourOhFour />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
