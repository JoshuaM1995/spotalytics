import React, {useContext, useEffect, useState} from 'react';
import {Col, Panel, Row, List, FlexboxGrid, Progress, SelectPicker, Button, Icon, Message} from "rsuite";
import Page from "../Page/Page";
import StatisticCardLink from "../shared/StatisticCard/StatisticCardLink";
import './Dashboard.scss';
import ImageBlockList, {ImageBlockImage} from "../shared/ImageBlock/ImageBlockList";
import SpotifyApi from '../../api/SpotifyApi';
import SpotifyContext from "../../context/spotify";
import {Link} from "react-router-dom";
import {numberWithCommas} from "../../utils/global";
import {CacheKey} from "../../constants";
import TopTracks from "./TopTracks";
const ls = require('localstorage-ttl');

const Dashboard = () => {
  const [totalArtists, setTotalArtists] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [totalTracks, setTotalTracks] = useState(0);
  const [topArtistsImages, setTopArtistsImages] = useState<ImageBlockImage[]>([]);
  const [topAlbumsImages, setTopAlbumsImages] = useState<ImageBlockImage[]>([]);
  const { spotifyContext } = useContext(SpotifyContext);

  useEffect(() => {
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
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

    spotifyApi.getTopArtists().then(artists => {
      const images: ImageBlockImage[] = [];

      artists.forEach((artist: any) => {
        images.push({
          url: artist.images[0].url,
          title: <Link to={`artist/${artist.id}`}>{ artist.name }</Link>,
          subtitle: `${numberWithCommas(artist.followers.total)} Followers`
        });
      });

      setTopArtistsImages(images);
    });

    spotifyApi.getTopAlbums().then(albums => {
      const images: ImageBlockImage[] = [];

      albums.forEach((album: any) => {
        images.push({
          url: album.images[0].url,
          title: <Link to={`album/${album.id}`}>{ album.name }</Link>,
          subtitle: album.artists[0].name,
        });
      });

      setTopAlbumsImages(images);
    });
  }, []);

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
        <h3>Top Artists</h3>
        <br />

        <ImageBlockList images={topArtistsImages} />
      </Panel>
      <br />

      <Panel className="panel-light">
        <h3>Top Albums</h3>
        <br />

        <ImageBlockList images={topAlbumsImages} />
      </Panel>
      <br />

      <Panel className="panel-light">
        <TopTracks />
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button appearance="primary" size="lg">
            More Tracks{' '}
            <Icon icon="long-arrow-right" />
          </Button>
        </div>
      </Panel>
    </Page>
  );
};

export default Dashboard;
