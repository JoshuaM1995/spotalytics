import React, {PropsWithChildren} from 'react';
import {Dropdown} from "rsuite";
import {Link, Route} from "react-router-dom";
import {DropdownMenuItemProps} from "rsuite/es/Dropdown/DropdownMenuItem";

interface DropdownItemChildProps extends DropdownMenuItemProps {
  path: string;
  exact?: boolean;
  to: string;
}

const DropdownItemLink = ({
  path, exact, to, eventKey, children
}: PropsWithChildren<DropdownMenuItemProps>) => {
  return (
    <Route path={path} exact={exact} children={({match}) => (
      <Dropdown.Item
        eventKey={eventKey}
        active={!!match}
        renderItem={() => (
          <Link to={to} className="rs-dropdown-item-content">
            {children}
          </Link>
        )}
      >
      </Dropdown.Item>
    )}/>
  );
};

export default DropdownItemLink;
