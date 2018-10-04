import React from "react";
import PropTypes from "prop-types";
import Styles from "./Chartreuse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faMapMarkedAlt,
  faCalendar,
  faPaintBrush,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

const Chartreuse = props => {
  const { children, sketchfabUrl, name, active } = props;

  const capitalizedName = name.replace(/\b\w/g, l => l.toUpperCase());

  const drag = e => {
    let img = document.createElement("img");

    e.dataTransfer.setData("text/plain", e.target.dataset.certosa);

    img.src = e.target.querySelector("img").currentSrc;

    e.dataTransfer.setDragImage(img, 0, 0);
  };

  return (
    <div
      data-certosa={sketchfabUrl}
      data-index="0"
      role="menuitem"
      aria-controls="editor"
      draggable="true"
      className={`${Styles.Chartreuse} ${active && Styles.ChartreuseActive}`}
      onDragStart={drag}
    >
      <figure>
        <picture>{children}</picture>
        <FontAwesomeIcon icon={faCheck} size="3x" />
        <figcaption>
          <div className={Styles.ChartreuseCaption}>
            <h2>Certosa di {capitalizedName}</h2>
            <FontAwesomeIcon icon={faCaretUp} fixedWidth />
          </div>

          <div className={Styles.ChartreuseFeature}>
            <div>
              <FontAwesomeIcon icon={faMapMarkedAlt} size="2x" />
              <h3>Napoli</h3>
            </div>
            <div>
              <FontAwesomeIcon icon={faCalendar} size="2x" />
              <h3>1300</h3>
            </div>
            <div>
              <FontAwesomeIcon icon={faPaintBrush} size="2x" />
              <h3>Barocco</h3>
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

Chartreuse.propTypes = {
  children: PropTypes.node.isRequired,
  sketchfabUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default Chartreuse;
