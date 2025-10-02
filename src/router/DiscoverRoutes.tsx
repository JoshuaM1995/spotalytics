import { Routes, Route } from "react-router-dom";
import Recommendations from "../components/Discovery/Recommendations";
import SimilarAlbums from "../components/Discovery/SimilarAlbums/SimilarAlbums";
import SimilarTracks from "../components/Discovery/SimilarTracks/SimilarTracks";

const DiscoverRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Recommendations />} />
      <Route path="similar-tracks/:trackId?" element={<SimilarTracks />} />
      <Route path="similar-albums" element={<SimilarAlbums />} />
    </Routes>
  );
};

export default DiscoverRoutes;
