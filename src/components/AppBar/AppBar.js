import React from 'react'
import Style from './AppBar.css'
import AppBarButton from './AppBarButton/AppBarButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faStreetView, faShareAlt, faUser, faFont } from '@fortawesome/free-solid-svg-icons'

const AppBar = props => {
  const { toggleFontModal } = props

  return (
    <div className={Style.AppBar} role="menubar" tabIndex="-1" aria-orientation="vertical">
      <AppBarButton
        to="/intro"
        tooltip="Visualizza la sezione introduttiva"
        controls="intro"
        active={window.location.pathname.includes('/intro')}>
        <FontAwesomeIcon icon={faHome} />
      </AppBarButton>

      <AppBarButton
        to="/esplora"
        tooltip="Immergiti in un tour virtuale delle certose campane"
        controls="explore"
        active={window.location.pathname.includes('/esplora')}>
        <FontAwesomeIcon icon={faStreetView} />
      </AppBarButton>

      <AppBarButton tooltip="Condividi questa pagina" controls="social-modal">
        <FontAwesomeIcon icon={faShareAlt} />
      </AppBarButton>

      <AppBarButton
        to="/area-personale"
        tooltip="Accedi alla tua area personale"
        controls="saved-elements"
        active={window.location.pathname.includes('/area-personale')}>
        <FontAwesomeIcon icon={faUser} />
      </AppBarButton>

      <AppBarButton
        id="font-btn"
        role="menuitem"
        aria-haspopup="dialog"
        controls="font-modal"
        tooltip="Personalizza l'esperienza di lettura"
        toggleFontModal={toggleFontModal}>
        <span className="fa-fw">
          <FontAwesomeIcon icon={faFont} />
          <FontAwesomeIcon icon={faFont} />
        </span>
      </AppBarButton>
    </div>
  )
}

export default AppBar
