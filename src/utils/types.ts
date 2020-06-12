import {ReactNode} from "react";

export interface RecommendedTrack {
  id: string;
  trackUri: string;
  trackName: string|ReactNode;
  artistId: string;
  artistName: string|ReactNode;
  albumId: string;
  albumName: string|ReactNode;
  duration: string|ReactNode;
}
