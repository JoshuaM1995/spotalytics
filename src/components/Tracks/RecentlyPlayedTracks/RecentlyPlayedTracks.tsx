import React, { ReactElement, useContext, useEffect, useState } from 'react';
import Page from "../../Page/Page";
import { Badge, ButtonGroup, ButtonToolbar, Icon, IconButton } from "rsuite";
import SpotifyContext from "../../../context/spotify";
import SpotifyApi from "../../../api/SpotifyApi";
import moment from 'moment';
import './RecentlyPlayedTracks.scss';
import { Link } from "react-router-dom";
import RecentlyPlayedTracksTable from './RecentlyPlayedTracksTable';
import RecentlyPlayedTracksTimeline from './RecentlyPlayedTracksTimeline';
import RecentlyPlayedTracksCalendar from './RecentlyPlayedTracksCalendar';

export interface RecentlyPlayedTrack {
  track: string;
  artists: string;
  playedAt: any;
}

export type TrackToAdd = {
  isPlaying: ReactElement | string;
  artists: ReactElement[] | string[];
  playedAt: string;
  trackId: string;
  trackName: ReactElement | string;
  artistName: ReactElement | string;
  albumId: string;
  albumImage: string;
};

enum ViewMode {
  TABLE = 'TABLE',
  TIMELINE = 'TIMELINE',
  CALENDAR = 'CALENDAR',
}

const RecentlyPlayedTracks = () => {
  const [data, setData] = useState<RecentlyPlayedTrack[]>([]);
  const [tracks, setTracks] = useState<any>([]);
  // const [viewMode, setViewMode] = useState(ViewMode.TABLE);
  const [viewMode, setViewMode] = useState(ViewMode.TIMELINE);
  const { spotifyContext } = useContext(SpotifyContext);

  useEffect(() => {
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

    spotifyApi.getRecentlyPlayedTracks(50, true).then((recentlyPlayedTracks: any[]) => {
      const tracksToAdd: TrackToAdd[] = [];

      recentlyPlayedTracks.forEach((recentlyPlayedTrack: any) => {
        const artists: ReactElement[] = [];
        let trackToAdd: TrackToAdd;

        console.log({ recentlyPlayedTrack });

        if (recentlyPlayedTrack.item) {
          recentlyPlayedTrack.item.artists.forEach((artist: any) => {
            artists.push(<><Link to={`/artist/${artist.id}`}>{artist.name}</Link>{', '}</>);
          });

          console.log({ recentlyPlayedTrack });

          trackToAdd = {
            isPlaying: recentlyPlayedTrack.is_playing ? <Badge content="Playing" className="badge-playing" />
              : <Badge content="Not Playing" className="badge-not-playing" />,
            trackId: recentlyPlayedTrack.item.id,
            trackName: <a href={recentlyPlayedTrack.item.uri}>{recentlyPlayedTrack.item.name}</a>,
            artists: [],
            playedAt: moment(recentlyPlayedTrack.timestamp).format('MMMM Do, YYYY [at] h:mm A'),
            artistName: <Link to={`/artist/${recentlyPlayedTrack.item.artists[0].id}`}>{recentlyPlayedTrack.item.artists[0].name}</Link>,
            albumId: recentlyPlayedTrack.item.album.id,
            albumImage: recentlyPlayedTrack.item.album.images[0].url,
          };
        } else {
          recentlyPlayedTrack.track.artists.forEach((artist: any) => {
            artists.push(<><Link to={`/artist/${artist.id}`}>{artist.name}</Link>{', '}</>);
          });

          trackToAdd = {
            isPlaying: '',
            trackId: recentlyPlayedTrack.track.id,
            trackName: <a href={recentlyPlayedTrack.track.uri}>{recentlyPlayedTrack.track.name}</a>,
            artistName: <Link to={`/artist/${recentlyPlayedTrack.track.artists[0].id}`}>{recentlyPlayedTrack.track.artists[0].name}</Link>,
            artists: [],
            playedAt: moment(recentlyPlayedTrack.played_at).format('MMMM Do, YYYY [at] h:mm A'),
            albumImage: recentlyPlayedTrack.track.album.images[0].url,
            albumId: recentlyPlayedTrack.track.album.id,
          };
        }

        trackToAdd.artists = artists;
        tracksToAdd.push(trackToAdd);
      });

      setTracks(tracksToAdd);
    });
  }, [spotifyContext.accessToken]);

  return (
    <Page title="Recently Played Tracks">
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonToolbar>
            <ButtonGroup>
              <IconButton
                color={viewMode === ViewMode.TABLE ? 'green' : undefined}
                icon={<Icon icon="table"/>}
                onClick={() => setViewMode(ViewMode.TABLE)}
              />
              <IconButton
                color={viewMode === ViewMode.TIMELINE ? 'green' : undefined}
                icon={<Icon icon="clock-o"/>}
                onClick={() => setViewMode(ViewMode.TIMELINE)}
              />
              <IconButton
                color={viewMode === ViewMode.CALENDAR ? 'green' : undefined}
                icon={<Icon icon="calendar"/>}
                onClick={() => setViewMode(ViewMode.CALENDAR)}
              />
            </ButtonGroup>
          </ButtonToolbar>
      </div>

      {viewMode === ViewMode.TABLE && <RecentlyPlayedTracksTable data={data} setData={setData} tracks={tracks} />}
      {viewMode === ViewMode.TIMELINE && <RecentlyPlayedTracksTimeline data={data} setData={setData} tracks={tracks} />}
      {viewMode === ViewMode.CALENDAR && <RecentlyPlayedTracksCalendar data={data} setData={setData} tracks={tracks} />}
    </Page>
  );
};

export default RecentlyPlayedTracks;
