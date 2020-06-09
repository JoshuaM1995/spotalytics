import React from "react";

export interface SpotifyContextValues {
  isAuthenticated: boolean;
  accessToken: string;
  currentUser: SpotifyApi.CurrentUsersProfileResponse|null;
}

interface SpotifyContext {
  spotifyContext: SpotifyContextValues;
  setSpotifyContext: any;
}

export const spotifyContextDefaultValue: SpotifyContextValues = {
  isAuthenticated: false,
  accessToken: '',
  currentUser: null,
};

export const spotifyContext = {
  spotifyContext: spotifyContextDefaultValue,
  setSpotifyContext: () => {},
};

const SpotifyContext = React.createContext<SpotifyContext>(spotifyContext);
export default SpotifyContext;
