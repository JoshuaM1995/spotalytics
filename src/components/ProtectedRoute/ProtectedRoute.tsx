import React from "react";
import { Navigate } from "react-router-dom";
import { SPOTIFY_CONTEXT } from "../../utils/constants";

interface ProtectedRouteProps {
  children: React.ReactNode;
  spotifyContext: any;
  setSpotifyContext: (context: any) => void;
}

const ProtectedRoute = ({
  children,
  spotifyContext,
  setSpotifyContext,
}: ProtectedRouteProps) => {
  if (!spotifyContext.isAuthenticated) {
    const localStorageSpotifyContext = localStorage.getItem(SPOTIFY_CONTEXT);

    if (localStorageSpotifyContext !== null) {
      try {
        const parsedContext = JSON.parse(localStorageSpotifyContext);

        if (parsedContext.isAuthenticated) {
          setSpotifyContext({ ...spotifyContext, ...parsedContext });
          return <>{children}</>;
        }
      } catch (error) {
        console.error("Error parsing localStorage context:", error);
      }
    }

    return <Navigate to="/authenticate-spotify" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
