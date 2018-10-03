import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AppBarButton = props => {
  const { children, tooltip, to, controls } = props;
  return (
    <Link
      to={to}
      role="menuitem"
      aria-controls={controls}
      tabIndex="0"
      data-tooltip={tooltip}
    >
      {children}
    </Link>
  );
};

AppBarButton.propTypes = {
  children: PropTypes.node.isRequired,
  tooltip: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  controls: PropTypes.string.isRequired
};

export default AppBarButton;
