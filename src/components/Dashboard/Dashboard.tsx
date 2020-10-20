import React, {useContext, useEffect, useState} from 'react';
import {Col, Message, Panel, Row} from "rsuite";
import Page from "../Page/Page";
import StatisticCardLink from "../shared/StatisticCard/StatisticCardLink";
import SpotifyContext from "../../context/spotify";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";
import TopAlbums from "./TopAlbums";
import {ApiMethod, CacheKey, TimeRange} from "../../utils/constants";
import apiRequest from "../../utils/apiRequest";
import './Dashboard.scss';
import SpotifyApi from '../../api/SpotifyApi';

const cache = require('localstorage-ttl');

const Dashboard = () => {
  const [totalArtists, setTotalArtists] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [totalTracks, setTotalTracks] = useState(0);
  const {spotifyContext} = useContext(SpotifyContext);

  useEffect(() => {
    const totalArtistCountCache = cache.get(CacheKey.FOLLOWED_ARTISTS_COUNT);
    const totalAlbumCountCache = cache.get(CacheKey.ALBUMS_SAVED_COUNT);
    const totalTrackCountCache = cache.get(CacheKey.TRACKS_FAVORITED_COUNT);
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

    if (!totalArtistCountCache) {
      spotifyApi.getTotalArtistCount().then(totalArtistCount => {
        setTotalArtists(totalArtistCount);
        cache.set(CacheKey.FOLLOWED_ARTISTS_COUNT, totalArtistCount, 300000);
      });
    } else {
      setTotalArtists(totalArtistCountCache);
    }

    if (!totalAlbumCountCache) {
      spotifyApi.getTotalAlbumCount().then(totalAlbumCount => {
        setTotalAlbums(totalAlbumCount);
        cache.set(CacheKey.ALBUMS_SAVED_COUNT, totalAlbumCount, 300000);
      });
    } else {
      setTotalAlbums(totalAlbumCountCache);
    }

    if (!totalTrackCountCache) {
      spotifyApi.getTotalTrackCount().then(totalTrackCount => {
        setTotalTracks(totalTrackCount);
        cache.set(CacheKey.TRACKS_FAVORITED_COUNT, totalTrackCount, 300000);
      });
    } else {
      setTotalTracks(totalTrackCountCache);
    }
  }, [spotifyContext.accessToken]);

  return (
    <Page title="Dashboard">
      <Message
        type="info"
        description="All the values on this page are only updated once every hour."
        closable
        showIcon
      />
      <br/>

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
      <br/>

      <Panel className="panel-light">
        <TopArtists/>
      </Panel>
      <br/>

      <Panel className="panel-light">
        <TopAlbums/>
      </Panel>
      <br/>

      <Panel className="panel-light">
        <TopTracks timeRange={TimeRange.SHORT_TERM} limit={10}/>
      </Panel>
    </Page>
  );
};

export default Dashboard;
