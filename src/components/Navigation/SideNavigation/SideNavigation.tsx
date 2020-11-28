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
              title="Discover"
              icon={<Icon icon="search"/>}
              path="/discover"
            >
              <DropdownItemLink
                to="/discover"
                path="/discover"
                eventKey="2-1"
              >
                <Icon icon="creative" />
                Recommendations
              </DropdownItemLink>
              <DropdownItemLink
                to="/discover/similar-tracks"
                path="/discover/similar-tracks"
                eventKey="2-2"
              >
                <Icon icon="music" />
                Similar Tracks
              </DropdownItemLink>
              <DropdownItemLink
                to="/discover/similar-albums"
                path="/discover/similar-albums"
                eventKey="2-3"
              >
                <Icon icon="play-circle" />
                Similar Albums
              </DropdownItemLink>
            </DropdownItem>
            <DropdownItem
              eventKey="3"
              title="Analytics"
              icon={<Icon icon="charts"/>}
              path="/analytics"
            >
              <DropdownItemLink
                to="/analytics/artist-countries"
                path="/analytics/artist-countries"
                eventKey="3-1"
              >
                <Icon icon="map" flip="horizontal" />
                Artist Countries
              </DropdownItemLink>
              <DropdownItemLink
                to="/analytics/taste-profile"
                path="/analytics/taste-profile"
                eventKey="3-2"
              >
                <Icon icon="profile" />
                Taste Profile
              </DropdownItemLink>
            </DropdownItem>
            <DropdownItem
              eventKey="4"
              title="Artists"
              icon={<Icon icon="user"/>}
              path="/artists"
            >
              <DropdownItemLink
                to="/artists/top"
                path="/artists/top"
                eventKey="4-1"
              >
                <Icon icon="bar-chart-ranking" flip="horizontal" />
                Top Artists
              </DropdownItemLink>
              <DropdownItemLink
                to="/artists/followed"
                path="/artists/followed"
                eventKey="4-2"
              >
                <Icon icon="user-plus" />
                Followed Artists
              </DropdownItemLink>
            </DropdownItem>
            <Dropdown
              eventKey="5"
              title="Albums"
              icon={<Icon icon="play-circle"/>}
            >
              <DropdownItemLink
                to="/albums/top"
                path="/albums/top"
                eventKey="5-1"
              >
                <Icon icon="bar-chart-ranking" flip="horizontal" />
                Top Albums
              </DropdownItemLink>
              <DropdownItemLink
                to="/albums/saved"
                path="/albums/saved"
                eventKey="5-2"
              >
                <Icon icon="heart" />
                Saved Albums
              </DropdownItemLink>
            </Dropdown>
            <Dropdown
              eventKey="6"
              title="Tracks"
              icon={<Icon icon="music"/>}
            >
              <DropdownItemLink
                to="/tracks/top"
                path="/tracks/top"
                eventKey="6-1"
              >
                <Icon icon="bar-chart-ranking" flip="horizontal" />
                Top Tracks
              </DropdownItemLink>
              <DropdownItemLink
                to="/tracks/recently-played"
                path="/tracks/recently-played"
                eventKey="6-2"
              >
                <Icon icon="play" />
                Recently Played
              </DropdownItemLink>
              <DropdownItemLink
                to="/tracks/favorited"
                path="/tracks/favorited"
                eventKey="6-3"
              >
                <Icon icon="heart" />
                Favorited Tracks
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
