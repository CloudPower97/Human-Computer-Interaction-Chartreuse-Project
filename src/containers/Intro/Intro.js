import React from "react";
import Styles from "./Intro.css";

const Intro = () => {
  return (
    <section id="intro" className={Styles.Intro}>
      <header>
        <nav id="nav-bar">
          <ul>
            <li>
              <a href="#!">Test 1</a>
            </li>
            <li>
              <a href="#!">Test 2</a>
            </li>
            <li>
              <a href="#!">Test 3</a>
            </li>
            <li>
              <a href="#!">Test 4</a>
            </li>
            <li>
              <a href="#!">Test 5</a>
            </li>
          </ul>
        </nav>
      </header>

      <div
        id="intro"
        data-section-title="Introduzione alla storia delle certose"
      >
        <h1>H1 Test</h1>
        <h2>H2 Test</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
          corporis perspiciatis illum in libero corrupti eos. Molestiae, dolorum
          deleniti, temporibus beatae perspiciatis maiores quia illum laboriosam
          debitis distinctio iste reiciendis molestias! Animi, libero? Commodi
          cupiditate optio enim obcaecati, unde nihil asperiores corporis dolore
          quas neque dolorum molestiae, consectetur voluptatem, quasi tempore.
          Molestias amet adipisci quod accusantium expedita. Voluptate
          accusamus, nisi nam, odit mollitia inventore maxime illum corporis
          laudantium architecto nostrum blanditiis minima, iure fugiat vel magni
          omnis distinctio natus dolor. Eum maxime nemo et sed! Illo excepturi
          suscipit aliquid delectus dicta minima esse aliquam, dignissimos
          inventore obcaecati nesciunt eligendi cumque!
        </p>
      </div>

      <div id="features" data-section-title="">
        <h2>
          <span style={{ color: "#c0b282" }}>Lorem</span> ipsum
        </h2>

        <div id="features-wrapper">
          <div className="features">
            <i className="fas fa-map-marked-alt fa-4x" />
            <h3>Lorem, ipsum.</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias,
              esse.
            </p>
          </div>

          <div className="features">
            <i className="far fa-calendar fa-4x" />
            <h3>Lorem, ipsum.</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
              velit.
            </p>
          </div>

          <div className="features">
            <i className="fas fa-paint-brush fa-4x" />
            <h3>Lorem, ipsum.</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Inventore, doloremque!
            </p>
          </div>
        </div>

        <button className="btn">
          Discover More
          <i className="fas fa-arrow-right" />
        </button>
      </div>

      <div
        id="z"
        data-section-title="La Certosa di San Martino - Una storia tutta Napoletana"
      >
        <h1>H1 Test</h1>
        <h2>H2 Test</h2>
        <p>La certsoa di san Martino situata a napoli e' considera...</p>
      </div>
    </section>
  );
};

export default Intro;
