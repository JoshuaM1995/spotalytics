import {FlexboxGrid, Icon, Panel} from "rsuite";
import React, {ReactNode, useState} from "react";
import {IconNames} from "rsuite/es/Icon";
import './StatisticCard.scss';

export interface StatisticCardProps {
  background: string;
  icon: IconNames;
  statisticValue: number | string;
  statisticText: ReactNode;
}

const StatisticCard = ({background, icon, statisticValue, statisticText}: StatisticCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Panel
      shaded={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{background: background}}
      className="statistic-card"
    >
      <FlexboxGrid align="middle">
        <FlexboxGrid.Item colspan={6}>
          <Icon icon={icon} size="5x"/>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={18} style={{textAlign: 'right'}}>
          <h2>{statisticValue}</h2>
          <h5 style={{fontWeight: 'normal'}}>{statisticText}</h5>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
};

export default StatisticCard;
