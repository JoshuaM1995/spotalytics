import React, {PropsWithChildren, ReactChildren} from 'react';
import {Nav} from "rsuite";
import {Link, Route} from "react-router-dom";

interface NavigationItemProps {
  to: string;
  path: string|string[];
  exact?: boolean;
}

const NavigationItem = ({ to, path, exact, children }: PropsWithChildren<NavigationItemProps>) => {
  return (
    <Route path={path} exact={exact} children={({match}) => (
      <Nav.Item
        active={!!match}
        renderItem={() => (
          <Link
            className="rs-nav-item-content"
            to={to}
          >
            { children }
          </Link>
        )}
      >
      </Nav.Item>
    )}/>
  );
};

export default NavigationItem;
