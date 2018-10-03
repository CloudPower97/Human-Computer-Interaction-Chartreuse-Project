import React from "react";
import Style from "./AppBar.css";

const AppBar = props => {
  return (
    <div
      className={Style.AppBar}
      role="menubar"
      tabindex="-1"
      aria-orientation="vertical"
    >
      <button
        id="home"
        class="active"
        role="menuitem"
        aria-controls="intro"
        tabindex="0"
        data-tooltip="Visualizza la sezione introduttiva"
      >
        <span class="fa-fw">
          <i class="fas fa-home" />
        </span>
      </button>

      <button
        id="explore-btn"
        role="menuitem"
        aria-controls="explore"
        data-tooltip="Immergiti in un tour virtuale delle certose campane"
      >
        <span class="fa-fw">
          <i class="fas fa-street-view" />
        </span>
      </button>

      <button
        id="social-btn"
        role="menuitem"
        aria-haspopup="dialog"
        aria-controls="social-modal"
        data-tooltip="Condividi questa pagina"
      >
        <span class="fa-fw">
          <i class="fas fa-share-alt" />
        </span>
      </button>

      <button
        id="saved-elements-btn"
        role="menuitem"
        aria-controls="saved-elements"
        data-tooltip="Accedi alla tua area personale"
      >
        <span class="fa-fw">
          <i class="fas fa-user" />
        </span>
      </button>

      <button
        id="font-btn"
        role="menuitem"
        aria-haspopup="dialog"
        aria-controls="font-modal"
        data-tooltip="Personalizza l'esperienza di lettura"
      >
        <span class="fa-fw">
          <i class="fas fa-font" />
          <i class="fas fa-font" />
        </span>
      </button>
    </div>
  );
};

export default AppBar;
