import React, {useContext, useEffect, useState} from 'react';
import {FlexboxGrid, List, Progress, SelectPicker} from "rsuite";
import {Link} from "react-router-dom";
import {getProgressLineProps} from "../../utils/progress";
import {TopTrackTimeRange} from "../../utils/constants";
import SpotifyApi from "../../api/SpotifyApi";
import SpotifyContext from "../../context/spotify";

interface TopTracksProps {
  timeRange?: TopTrackTimeRange;
  limit?: number;
}

interface TopTrack {
  track_name: string;
  artist: string;
  album_id: string;
  album_name: string;
  album_image_url: string;
  popularity: number;
  uri: string;
}

const topTracksTimeRanges = [
  { value: TopTrackTimeRange.SHORT_TERM, label: 'Last 4 Weeks',  },
  { value: TopTrackTimeRange.MEDIUM_TERM, label: 'Last 6 Months',  },
  { value: TopTrackTimeRange.LONG_TERM, label: 'All-Time',  },
];

const TopTracks = ({ timeRange = TopTrackTimeRange.SHORT_TERM, limit = 10 }: TopTracksProps) => {
  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);
  const [topTracksTimeRange, setTopTracksTimeRange] = useState(timeRange);
  const { spotifyContext } = useContext(SpotifyContext);

  useEffect(() => {
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
    spotifyApi.getTopTracks(topTracksTimeRange, limit).then(tracks => {
      setTopTracks(getTopTracksValues(tracks));
    });
  }, []);

  useEffect(() => {
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

    spotifyApi.getTopTracks(topTracksTimeRange, limit).then(tracks => {
      setTopTracks(getTopTracksValues(tracks));
    });
    console.log('topTracksTimeRange', topTracksTimeRange);
  }, [topTracksTimeRange]);

  const getTopTracksValues = (tracks: any[]) => {
    const topTrackValues: TopTrack[] = [];

    tracks.forEach((track: any) => {
      topTrackValues.push({
        track_name: track.name,
        artist: track.artists[0].name,
        album_id: track.album.id,
        album_name: track.album.name,
        album_image_url: track.album.images[0].url,
        popularity: track.popularity,
        uri: track.uri,
      });
    });

    return topTrackValues;
  }

  const changeTopTracksTimeRange = (value: TopTrackTimeRange) => {
    setTopTracksTimeRange(value);
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Top Tracks</h3>
        <SelectPicker
          defaultValue={timeRange}
          value={topTracksTimeRange}
          data={topTracksTimeRanges}
          style={{ width: 250 }}
          cleanable={false}
          onChange={changeTopTracksTimeRange}
        />
      </div>
      <br />
      <List hover>
        {topTracks.map((track: any, index: number) => (
          <List.Item key={track.track_name} index={index}>
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={2} className="center" style={{ height: '60px' }}>
                <Link to={`/album/${track.album_id}`}>
                  <img src={track.album_image_url} height={50} width={50} alt={track.album_name} />
                </Link>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item
                colspan={6}
                className="center"
                style={{
                  height: '60px',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  overflow: 'hidden',
                }}
              >
                <div className="track-name">
                  <a href={track.uri}>{track.track_name}</a>
                </div>
                <div>
                  <div>
                    {track.artist}
                  </div>
                </div>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={6} className="center" style={{ height: '60px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div className="text-slim">Popularity</div>
                  <Progress.Line
                    percent={track.popularity}
                    showInfo={false}
                    {...getProgressLineProps(track.popularity)}
                  />
                </div>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default TopTracks;
