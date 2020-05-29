import React, {CSSProperties, useContext} from 'react';
import Page from '../Page/Page';
import {Col, Icon, IconButton, Panel, Row} from "rsuite";
import {Jumbotron} from "../../styles";
import SpotifyContext from "../../context/spotify";
import {Redirect} from "react-router";

const panelStyles: CSSProperties = {
  background: '#2a313c',
};

const Home = () => {
  const {spotifyContext} = useContext(SpotifyContext);

  if (spotifyContext.isAuthenticated) {
    return <Redirect to="/dashboard"/>
  }

  return (
    <Page title={process.env.REACT_APP_SITE_NAME}>
      <Jumbotron>
        <Panel bordered>
          <h3>{process.env.REACT_APP_SITE_NAME}</h3>
          <br/>
          <h5 style={{fontWeight: 'normal'}}>
            Please link to your Spotify account to view statistics on our website, such as
            your top artists, favorite albums and total songs.
          </h5>
          <br/>
          <IconButton icon={<Icon icon="spotify"/>} placement="left" color="green" size="lg">
            Link to Spotify
          </IconButton>
        </Panel>
        <br /><br />

        <Row gutter={20}>
          <Col md={12}>
            <Panel style={panelStyles}>
              <Icon icon="bar-chart" size="5x" />
              <h3>Custom Charts</h3>
              <h5 style={{ fontWeight: 'normal' }}>
                View your most listened to tracks and artists and switch between multiple time periods.
              </h5>
            </Panel>
          </Col>
          <Col md={12}>
            <Panel style={panelStyles}>
              <Icon icon="exchange" size="5x" />
              <h3>Compare to Last Visit</h3>
              <h5 style={{ fontWeight: 'normal' }}>
                See how your personal ranking changes over time, indicated by arrows compared
                to your last visit.
              </h5>
            </Panel>
          </Col>
        </Row>
        <br />

        <Row gutter={20}>
          <Col md={12}>
            <Panel style={panelStyles}>
              <Icon icon="headphones" size="5x" />
              <h3>Create Playlists</h3>
              <h5 style={{ fontWeight: 'normal' }}>
                Create a playlist from your personal charts and listen to them directly in your spotify app.
              </h5>
            </Panel>
          </Col>
          <Col md={12}>
            <Panel style={panelStyles}>
              <Icon icon="refresh" size="5x" />
              <h3>Recently Played Tracks</h3>
              <h5 style={{ fontWeight: 'normal' }}>
                Check out your recently played tracks with timestamps and track information.
              </h5>
            </Panel>
          </Col>
        </Row>
      </Jumbotron>
    </Page>
  );
};

export default Home;
