import React from 'react';
import {Col, Panel, Row} from "rsuite";
import Page from "../Page/Page";
import StatisticCardLink from "../shared/StatisticCardLink";
import '../../styles/Dashboard.scss';

const Dashboard = () => {
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

        <Row>
          <Col md={12} className="image-block">
            <img src="https://via.placeholder.com/500x500/0000FF/FFFFFF" alt="Pattern-Seeking Animals" />
          </Col>
          <Col xs={12} md={6} className="image-block">
            <img src="https://via.placeholder.com/250x250/FF0000/FFFFFF" alt="Caligula's Horse" />
          </Col>
          <Col xs={12} md={6} className="image-block">
            <img src="https://via.placeholder.com/250x250/FFFF00/000000" alt="Trivium" />
          </Col>
          <Col xs={12} md={6} className="image-block">
            <img src="https://via.placeholder.com/250x250/FFFF00/000000" alt="Veil of Maya" />
          </Col>
          <Col xs={12} md={6} className="image-block">
            <img src="https://via.placeholder.com/250x250/FF0000/FFFFFF" alt="Havok" />
          </Col>
        </Row>
      </Panel>
      <br />

      <Panel className="panel-light">
        <h3>Top Albums</h3>
        <br />

        <Row>
          <Col md={12} className="image-block">
            <img src="https://via.placeholder.com/500x500/0000FF/FFFFFF" alt="Pattern-Seeking Animals" />
          </Col>
          <Col xs={12} md={6} className="image-block">
            <img src="https://via.placeholder.com/250x250/FF0000/FFFFFF" alt="Caligula's Horse" />
          </Col>
          <Col xs={12} md={6} className="image-block">
            <img src="https://via.placeholder.com/250x250/FFFF00/000000" alt="Trivium" />
          </Col>
          <Col xs={12} md={6} className="image-block">
            <img src="https://via.placeholder.com/250x250/FFFF00/000000" alt="Veil of Maya" />
          </Col>
          <Col xs={12} md={6} className="image-block">
            <img src="https://via.placeholder.com/250x250/FF0000/FFFFFF" alt="Havok" />
          </Col>
        </Row>
      </Panel>
    </Page>
  );
};

export default Dashboard;
