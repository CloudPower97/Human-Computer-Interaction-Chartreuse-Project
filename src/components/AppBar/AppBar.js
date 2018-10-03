import React from "react";
import Style from "./AppBar.css";

const AppBar = props => {
  return (
    <div
      className={Style.AppBar}
      role="menubar"
      tabIndex="-1"
      aria-orientation="vertical"
    >
      <button
        id="home"
        className="active"
        role="menuitem"
        aria-controls="intro"
        tabIndex="0"
        data-tooltip="Visualizza la sezione introduttiva"
      >
        <span className="fa-fw">
          <i className="fas fa-home" />
        </span>
      </button>

      <button
        id="explore-btn"
        role="menuitem"
        aria-controls="explore"
        data-tooltip="Immergiti in un tour virtuale delle certose campane"
      >
        <span className="fa-fw">
          <i className="fas fa-street-view" />
        </span>
      </button>

      <button
        id="social-btn"
        role="menuitem"
        aria-haspopup="dialog"
        aria-controls="social-modal"
        data-tooltip="Condividi questa pagina"
      >
        <span className="fa-fw">
          <i className="fas fa-share-alt" />
        </span>
      </button>

      <button
        id="saved-elements-btn"
        role="menuitem"
        aria-controls="saved-elements"
        data-tooltip="Accedi alla tua area personale"
      >
        <span className="fa-fw">
          <i className="fas fa-user" />
        </span>
      </button>

      <button
        id="font-btn"
        role="menuitem"
        aria-haspopup="dialog"
        aria-controls="font-modal"
        data-tooltip="Personalizza l'esperienza di lettura"
      >
        <span className="fa-fw">
          <i className="fas fa-font" />
          <i className="fas fa-font" />
        </span>
      </button>
    </div>
  );
};

export default AppBar;
