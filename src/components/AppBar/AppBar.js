import React from "react";
import Style from "./AppBar.css";
import AppBarButton from "./AppBarButton/AppBarButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faStreetView,
  faShareAlt,
  faUser,
  faFont
} from "@fortawesome/free-solid-svg-icons";

const AppBar = props => {
  return (
    <div
      className={Style.AppBar}
      role="menubar"
      tabIndex="-1"
      aria-orientation="vertical"
    >
      <AppBarButton
        to="/"
        tooltip="Visualizza la sezione introduttiva"
        controls="intro"
      >
        <FontAwesomeIcon icon={faHome} />
      </AppBarButton>

      <AppBarButton
        to="/esplora"
        tooltip="Immergiti in un tour virtuale delle certose campane"
        controls="explore"
      >
        <FontAwesomeIcon icon={faStreetView} />
      </AppBarButton>

      <a
        id="social-btn"
        role="menuitem"
        aria-haspopup="dialog"
        aria-controls="social-modal"
        data-tooltip="Condividi questa pagina"
      >
        <FontAwesomeIcon icon={faShareAlt} />
      </a>

      <AppBarButton
        to="/area-personale"
        tooltip="Accedi alla tua area personale"
        controls="saved-elements"
      >
        <FontAwesomeIcon icon={faUser} />
      </AppBarButton>

      <button
        id="font-btn"
        role="menuitem"
        aria-haspopup="dialog"
        aria-controls="font-modal"
        data-tooltip="Personalizza l'esperienza di lettura"
      >
        <span className="fa-fw">
          <FontAwesomeIcon icon={faFont} />
          <FontAwesomeIcon icon={faFont} />
        </span>
      </button>
    </div>
  );
};

export default AppBar;
