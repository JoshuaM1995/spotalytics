import React from 'react';
import Page from '../Page/Page';
import {Col, Icon, IconButton, Panel, Row} from "rsuite";

const Authenticate = () => {
  return (
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
            <IconButton icon={<Icon icon="spotify"/>} placement="left" color="green" size="lg">
              Link to Spotify
            </IconButton>
          </Panel>
        </Col>
        <Col md={3}/>
      </Row>
    </Page>
  );
};

export default Authenticate;
