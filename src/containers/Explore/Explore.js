import React, { Component } from "react";
import Styles from "./Explore.css";
import ChartreusesList from "../../components/ChartreusesList/ChartreusesList";
import ChartreusesEditor from "../../components/ChartreusesEditor/ChartreusesEditor";

export default class Explore extends Component {
  render() {
    return (
      <section id="explore" className={Styles.Explore}>
        <ChartreusesList />

        <ChartreusesEditor />
      </section>
    );
  }
}
