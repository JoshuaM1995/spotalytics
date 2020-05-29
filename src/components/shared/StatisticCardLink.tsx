import React from 'react';
import {Link} from "react-router-dom";
import StatisticCard, {StatisticCardProps, statisticCardStyle} from "./StatisticCard";
import styled from "styled-components";

interface StatisticCardLinkProps extends StatisticCardProps {
  to: string;
}

const StatisticCardLink = ({to, background, icon, statisticValue, statisticText}: StatisticCardLinkProps) => {
  const StatisticCardLinkStyle = styled(statisticCardStyle(background))`
    &:hover {
      text-decoration: none !important;
    }
  `;

  return (
    <StatisticCardLinkStyle>
      <Link to={to} className="stat-card-link">
        <StatisticCard
          background={background}
          icon={icon}
          statisticValue={statisticValue}
          statisticText={statisticText}/>
      </Link>
    </StatisticCardLinkStyle>
  );
};

export default StatisticCardLink;
