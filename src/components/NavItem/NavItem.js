import React from "react";
import PropTypes from "prop-types";

const NavItem = ({ children, to }) => {
  return (
    <li>
      <a href={to}>{children}</a>
    </li>
  );
};

NavItem.propTypes = {
  chidlren: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default NavItem;
