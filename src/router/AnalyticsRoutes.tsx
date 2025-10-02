import { Routes, Route } from "react-router-dom";
import ArtistCountries from "../components/Analytics/ArtistCountries/ArtistCountries";
import TasteProfile from "../components/Analytics/TasteProfile/TasteProfile";

const AnalyticsRoutes = () => {
  return (
    <Routes>
      <Route path="artist-countries" element={<ArtistCountries />} />
      <Route path="taste-profile" element={<TasteProfile />} />
    </Routes>
  );
};

export default AnalyticsRoutes;
