import React, {useContext} from 'react';
import Page from '../Page/Page';
import {Col, Icon, IconButton, Panel, Row} from "rsuite";
import {Jumbotron} from "../../styles";
import SpotifyContext from "../../context/spotify";
import {Redirect} from "react-router";

const Home = () => {
  const { spotifyContext, setSpotifyContext } = useContext(SpotifyContext);

  if(spotifyContext.isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Page title={process.env.REACT_APP_SITE_NAME}>
      <Row>
        <Col md={3} />
        <Col md={18}>
          <Jumbotron>
            <Panel bordered>
              <h3>Please Link to Spotify</h3>
              <br/>
              <h5 style={{fontWeight: 'normal'}}>
                Linking to your Spotify account will allow you to view statistics on our website, such as
                your top artists, favorite albums and total songs.
              </h5>
              <br />
              <IconButton icon={<Icon icon="spotify" />} placement="left" color="green" size="lg">
                Link to Spotify
              </IconButton>
            </Panel>
          </Jumbotron>
        </Col>
        <Col md={3} />
      </Row>
    </Page>
  );
};

export default Home;
