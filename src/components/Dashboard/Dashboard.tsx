import React from 'react';
import {Col, Row} from "rsuite";
import Page from "../Page/Page";
import StatisticCardLink from "../shared/StatisticCardLink";

const Dashboard = () => {
  return (
    <Page title="Dashboard">
      <Row className="show-grid">
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
    </Page>
  );
};

export default Dashboard;
