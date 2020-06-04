import React, {useContext, useState} from 'react';
import {Dropdown, Icon, Nav, Sidebar, Sidenav} from "rsuite";
import NavToggle from "../NavToggle/NavToggle";
import NavigationItem from "../NavigationItem/NavigationItem";
import DropdownItem from "../Dropdown/DropdownItem";
import DropdownItemLink from "../Dropdown/DropdownItemLink";
import SpotifyContext from "../../../context/spotify";
import './SideNavigation.scss';

const SideNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { spotifyContext } = useContext(SpotifyContext);

  return (
    <Sidebar
      style={{display: 'flex', flexDirection: 'column'}}
      width={isExpanded ? 260 : 56}
      collapsible
    >
      <Sidenav.Header>
        {/*@ts-ignore*/}
        <div className="header">
          <Icon icon="logo-analytics" size="lg" style={{verticalAlign: 0}}/>
          <span style={{marginLeft: 18}}>
            { process.env.REACT_APP_SITE_NAME }
          </span>
        </div>
      </Sidenav.Header>
      <Sidenav
        expanded={isExpanded}
        appearance="inverse"
      >
        <Sidenav.Body>
          <Nav>
            {!spotifyContext.isAuthenticated &&
              <NavigationItem to="/" path="/" exact>
                <Icon icon="home"/>
                Home
              </NavigationItem>
            }
            <NavigationItem to="/dashboard" path="/dashboard">
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
              <DropdownItemLink
                to="/artists/followed"
                path="/artists/followed"
                eventKey="2-2"
              >
                <Icon icon="list-ol" />
                Followed Artists
              </DropdownItemLink>
            </DropdownItem>
            <Dropdown
              eventKey="3"
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
              eventKey="4"
              title="Tracks"
              icon={<Icon icon="music"/>}
            >
              <Dropdown.Item eventKey="4-1" icon={<Icon icon="bar-chart-ranking" flip="horizontal"/>}>
                Top Tracks
              </Dropdown.Item>
              <DropdownItemLink
                to="/tracks/recently-played"
                path="/tracks/recently-played"
                eventKey="3-3"
              >
                <Icon icon="play" />
                Recently Played
              </DropdownItemLink>
              <Dropdown.Item eventKey="4-3" icon={<Icon icon="thumbs-up"/>}>
                Liked Tracks
              </Dropdown.Item>
              <DropdownItemLink
                to="/tracks/all"
                path="/tracks/all"
                eventKey="4-4"
              >
                <Icon icon="list-ol" />
                All Tracks
              </DropdownItemLink>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <NavToggle expand={isExpanded} onChange={() => setIsExpanded(!isExpanded)}/>
    </Sidebar>
  );
};

export default SideNavigation;
