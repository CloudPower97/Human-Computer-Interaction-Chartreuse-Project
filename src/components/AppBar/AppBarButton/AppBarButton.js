import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Styles from "./AppBarButton.css";

const AppBarButton = props => {
  const { children, tooltip, to, controls, active, toggleFontModal } = props;

  let btn = null;
  let css = Styles.AppBarButton;

  if (active) {
    css += ` ${Styles.AppBarButtonActive}`;
  }

  if (to) {
    btn = (
      <Link
        to={to}
        role="menuitem"
        aria-controls={controls}
        tabIndex="0"
        data-tooltip={tooltip}
        className={css}
      >
        {children}
      </Link>
    );
  } else {
    if (toggleFontModal) {
      btn = (
        <button
          role="menuitem"
          aria-controls={controls}
          tabIndex="0"
          data-tooltip={tooltip}
          className={css}
          onClick={() => toggleFontModal()}
        >
          {children}
        </button>
      );
    } else {
      btn = (
        <button
          role="menuitem"
          aria-controls={controls}
          tabIndex="0"
          data-tooltip={tooltip}
          className={css}
        >
          {children}
        </button>
      );
    }
  }
  return btn;
};

AppBarButton.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  tooltip: PropTypes.string.isRequired,
  to: PropTypes.string,
  controls: PropTypes.string.isRequired
};

export default AppBarButton;
