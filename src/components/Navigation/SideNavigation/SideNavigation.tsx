import React, {useState} from 'react';
import {Dropdown, Icon, Nav, Sidebar, Sidenav} from "rsuite";
import NavToggle from "../NavToggle/NavToggle";
import {useLocation} from "react-router-dom";
import {dashboardRoutes} from "../../../App";
import NavigationItem from "../NavigationItem/NavigationItem";
import DropdownItem from "../Dropdown/DropdownItem";
import DropdownItemLink from "../Dropdown/DropdownItemLink";

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

const SideNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  console.log('pathname', location.pathname);

  return (
    <Sidebar
      style={{display: 'flex', flexDirection: 'column'}}
      width={isExpanded ? 260 : 56}
      collapsible
    >
      <Sidenav.Header>
        {/*@ts-ignore*/}
        <div style={headerStyles}>
          <Icon icon="logo-analytics" size="lg" style={{verticalAlign: 0}}/>
          <span style={{marginLeft: 12}}>SPOTICS</span>
        </div>
      </Sidenav.Header>
      <Sidenav
        expanded={isExpanded}
        appearance="inverse"
      >
        <Sidenav.Body>
          <Nav>
            <NavigationItem to="/" path={dashboardRoutes} exact>
              <Icon icon="dashboard"/>
              Dashboard
            </NavigationItem>
            <DropdownItem
              eventKey="2"
              title="Artists"
              icon={<Icon icon="user"/>}
              path="/artists"
            >
              <DropdownItemLink
                to="/artists/top"
                path="/artists/top"
                eventKey="2-1"
              >
                <Icon icon="bar-chart-ranking" flip="horizontal" />
                Top Artists
              </DropdownItemLink>
              <Dropdown.Item eventKey="2-2" icon={<Icon icon="user-plus"/>}>
                Recently Followed
              </Dropdown.Item>
            </DropdownItem>
            <Dropdown
              eventKey="4"
              title="Albums"
              icon={<Icon icon="play-circle"/>}
            >
              <Dropdown.Item eventKey="3-1" icon={<Icon icon="bar-chart-ranking" flip="horizontal"/>}>
                Top Albums
              </Dropdown.Item>
              <Dropdown.Item eventKey="3-2" icon={<Icon icon="heart"/>}>
                Favorite Albums
              </Dropdown.Item>
            </Dropdown>
            <Dropdown
              eventKey="5"
              title="Tracks"
              icon={<Icon icon="music"/>}
            >
              <Dropdown.Item eventKey="4-1" icon={<Icon icon="bar-chart-ranking" flip="horizontal"/>}>
                Top Tracks
              </Dropdown.Item>
              <Dropdown.Item eventKey="4-2" icon={<Icon icon="play"/>}>
                Recently Played
              </Dropdown.Item>
              <Dropdown.Item eventKey="4-3" icon={<Icon icon="thumbs-up"/>}>
                Liked Songs
              </Dropdown.Item>
            </Dropdown>
            <Dropdown
              eventKey="6"
              title="Settings"
              icon={<Icon icon="gear-circle"/>}
            >
              <Dropdown.Item eventKey="5-1" icon={<Icon icon="user-circle"/>}>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="5-2"
                icon={<Icon icon="spotify"/>}
                renderItem={() => (
                  <a
                    className="rs-dropdown-item-content"
                    href="https://www.spotify.com/ca-en/account/apps/"
                    target="_blank"
                  >
                    <i className="rs-dropdown-item-menu-icon rs-icon rs-icon-spotify"/>
                    Unlink Application
                  </a>
                )}
              >
              </Dropdown.Item>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <NavToggle expand={isExpanded} onChange={() => setIsExpanded(!isExpanded)}/>
    </Sidebar>
  );
};

export default SideNavigation;
