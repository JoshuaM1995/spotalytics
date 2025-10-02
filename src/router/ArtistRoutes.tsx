import { Routes, Route } from "react-router-dom";
import ArtistDetails from "../components/Artists/ArtistDetails/ArtistDetails";

const ArtistRoutes = () => {
  return (
    <Routes>
      <Route path=":artistId" element={<ArtistDetails />} />
    </Routes>
  );
};

export default ArtistRoutes;
