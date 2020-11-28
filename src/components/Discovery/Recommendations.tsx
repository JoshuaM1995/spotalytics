import React, {useState} from 'react';
import Page from "../Page/Page";
import './Recommendations.scss';
import AdvancedRecommendations from "./AdvancedRecommendations";
import SimpleRecommendations from "./SimpleRecommendations";
import {Nav} from "rsuite";
import AutomaticRecommendations from "./AutomaticRecommendations";

enum Tab {
  AUTOMATIC_RECOMMENDATIONS = 'AUTOMATIC_RECOMMENDATIONS',
  SIMPLE_FILTERS = 'SIMPLE_FILTERS',
  ADVANCED_FILTERS = 'ADVANCED_FILTERS',
}

const Recommendations = () => {
  const [activeTab, setActiveTab] = useState(Tab.AUTOMATIC_RECOMMENDATIONS);

  return (
    <Page title="Recommendations">
      <Nav appearance="subtle" justified>
        <Nav.Item
          active={activeTab === Tab.AUTOMATIC_RECOMMENDATIONS}
          onClick={() => setActiveTab(Tab.AUTOMATIC_RECOMMENDATIONS)}
        >
          Automatic Recommendations
        </Nav.Item>
        <Nav.Item
          active={activeTab === Tab.SIMPLE_FILTERS}
          onClick={() => setActiveTab(Tab.SIMPLE_FILTERS)}
        >
          Simple Recommendation Filters
        </Nav.Item>
        <Nav.Item
          active={activeTab === Tab.ADVANCED_FILTERS}
          onClick={() => setActiveTab(Tab.ADVANCED_FILTERS)}
        >
          Advanced Recommendation Filters
        </Nav.Item>
      </Nav>
      <br />

      <div style={{ display: (activeTab === Tab.AUTOMATIC_RECOMMENDATIONS) ? 'block' : 'none' }}>
        <AutomaticRecommendations />
      </div>

      <div style={{ display: (activeTab === Tab.SIMPLE_FILTERS) ? 'block' : 'none' }}>
        <SimpleRecommendations />
      </div>

      <div style={{ display: (activeTab === Tab.ADVANCED_FILTERS) ? 'block' : 'none' }}>
        <AdvancedRecommendations />
      </div>
    </Page>
  );
};

export default Recommendations;
