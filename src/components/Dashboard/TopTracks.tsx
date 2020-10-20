import React, {useContext, useEffect, useState} from 'react';
import {Button, FlexboxGrid, Icon, List, Progress, SelectPicker} from "rsuite";
import {Link} from "react-router-dom";
import {getProgressLineProps} from "../../utils/progress";
import {ApiMethod, CacheKey, TimeRange} from "../../utils/constants";
import SpotifyContext from "../../context/spotify";
import apiRequest from "../../utils/apiRequest";
import SpotifyApi from "../../api/SpotifyApi";

const cache = require('localstorage-ttl');

interface TopTracksProps {
  timeRange?: TimeRange;
  limit?: number;
}

interface TopTrack {
  track_name: string;
  artist: string;
  artist_id: string;
  album_id: string;
  album_name: string;
  album_image_url: string;
  popularity: number;
  uri: string;
}

const topTracksTimeRanges = [
  {value: TimeRange.SHORT_TERM, label: 'Last 4 Weeks',},
  {value: TimeRange.MEDIUM_TERM, label: 'Last 6 Months',},
  {value: TimeRange.LONG_TERM, label: 'All-Time',},
];

const TopTracks = ({timeRange = TimeRange.SHORT_TERM, limit = 10}: TopTracksProps) => {
  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);
  const [topTracksTimeRange, setTopTracksTimeRange] = useState(timeRange);
  const {spotifyContext} = useContext(SpotifyContext);

  useEffect(() => {
    const topTracksCache = cache.get(CacheKey.DASHBOARD_TOP_TRACKS);
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

    if (!topTracksCache || (topTracksCache && !topTracksCache[topTracksTimeRange])) {
      spotifyApi.getTopTracks(topTracksTimeRange, limit).then(tracks => {
        setTopTracks(getTopTracksValues(tracks));

        // Cache the results for an hour so we don't make constant api requests
        cache.set(CacheKey.DASHBOARD_TOP_TRACKS, {
          ...topTracksCache,
          [topTracksTimeRange]: getTopTracksValues(tracks),
        }, 1000 * 60 * 60);
      });
    } else {
      setTopTracks(topTracksCache[topTracksTimeRange]);
    }
  }, [topTracksTimeRange, limit, spotifyContext.accessToken]);

  const getTopTracksValues = (tracks: any[]) => {
    const topTrackValues: TopTrack[] = [];

    tracks.forEach((track: any) => {
      topTrackValues.push({
        track_name: track.name,
        artist: track.artists[0].name,
        artist_id: track.artists[0].id,
        album_id: track.album.id,
        album_name: track.album.name,
        album_image_url: track.album.images[0].url,
        popularity: track.popularity,
        uri: track.uri,
      });
    });

    return topTrackValues;
  }

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h3>Top Tracks</h3>
        {topTracks.length > 0 &&
        <SelectPicker
          defaultValue={timeRange}
          value={topTracksTimeRange}
          data={topTracksTimeRanges}
          style={{width: 250}}
          cleanable={false}
          searchable={false}
          onChange={(value) => setTopTracksTimeRange(value)}
        />
        }
      </div>
      <br/>
      {topTracks.length === 0 &&
        <div style={{ width: '60%', margin: '0 auto', textAlign: 'center' }}>
          <Icon icon="question-circle" size="5x" /><br />
          <h3>Not Enough Data</h3>
          <h5>You haven't listened to enough music to determine your top tracks yet. Listen to some more music and try again later.</h5>
        </div>
      }
      {topTracks.length > 0 && topTracks.map((track: any, index: number) => (
        <List hover>
          <List.Item key={track.track_name} index={index}>
            <FlexboxGrid>
              <FlexboxGrid.Item colspan={2} className="center" style={{height: '60px'}}>
                <Link to={`/album/${track.album_id}`}>
                  <img src={track.album_image_url} height={50} width={50} alt={track.album_name}/>
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
                    <Link to={`/artist/${track.artist_id}`} className="link-slim">
                      {track.artist}
                    </Link>
                  </div>
                </div>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={6} className="center" style={{height: '60px'}}>
                <div style={{textAlign: 'right'}}>
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
        </List>
      ))}
      <br/>

      {/*<div className="btn-more">*/}
      {/*  <Button appearance="primary" size="lg">*/}
      {/*    More Tracks{' '}*/}
      {/*    <Icon icon="long-arrow-right"/>*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </>
  );
};

export default TopTracks;
