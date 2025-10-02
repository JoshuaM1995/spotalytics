import { Routes, Route } from "react-router-dom";
import RecentlyPlayedTracks from "../components/Tracks/RecentlyPlayedTracks/RecentlyPlayedTracks";
import FavoritedTracks from "../components/Tracks/FavoritedTracks/FavoritedTracks";
import TopTracks from "../components/Tracks/TopTracks/TopTracks";

const TracksRoutes = () => {
  return (
    <Routes>
      <Route path="recently-played" element={<RecentlyPlayedTracks />} />
      <Route path="favorited" element={<FavoritedTracks />} />
      <Route path="top" element={<TopTracks />} />
    </Routes>
  );
};

export default TracksRoutes;
