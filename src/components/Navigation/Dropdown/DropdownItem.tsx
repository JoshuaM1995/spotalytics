import React, { PropsWithChildren } from "react";
import { Dropdown } from "rsuite";
import { useLocation } from "react-router-dom";
import { DropdownProps } from "rsuite/es/Dropdown";

interface DropdownItemProps extends DropdownProps {
  path: string | string[];
  exact?: boolean;
}

const DropdownItem = ({
  eventKey,
  title,
  icon,
  path,
  exact,
  children,
}: PropsWithChildren<DropdownItemProps>) => {
  const location = useLocation();

  const isActive = () => {
    if (exact) {
      return location.pathname === path;
    }

    if (Array.isArray(path)) {
      return path.some((p) => location.pathname.startsWith(p));
    }

    return location.pathname.startsWith(path);
  };

  return (
    <Dropdown
      eventKey={eventKey}
      title={title}
      icon={icon}
      active={isActive()}
      open={isActive()}
    >
      {children}
    </Dropdown>
  );
};

export default DropdownItem;
