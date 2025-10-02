import { Routes, Route } from "react-router-dom";
import TopArtists from "../components/Artists/TopArtists/TopArtists";
import FollowedArtists from "../components/Artists/FollowedArtists/FollowedArtists";

const ArtistsRoutes = () => {
  return (
    <Routes>
      <Route path="top" element={<TopArtists />} />
      <Route path="followed" element={<FollowedArtists />} />
    </Routes>
  );
};

export default ArtistsRoutes;
