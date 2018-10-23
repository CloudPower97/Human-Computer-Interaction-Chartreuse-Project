import React from 'react'
import Styles from './Backdrop.css'
import PropTypes from 'prop-types'

const Backdrop = props => {
  const { children, toggleModal } = props

  return <div className={Styles.Backdrop}>{children}</div>
}

Backdrop.propTypes = {
  children: PropTypes.node.isRequired,
  toggleModal: PropTypes.func.isRequired,
}

export default Backdrop
