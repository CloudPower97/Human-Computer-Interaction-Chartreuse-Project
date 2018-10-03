import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Intro from "./containers/Intro/Intro";
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Intro} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);
