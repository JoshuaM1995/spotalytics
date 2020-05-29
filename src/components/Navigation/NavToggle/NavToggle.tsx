import {Dropdown, Icon, Nav, Navbar} from "rsuite";
import React, {useContext, useState} from "react";
import SpotifyContext from "../../../context/spotify";
import {Redirect} from "react-router";

interface NavToggleProps {
  expand: any;
  onChange: any;
}

const iconStyles = {
  width: 56,
  height: 56,
  lineHeight: '56px',
  textAlign: 'center'
};

const NavToggle = ({ expand, onChange }: NavToggleProps) => {
  const { spotifyContext, setSpotifyContext } = useContext(SpotifyContext);
  const [ redirect, setRedirect ] = useState(<></>);
  const [isUnlinkIconLoading, setIsUnlinkIconLoading] = useState(false);

  const unlinkSpotifyAccount = () => {
    setIsUnlinkIconLoading(true);

    // TODO: Replace with action to unlink the user from Spotify via Passport
    setTimeout(() => {
      setSpotifyContext({
        ...spotifyContext,
        isAuthenticated: false,
      });
      setIsUnlinkIconLoading(false);

      setRedirect(<Redirect to="/unauthenticated" />);
    }, 1000);
  };

  return (
    <>
      { redirect }
      <Navbar appearance="subtle" className="nav-toggle">
        <Navbar.Body>
          {spotifyContext.isAuthenticated &&
            <Nav>
              <Dropdown
                placement="topStart"
                trigger="click"
                renderTitle={children => {
                  // @ts-ignore
                  return <Icon style={iconStyles} icon="cog"/>;
                }}
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
                      onClick={() => unlinkSpotifyAccount()}
                    >
                      <Icon icon={isUnlinkIconLoading ? 'spinner' : 'spotify'} pulse={isUnlinkIconLoading}/>
                      {isUnlinkIconLoading ? 'Unlinking Spotify...' : 'Unlink Application'}
                    </a>
                  )}
                >
                </Dropdown.Item>
              </Dropdown>
            </Nav>
          }

          <Nav pullRight>
            <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
              <Icon icon={expand ? 'angle-left' : 'angle-right'} />
            </Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    </>
  );
};

export default NavToggle;
