import React, { PropsWithChildren } from "react";
import { Dropdown } from "rsuite";
import { Link, useLocation } from "react-router-dom";
import { DropdownMenuItemProps } from "rsuite/es/Dropdown/DropdownMenuItem";

interface DropdownItemChildProps extends DropdownMenuItemProps {
  path: string;
  exact?: boolean;
  to: string;
}

const DropdownItemLink = ({
  path,
  exact,
  to,
  eventKey,
  children,
}: PropsWithChildren<DropdownMenuItemProps>) => {
  const location = useLocation();

  const isActive = () => {
    if (exact) {
      return location.pathname === to;
    }

    return location.pathname.startsWith(path);
  };

  return (
    <Dropdown.Item
      eventKey={eventKey}
      active={isActive()}
      renderItem={() => (
        <Link to={to} className="rs-dropdown-item-content">
          {children}
        </Link>
      )}
    ></Dropdown.Item>
  );
};

export default DropdownItemLink;
