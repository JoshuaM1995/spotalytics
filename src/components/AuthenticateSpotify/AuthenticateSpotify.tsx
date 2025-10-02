import React, { useContext, useEffect, useState } from "react";
import Page from "../Page/Page";
import { Col, Icon, IconButton, Panel, Row } from "rsuite";
import SpotifyApi from "../../api/SpotifyApi";
import SpotifyContext from "../../context/spotify";
import { Navigate, useParams } from "react-router-dom";
import { SPOTIFY_CONTEXT } from "../../utils/constants";

const urlParams = new URLSearchParams(window.location.hash);
const accessToken = urlParams.get("#access_token") ?? "";

const AuthenticateSpotify = () => {
  const { action } = useParams();
  const { spotifyContext, setSpotifyContext } =
    useContext<SpotifyContext>(SpotifyContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (accessToken) {
      const spotifyApi = new SpotifyApi(accessToken);
      spotifyApi
        .getCurrentUserProfile()
        .then((currentUser: SpotifyApi.CurrentUsersProfileResponse) => {
          setSpotifyContext((spotifyContext: SpotifyContext) => {
            const newSpotifyContext = {
              ...spotifyContext,
              isAuthenticated: true,
              accessToken,
              currentUser,
            };
            localStorage.setItem(
              SPOTIFY_CONTEXT,
              JSON.stringify(newSpotifyContext)
            );

            return newSpotifyContext;
          });

          setRedirect(true);
        });
    }

    // We need to re-authenticate, so remove the spotify context authentication values and session storage values
    if (action === "reauthenticate") {
      setSpotifyContext({
        ...spotifyContext,
        isAuthenticated: false,
        accessToken: "",
      });
      localStorage.removeItem(SPOTIFY_CONTEXT);
    }
  }, [action]);

  return (
    <>
      {redirect && <Navigate to="/dashboard" replace />}
      <Page>
        <Row>
          <Col md={3} />
          <Col md={18}>
            <Panel bordered className="jumbotron">
              <h3>Please Link to Spotify</h3>
              <br />
              <h5 style={{ fontWeight: "normal" }}>
                Linking to your Spotify account will allow you to view
                statistics on our website, such as your top artists, favorite
                albums and total songs.
              </h5>
              <br />
              <a href={SpotifyApi.getAuthorizeURL()}>
                <IconButton
                  icon={<Icon icon="spotify" />}
                  placement="left"
                  color="green"
                  size="lg"
                >
                  Link to Spotify
                </IconButton>
              </a>
            </Panel>
          </Col>
          <Col md={3} />
        </Row>
      </Page>
    </>
  );
};

export default AuthenticateSpotify;
