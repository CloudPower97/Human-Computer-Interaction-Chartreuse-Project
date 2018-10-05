import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Intro from "./containers/Intro/Intro";
import Explore from "./containers/Explore/Explore";
import SavedElements from "./containers/SavedElements/SavedElements";
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/area-personale" exact component={SavedElements} />
          <Route path="/esplora" exact component={Explore} />
          <Route path="/intro" exact component={Intro} />
          <Redirect to="/intro" />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);
