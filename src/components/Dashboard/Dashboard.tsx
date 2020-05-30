import React, {useContext, useEffect, useState} from 'react';
import {Col, Panel, Row, List, FlexboxGrid} from "rsuite";
import Page from "../Page/Page";
import StatisticCardLink from "../shared/StatisticCard/StatisticCardLink";
import './Dashboard.scss';
import ImageBlock, {ImageBlockImage} from "../shared/ImageBlock/ImageBlock";
import SpotifyApi from '../../api/SpotifyApi';
import SpotifyContext from "../../context/spotify";

interface TopTrack {
  track_name: string;
  artist: string;
  album_name: string;
  album_image_url: string;
  popularity: number;
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

    spotifyApi.getTotalArtistCount().then(totalArtistCount => {
      setTotalArtists(totalArtistCount);
    });

    spotifyApi.getTotalAlbumCount().then(totalAlbumCount => {
      setTotalAlbums(totalAlbumCount);
    });

    spotifyApi.getTotalTrackCount().then(totalTrackCount => {
      setTotalTracks(totalTrackCount);
    });

    spotifyApi.getTopArtists().then(topArtists => {
      const images: ImageBlockImage[] = [];

      topArtists.forEach((artist: any) => {
        images.push({
          url: artist.images[0].url,
          title: artist.name,
          subtitle: `${artist.followers.total} Followers`
        });
      });

      setTopArtistsImages(images);
    });

    spotifyApi.getTopAlbums().then(topAlbums => {
      const images: ImageBlockImage[] = [];

      topAlbums.forEach((album: any) => {
        images.push({
          url: album.images[0].url,
          title: album.name,
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
          album_name: track.album.name,
          album_image_url: track.album.images[0].url,
          popularity: track.popularity,
        });
      });

      setTopTracks(topTrackValues);
    });
  }, []);

  // @ts-ignore
  return (
    <Page title="Dashboard">
      <Row>
        <Col xs={24} sm={24} md={8}>
            <StatisticCardLink
              to="/artists/all"
              background="#429321"
              icon="user-plus"
              statisticValue={totalArtists}
              statisticText="Total Artists"
            />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <StatisticCardLink
            to="albums/all"
            background="#4a148c"
            icon="play-circle"
            statisticValue={totalAlbums}
            statisticText="Total Albums"
          />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <StatisticCardLink
            to="tracks/all"
            background="#f44336"
            icon="music"
            statisticValue={totalTracks}
            statisticText="Total Tracks"
          />
        </Col>
      </Row>
      <br />

      <Panel className="panel-light">
        <h3>Top Artists</h3>
        <br />

        <ImageBlock images={topArtistsImages} />
      </Panel>
      <br />

      <Panel className="panel-light">
        <h3>Top Albums</h3>
        <br />

        <ImageBlock images={topAlbumsImages} />
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
                  <img src={track.album_image_url} height={50} width={50} alt={track.album_name} />
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
                  <div className="track-name">{track.track_name}</div>
                  <div>
                    <div>
                      {track.artist}
                    </div>
                  </div>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6} className="center" style={{ height: '60px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div className="text-slim">Popularity</div>
                    <div className="popularity">{track.popularity}</div>
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
