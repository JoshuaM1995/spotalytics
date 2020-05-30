import React, {useContext, useEffect, useState} from 'react';
import {Col, Panel, Row} from "rsuite";
import Page from "../Page/Page";
import StatisticCardLink from "../shared/StatisticCard/StatisticCardLink";
import './Dashboard.scss';
import ImageBlock, {ImageBlockImage} from "../shared/ImageBlock";
import SpotifyApi from '../../api/SpotifyApi';
import SpotifyContext from "../../context/spotify";

const topAlbumsImages: ImageBlockImage[] = [
  {
    url: 'https://via.placeholder.com/500x500/0000FF/FFFFFF',
    title: 'Prehensile Tales',
    subtitle: <span>Pattern-Seeking Animals<br />72 Plays</span>,
  },
  {
    url: 'https://via.placeholder.com/250x250/FF0000/FFFFFF',
    title: 'What the Dead Men Say',
    subtitle: <span>Trivium<br />52 Plays</span>,
  },
  {
    url: 'https://via.placeholder.com/250x250/FFFF00/000000',
    title: 'V',
    subtitle: <span>Havok<br />48 Plays</span>,
  },
  {
    url: 'https://via.placeholder.com/250x250/FFFF00/000000',
    title: 'Underneath',
    subtitle: <span>Code Orange<br />42 Plays</span>,
  },
  {
    url: 'https://via.placeholder.com/250x250/FF0000/FFFFFF',
    title: 'Rise Radiant (Bonus Tracks Version)',
    subtitle: <span>Caligula's Horse<br />39 Plays</span>,
  },
];

const Dashboard = () => {
  const [totalArtists, setTotalArtists] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [totalTracks, setTotalTracks] = useState(0);
  const [topArtistsImages, setTopArtistsImages] = useState<ImageBlockImage[]>([]);
  const [topAlbumsImages, setTopAlbumsImages] = useState<ImageBlockImage[]>([]);
  const { spotifyContext } = useContext(SpotifyContext);

  useEffect(() => {
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

    spotifyApi.getTotalArtistCount().then((totalArtistCount) => {
      setTotalArtists(totalArtistCount);
    });

    spotifyApi.getTotalAlbumCount().then((totalAlbumCount) => {
      setTotalAlbums(totalAlbumCount);
    });

    spotifyApi.getTotalTrackCount().then((totalTrackCount) => {
      setTotalTracks(totalTrackCount);
    });

    spotifyApi.getTopArtists().then((topArtists) => {
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

    spotifyApi.getTopAlbums().then((topAlbums) => {
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
  }, []);

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
      </Panel>
    </Page>
  );
};

export default Dashboard;
