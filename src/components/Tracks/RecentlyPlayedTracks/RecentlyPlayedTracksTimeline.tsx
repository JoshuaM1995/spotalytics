import React from 'react'
import { RecentlyPlayedTrack } from './RecentlyPlayedTracks';

type RecentlyPlayedTracksTimelineProps = {
  data: RecentlyPlayedTrack[];
  setData: React.Dispatch<React.SetStateAction<RecentlyPlayedTrack[]>>;
  tracks: any;
}

const RecentlyPlayedTracksTimeline = ({ data, setData, tracks }: RecentlyPlayedTracksTimelineProps) => {
  return <>RecentlyPlayedTracksTimeline</>;
};

export default RecentlyPlayedTracksTimeline;
