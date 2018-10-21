import React from "react";
import Styles from "./Navbar.css";

import PropTypes from "prop-types";

const Navbar = ({ children }) => {
  return (
    <header className={Styles.NavBar}>
      <nav>
        <ul>{children}</ul>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  children: PropTypes.node.isRequired
};

export default Navbar;
