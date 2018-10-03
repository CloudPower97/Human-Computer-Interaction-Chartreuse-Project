import React from "react";
import Styles from "./ChartreusesEditor.css";

export default () => {
  return (
    <div id="editor" className={Styles.ChartreusesEditor}>
      <div
        className={Styles.ChartreusesEditorModel}
        data-dropzone="first-model"
      >
        <iframe
          src=""
          allow="autoplay; fullscreen; vr"
          allowvr="true"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
        />

        <span className="fa-fw fa-stack">
          <i className="fas fa-circle fa-stack-2x" />
          <i className="fas fa-camera fa-stack-1x fa-inverse" />
        </span>
      </div>

      <div
        className={Styles.ChartreusesEditorModel}
        data-dropzone="second-model"
      >
        <iframe
          src=""
          allow="autoplay; fullscreen; vr"
          allowvr="true"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
        />

        <span className="fa-fw fa-stack">
          <i className="fas fa-circle fa-stack-2x" />
          <i className="fas fa-camera fa-stack-1x fa-inverse" />
        </span>
      </div>
    </div>
  );
};
