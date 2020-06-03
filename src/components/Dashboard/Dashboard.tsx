import React, {useContext, useEffect, useState} from 'react';
import {Col, Panel, Row, List, FlexboxGrid, Progress} from "rsuite";
import Page from "../Page/Page";
import StatisticCardLink from "../shared/StatisticCard/StatisticCardLink";
import './Dashboard.scss';
import ImageBlockList, {ImageBlockImage} from "../shared/ImageBlock/ImageBlockList";
import SpotifyApi from '../../api/SpotifyApi';
import SpotifyContext from "../../context/spotify";
import {Link} from "react-router-dom";
import {numberWithCommas} from "../../utils/global";
import {CacheKey} from "../../constants";
import {getProgressLineProps} from "../../utils/progress";
const ls = require('localstorage-ttl');

interface TopTrack {
  track_name: string;
  artist: string;
  album_id: string;
  album_name: string;
  album_image_url: string;
  popularity: number;
  uri: string;
}

const Dashboard = () => {
  const [totalArtists, setTotalArtists] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [totalTracks, setTotalTracks] = useState(0);
  const [topArtistsImages, setTopArtistsImages] = useState<ImageBlockImage[]>([]);
  const [topAlbumsImages, setTopAlbumsImages] = useState<ImageBlockImage[]>([]);
  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);
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

    spotifyApi.getTopTracks().then(tracks => {
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

      setTopTracks(topTrackValues);
    });
  }, []);

  return (
    <Page title="Dashboard">
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
            to="albums/all"
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
        <h3>Top Tracks</h3>
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
      </Panel>
    </Page>
  );
};

export default Dashboard;
