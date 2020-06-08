import React, {useState} from 'react';
import Page from "../Page/Page";
import './Recommendations.scss';
import AdvancedRecommendations from "./AdvancedRecommendations";
import SimpleRecommendations from "./SimpleRecommendations";
import {Nav} from "rsuite";

enum Tab {
  SIMPLE_FILTERS = 'SIMPLE_FILTERS',
  ADVANCED_FILTERS = 'ADVANCED_FILTERS',
}

const Recommendations = () => {
  const [activeTab, setActiveTab] = useState(Tab.SIMPLE_FILTERS);

  const changeTab = (activeKey: Tab) => {
    setActiveTab(activeKey);
  };

  return (
    <Page title="Recommendations">
      <Nav appearance="subtle" justified>
        <Nav.Item
          active={activeTab === Tab.SIMPLE_FILTERS}
          onClick={() => changeTab(Tab.SIMPLE_FILTERS)}
        >
          Simple Recommendations
        </Nav.Item>
        <Nav.Item
          active={activeTab === Tab.ADVANCED_FILTERS}
          onClick={() => changeTab(Tab.ADVANCED_FILTERS)}
        >
          Advanced Recommendations
        </Nav.Item>
      </Nav>
      <br />

      {activeTab === Tab.SIMPLE_FILTERS && <SimpleRecommendations />}

      {activeTab === Tab.ADVANCED_FILTERS && <AdvancedRecommendations />}
    </Page>
  );
};

export default Recommendations;
