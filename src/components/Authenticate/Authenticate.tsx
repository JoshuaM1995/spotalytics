import React, {useContext, useEffect, useState} from 'react';
import Page from '../Page/Page';
import {Col, Icon, IconButton, Panel, Row} from "rsuite";
import Spotify from "../../api/Spotify";
import SpotifyContext, {SpotifyContextValues} from "../../context/spotify";
import {SPOTIFY_CONTEXT} from "../../constants";
import {Redirect} from "react-router";

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code') ?? '';

const Authenticate = () => {
  const {spotifyContext, setSpotifyContext} = useContext(SpotifyContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (code) {
      const context: SpotifyContextValues = {
        ...spotifyContext,
        isAuthenticated: true,
        accessToken: code,
      };
      setSpotifyContext(context);
      sessionStorage.setItem(SPOTIFY_CONTEXT, JSON.stringify(context));
      setRedirect(true);
    }
  }, []);

  return (
    <>
      {redirect &&
        <Redirect to="/dashboard" />
      }
      <Page>
        <Row>
          <Col md={3}/>
          <Col md={18}>
            <Panel bordered className="jumbotron">
              <h3>Please Link to Spotify</h3>
              <br/>
              <h5 style={{fontWeight: 'normal'}}>
                Linking to your Spotify account will allow you to view statistics on our website, such as
                your top artists, favorite albums and total songs.
              </h5>
              <br/>
              <a href={Spotify.getAuthorizeURL()}>
                <IconButton icon={<Icon icon="spotify"/>} placement="left" color="green" size="lg">
                  Link to Spotify
                </IconButton>
              </a>
            </Panel>
          </Col>
          <Col md={3}/>
        </Row>
      </Page>
    </>
  );
};

export default Authenticate;
