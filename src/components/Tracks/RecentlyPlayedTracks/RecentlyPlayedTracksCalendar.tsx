import React from 'react'
import { RecentlyPlayedTrack } from './RecentlyPlayedTracks';

type RecentlyPlayedTracksCalendarProps = {
  data: RecentlyPlayedTrack[];
  setData: React.Dispatch<React.SetStateAction<RecentlyPlayedTrack[]>>;
  tracks: any;
}

const RecentlyPlayedTracksCalendar = ({ data, setData, tracks }: RecentlyPlayedTracksCalendarProps) => {
  return <>RecentlyPlayedTracksCalendar</>;
};

export default RecentlyPlayedTracksCalendar;
