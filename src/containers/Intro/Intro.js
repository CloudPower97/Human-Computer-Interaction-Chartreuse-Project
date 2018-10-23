import React from 'react'
import Styles from './Intro.css'

import Navbar from "../../components/Navbar/Navbar";
import NavItem from "../../components/NavItem/NavItem";

const Intro = () => {
  return (
    <section className={Styles.Intro}>
      <Navbar>
        <NavItem to="#!">Test 1</NavItem>
        <NavItem to="#!">Test 2</NavItem>
        <NavItem to="#!">Test 3</NavItem>
        <NavItem to="#!">Test 4</NavItem>
        <NavItem to="#!">Test 5</NavItem>
      </Navbar>

      <div id="intro" data-section-title="Introduzione alla storia delle certose">
        <h1>H1 Test</h1>
        <h2>H2 Test</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, corporis perspiciatis
          illum in libero corrupti eos. Molestiae, dolorum deleniti, temporibus beatae perspiciatis
          maiores quia illum laboriosam debitis distinctio iste reiciendis molestias! Animi, libero?
          Commodi cupiditate optio enim obcaecati, unde nihil asperiores corporis dolore quas neque
          dolorum molestiae, consectetur voluptatem, quasi tempore. Molestias amet adipisci quod
          accusantium expedita. Voluptate accusamus, nisi nam, odit mollitia inventore maxime illum
          corporis laudantium architecto nostrum blanditiis minima, iure fugiat vel magni omnis
          distinctio natus dolor. Eum maxime nemo et sed! Illo excepturi suscipit aliquid delectus
          dicta minima esse aliquam, dignissimos inventore obcaecati nesciunt eligendi cumque!
        </p>
      </div>

      <div id="z" data-section-title="La Certosa di San Martino - Una storia tutta Napoletana">
        <h1>H1 Test</h1>
        <h2>H2 Test</h2>
        <p>La certsoa di san Martino situata a napoli e' considera...</p>
      </div>
    </section>
  )
}

export default Intro
