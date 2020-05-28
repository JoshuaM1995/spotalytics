import React, {PropsWithChildren} from 'react';
import {Dropdown} from "rsuite";
import {Route} from "react-router-dom";
import {DropdownProps} from "rsuite/es/Dropdown";

interface DropdownItemProps extends DropdownProps {
  path: string|string[];
  exact?: boolean;
}

const DropdownItem = ({
  eventKey, title, icon, path, exact, children
}: PropsWithChildren<DropdownItemProps>) => {
  return (
    <Route path={path} exact={exact} children={({match}) => (
      <Dropdown
        eventKey={eventKey}
        title={title}
        icon={icon}
        active={!!match}
        open={!!match}
      >
        { children }
      </Dropdown>
    )}/>
  );
};

export default DropdownItem;
