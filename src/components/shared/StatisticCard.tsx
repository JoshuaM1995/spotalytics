import {FlexboxGrid, Icon, Panel} from "rsuite";
import React, {ReactNode, useState} from "react";
import {IconNames} from "rsuite/es/Icon";
import styled, {ThemedStyledFunction} from "styled-components";

export interface StatisticCardProps {
  background: string;
  icon: IconNames;
  statisticValue: number|string;
  statisticText: ReactNode;
  style?: ThemedStyledFunction<'div', any>;
}

export const statisticCardStyle = (background: string) => {
  return styled.div`
    .rs-panel {
      background: ${background};
    }

    &:hover a {
      text-decoration: none;
    }
  `;
};

const StatisticCard = ({ background, icon, statisticValue, statisticText }: StatisticCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const StatisticCardStyle = statisticCardStyle(background);

  return (
    <StatisticCardStyle>
      <Panel
        shaded={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FlexboxGrid align="middle">
          <FlexboxGrid.Item colspan={6}>
            <Icon icon={icon} size="5x" />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={18} style={{ textAlign: 'right' }}>
            <h2>{ statisticValue }</h2>
            <h5 style={{ fontWeight: 'normal' }}>{ statisticText }</h5>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Panel>
    </StatisticCardStyle>
  );
};

export default StatisticCard;
