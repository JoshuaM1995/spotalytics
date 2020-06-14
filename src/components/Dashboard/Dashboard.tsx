import React, {useContext, useEffect, useState} from 'react';
import {Col, Panel, Row, Button, Icon, Message} from "rsuite";
import Page from "../Page/Page";
import StatisticCardLink from "../shared/StatisticCard/StatisticCardLink";
import './Dashboard.scss';
import SpotifyApi from '../../api/SpotifyApi';
import SpotifyContext from "../../context/spotify";
import {CacheKey} from "../../constants";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";
import TopAlbums from "./TopAlbums";
import {TimeRange} from "../../utils/constants";
const ls = require('localstorage-ttl');

const Dashboard = () => {
  const [totalArtists, setTotalArtists] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [totalTracks, setTotalTracks] = useState(0);
  const { spotifyContext } = useContext(SpotifyContext);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

  useEffect(() => {
    console.log('mount dashboard');
    const totalArtistCountCache = ls.get(CacheKey.FOLLOWED_ARTISTS_COUNT);
    const totalAlbumCountCache = ls.get(CacheKey.ALBUMS_SAVED_COUNT);
    const totalTrackCountCache = ls.get(CacheKey.TRACKS_FAVORITED_COUNT);

    if(!totalArtistCountCache) {
      spotifyApi.getTotalArtistCount().then(totalArtistCount => {
        setTotalArtists(totalArtistCount);
        ls.set(CacheKey.FOLLOWED_ARTISTS_COUNT, totalArtistCount, 300000);
      });
    } else {
      setTotalArtists(totalArtistCountCache);
    }

    if(!totalAlbumCountCache) {
      spotifyApi.getTotalAlbumCount().then(totalAlbumCount => {
        setTotalAlbums(totalAlbumCount);
        ls.set(CacheKey.ALBUMS_SAVED_COUNT, totalAlbumCount, 300000);
      });
    } else {
      setTotalAlbums(totalAlbumCountCache);
    }

    if(!totalTrackCountCache) {
      spotifyApi.getTotalTrackCount().then(totalTrackCount => {
        setTotalTracks(totalTrackCount);
        ls.set(CacheKey.TRACKS_FAVORITED_COUNT, totalTrackCount, 300000);
      });
    } else {
      setTotalTracks(totalTrackCountCache);
    }
  }, []);

  useEffect(() => {
    console.log('update dashboard');
  });

  return (
    <Page title="Dashboard">
      <Message
        type="info"
        description="All the values on this page are only updated once every hour."
        closable
        showIcon
      />
      <br />

      <Row>
        <Col xs={24} sm={24} md={8}>
            <StatisticCardLink
              to="/artists/followed"
              background={'#429321'}
              icon="user-plus"
              statisticValue={totalArtists}
              statisticText="Artists Followed"
            />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <StatisticCardLink
            to="albums/saved"
            background={'#4a148c'}
            icon="play-circle"
            statisticValue={totalAlbums}
            statisticText="Albums Saved"
          />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <StatisticCardLink
            to="tracks/all"
            background={'#f44336'}
            icon="music"
            statisticValue={totalTracks}
            statisticText="Tracks Favorited"
          />
        </Col>
      </Row>
      <br />

      <Panel className="panel-light">
        <TopArtists />
      </Panel>
      <br />

      <Panel className="panel-light">
        <TopAlbums />
      </Panel>
      <br />

      <Panel className="panel-light">
        <TopTracks timeRange={TimeRange.SHORT_TERM} limit={10} />
      </Panel>
    </Page>
  );
};

export default Dashboard;
