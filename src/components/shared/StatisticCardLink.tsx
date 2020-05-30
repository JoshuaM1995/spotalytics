import React from 'react';
import {Link} from "react-router-dom";
import StatisticCard, {StatisticCardProps} from "./StatisticCard";

interface StatisticCardLinkProps extends StatisticCardProps {
  to: string;
}

const StatisticCardLink = ({to, background, icon, statisticValue, statisticText}: StatisticCardLinkProps) => {
  return (
    <Link to={to} className="statistic-card-link">
      <StatisticCard
        background={background}
        icon={icon}
        statisticValue={statisticValue}
        statisticText={statisticText}/>
    </Link>
  );
};

export default StatisticCardLink;
