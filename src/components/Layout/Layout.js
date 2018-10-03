import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import Styles from "./Layout.css";

const Layout = props => {
  const { children } = props;

  return (
    <div className={Styles.Layout}>
      <AppBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
