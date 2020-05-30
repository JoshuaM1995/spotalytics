import React, {useContext, useEffect} from 'react';
import {Col, Panel, Row} from "rsuite";
import Page from "../Page/Page";
import StatisticCardLink from "../shared/StatisticCardLink";
import '../../styles/Dashboard.scss';
import ImageBlock, {ImageBlockImage} from "../shared/ImageBlock";
import SpotifyApi from '../../api/SpotifyApi';
import SpotifyContext from "../../context/spotify";

const topArtistsImages: ImageBlockImage[] = [
  { url: 'https://via.placeholder.com/500x500/0000FF/FFFFFF', title: 'Pattern-Seeking Animals', subtitle: '103 Plays' },
  { url: 'https://via.placeholder.com/250x250/FF0000/FFFFFF', title: 'Caligula\'s Horse', subtitle: '70 Plays' },
  { url: 'https://via.placeholder.com/250x250/FFFF00/000000', title: 'Trivium', subtitle: '68 Plays' },
  { url: 'https://via.placeholder.com/250x250/FFFF00/000000', title: 'Veil of Maya', subtitle: '57 Plays' },
  { url: 'https://via.placeholder.com/250x250/FF0000/FFFFFF', title: 'Havok', subtitle: '48 Plays' },
];

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
  const { spotifyContext } = useContext(SpotifyContext);

  useEffect(() => {
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
    spotifyApi.getSavedTracks();
  }, []);

  return (
    <Page title="Dashboard">
      <Row>
        <Col xs={24} sm={24} md={8}>
            <StatisticCardLink
              to="/artists/all"
              background="#429321"
              icon="user"
              statisticValue={200}
              statisticText="Total Artists"
            />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <StatisticCardLink
            to="albums/all"
            background="#4a148c"
            icon="play-circle"
            statisticValue={400}
            statisticText="Total Albums"
          />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <StatisticCardLink
            to="tracks/all"
            background="#f44336"
            icon="music"
            statisticValue={5000}
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
