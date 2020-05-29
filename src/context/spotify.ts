import React from "react";

interface Context {
  isAuthenticated: boolean;
}

interface SpotifyContext {
  spotifyContext: Context;
  setSpotifyContext: any;
}

export const spotifyContextDefaultValue: Context = {
  isAuthenticated: true,
};

export const spotifyContext = {
  spotifyContext: spotifyContextDefaultValue,
  setSpotifyContext: () => {},
};

const SpotifyContext = React.createContext<SpotifyContext>(spotifyContext);
export default SpotifyContext;
