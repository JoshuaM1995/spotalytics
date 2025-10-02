import React, { PropsWithChildren } from "react";
import { Nav } from "rsuite";
import { Link, useLocation } from "react-router-dom";

interface NavigationItemProps {
  to: string;
  path: string | string[];
  exact?: boolean;
}

const NavigationItem = ({
  to,
  path,
  exact,
  children,
}: PropsWithChildren<NavigationItemProps>) => {
  const location = useLocation();

  const isActive = () => {
    if (exact) {
      return location.pathname === to;
    }

    if (Array.isArray(path)) {
      return path.some((p) => location.pathname.startsWith(p));
    }

    return location.pathname.startsWith(path);
  };

  return (
    <Nav.Item
      active={isActive()}
      renderItem={() => (
        <Link className="rs-nav-item-content" to={to}>
          {children}
        </Link>
      )}
    ></Nav.Item>
  );
};

export default NavigationItem;
