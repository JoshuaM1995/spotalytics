import React from "react";
import { Routes, Route } from "react-router-dom";
import SavedAlbums from "../components/Albums/SavedAlbums/SavedAlbums";
import TopAlbums from "../components/Albums/TopAlbums/TopAlbums";

const AlbumsRoutes = () => {
  return (
    <Routes>
      <Route path="top" element={<TopAlbums />} />
      <Route path="saved" element={<SavedAlbums />} />
    </Routes>
  );
};

export default AlbumsRoutes;
