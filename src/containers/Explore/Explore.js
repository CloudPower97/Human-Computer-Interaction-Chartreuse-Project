import React from 'react'
import Styles from './Explore.css'
import ChartreusesList from '../../components/ChartreusesList/ChartreusesList'
import ChartreusesEditor from '../../components/ChartreusesEditor/ChartreusesEditor'

const Explore = () => (
  <section className={Styles.Explore}>
    <ChartreusesList />

    <ChartreusesEditor />
  </section>
)

export default Explore
