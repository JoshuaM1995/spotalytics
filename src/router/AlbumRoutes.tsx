import { Routes, Route } from "react-router-dom";
import AlbumDetails from "../components/Albums/AlbumDetails/AlbumDetails";

const AlbumRoutes = () => {
  return (
    <Routes>
      <Route path=":albumId" element={<AlbumDetails />} />
    </Routes>
  );
};

export default AlbumRoutes;
