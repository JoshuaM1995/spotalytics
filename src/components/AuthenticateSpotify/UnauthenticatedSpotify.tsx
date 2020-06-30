import React from 'react';
import Page from '../Page/Page';
import {Col, Icon, IconButton, Panel, Row} from "rsuite";

const UnauthenticatedSpotify = () => {
  return (
    <Page>
      <Row>
        <Col md={3}/>
        <Col md={18}>
          <div className="jumbotron">
            <Panel bordered>
              <h3>Successfully Unlinked</h3>
              <br/>
              <h5 style={{fontWeight: 'normal'}}>
                Your Spotify account has been unlinked. You may now remove this site
                from your list of "approved applications"
              </h5>
              <br/>
              <a
                href="https://www.spotify.com/ca-en/account/apps/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton
                  icon={<Icon icon="spotify"/>}
                  placement="left"
                  color="green"
                  size="lg"
                >
                  Remove App
                </IconButton>
              </a>
            </Panel>
          </div>
        </Col>
        <Col md={3}/>
      </Row>
    </Page>
  );
};

export default UnauthenticatedSpotify;
