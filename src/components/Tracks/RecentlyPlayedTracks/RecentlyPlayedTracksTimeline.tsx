import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Timeline, Icon, Avatar } from 'rsuite';
import { RecentlyPlayedTrack, TrackToAdd } from './RecentlyPlayedTracks';

type RecentlyPlayedTracksTimelineProps = {
  data: RecentlyPlayedTrack[];
  setData: React.Dispatch<React.SetStateAction<RecentlyPlayedTrack[]>>;
  tracks: TrackToAdd[];
}

const RecentlyPlayedTracksTimeline = ({ data, setData, tracks }: RecentlyPlayedTracksTimelineProps) => {
  return (
    <Timeline className="custom-timeline">
      {tracks.map((track) => {
        console.log({ track });

        return (
          <Timeline.Item
            dot={
              <Link to={`/album/${track.albumId}`}>
                <Avatar circle src={track.albumImage} />
              </Link>
            }
          >
            <p>{track.playedAt}</p>
            <p>{track.trackName} by {track.artistName} {track.isPlaying ? ' (Currently Playing)' : ''}</p>
          </Timeline.Item>
        );
      })}
  </Timeline>
  );
};

export default RecentlyPlayedTracksTimeline;
