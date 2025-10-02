import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import "rsuite/dist/styles/rsuite-dark.min.css";
import { Container } from "rsuite";
import SideNavigation from "./components/Navigation/SideNavigation/SideNavigation";
import SpotifyContext, { spotifyContextDefaultValue } from "./context/spotify";
import AuthenticateSpotify from "./components/AuthenticateSpotify/AuthenticateSpotify";
import NotFound from "./components/Error/NotFound";
import Loading from "./components/Loading/Loading";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ArtistsRoutes from "./router/ArtistsRoutes";
import AlbumsRoutes from "./router/AlbumsRoutes";
import TracksRoutes from "./router/TracksRoutes";
import Home from "./components/Home/Home";
import UnauthenticatedSpotify from "./components/AuthenticateSpotify/UnauthenticatedSpotify";
import "./App.scss";
import SomethingWentWrong from "./components/Error/SomethingWentWrong";
import ArtistRoutes from "./router/ArtistRoutes";
import AlbumRoutes from "./router/AlbumRoutes";
import { SPOTIFY_CONTEXT } from "./utils/constants";
import AnalyticsRoutes from "./router/AnalyticsRoutes";
import DiscoverRoutes from "./router/DiscoverRoutes";

const App = () => {
  const [spotifyContext, setSpotifyContext] = useState(
    spotifyContextDefaultValue
  );
  const value = {
    spotifyContext: spotifyContext,
    setSpotifyContext: setSpotifyContext,
  };

  return (
    <SpotifyContext.Provider value={value}>
      <Container>
        <BrowserRouter>
          <SideNavigation />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  spotifyContext={spotifyContext}
                  setSpotifyContext={setSpotifyContext}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/discover/*"
              element={
                <ProtectedRoute
                  spotifyContext={spotifyContext}
                  setSpotifyContext={setSpotifyContext}
                >
                  <DiscoverRoutes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics/*"
              element={
                <ProtectedRoute
                  spotifyContext={spotifyContext}
                  setSpotifyContext={setSpotifyContext}
                >
                  <AnalyticsRoutes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/artist/*"
              element={
                <ProtectedRoute
                  spotifyContext={spotifyContext}
                  setSpotifyContext={setSpotifyContext}
                >
                  <ArtistRoutes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/artists/*"
              element={
                <ProtectedRoute
                  spotifyContext={spotifyContext}
                  setSpotifyContext={setSpotifyContext}
                >
                  <ArtistsRoutes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/album/*"
              element={
                <ProtectedRoute
                  spotifyContext={spotifyContext}
                  setSpotifyContext={setSpotifyContext}
                >
                  <AlbumRoutes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/albums/*"
              element={
                <ProtectedRoute
                  spotifyContext={spotifyContext}
                  setSpotifyContext={setSpotifyContext}
                >
                  <AlbumsRoutes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tracks/*"
              element={
                <ProtectedRoute
                  spotifyContext={spotifyContext}
                  setSpotifyContext={setSpotifyContext}
                >
                  <TracksRoutes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/authenticate-spotify"
              element={<AuthenticateSpotify />}
            />
            <Route
              path="/authenticate-spotify/:action"
              element={<AuthenticateSpotify />}
            />
            <Route
              path="/unauthenticated-spotify"
              element={<UnauthenticatedSpotify />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </SpotifyContext.Provider>
  );
};

export default App;
