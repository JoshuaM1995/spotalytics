import {Dropdown, Icon, Nav, Navbar} from "rsuite";
import React from "react";

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
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Navbar.Body>
        <Nav>
          <Dropdown
            placement="topStart"
            trigger="click"
            renderTitle={children => {
              // @ts-ignore
              return <Icon style={iconStyles} icon="cog" />;
            }}
          >
            <Dropdown.Item>Help</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </Nav>

        <Nav pullRight>
          <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
            <Icon icon={expand ? 'angle-left' : 'angle-right'} />
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

export default NavToggle;
