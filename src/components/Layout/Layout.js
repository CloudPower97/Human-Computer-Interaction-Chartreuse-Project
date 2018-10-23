import React, { Component } from 'react'
import AppBar from '../AppBar/AppBar'
import FontModal from '../FontModal/FontModal'
import Styles from './Layout.css'
import Backdrop from '../Backdrop/Backdrop'

class Layout extends Component {
  state = {
    showFontModal: false,
  }

  toggleFontModal = () => {
    this.setState(prevState => ({
      showFontModal: !prevState.showFontModal,
    }))
  }

  render() {
    const { children } = this.props
    const { showFontModal } = this.state

    return (
      <div className={Styles.Layout}>
        <AppBar toggleFontModal={this.toggleFontModal} />

        {showFontModal && (
          <Backdrop>
            <FontModal />
          </Backdrop>
        )}

        <main>{children}</main>
      </div>
    )
  }
}

export default Layout
