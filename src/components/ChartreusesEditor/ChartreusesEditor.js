import React, { Component } from "react";
import Styles from "./ChartreusesEditor.css";

class ChartreusesEditor extends Component {
  state = {
    _dropZones: []
  };

  componentDidMount() {
    this.initExploreSection();
  }

  componentWillUnmount() {}

  initExploreSection() {
    this.state._dropZones.forEach(dropZone => {
      dropZone.addEventListener("dragenter", e => {
        e.preventDefault();
        dropZone.classList.add(Styles.ChartreusesEditorModelAllowDrop);
      });
      dropZone.addEventListener("dragleave", e => {
        e.preventDefault();
        dropZone.classList.remove(Styles.ChartreusesEditorModelAllowDrop);
      });
      dropZone.addEventListener("dragover", e => {
        e.preventDefault();
      });
      dropZone.addEventListener("drop", this.forEachdrop);
      dropZone.addEventListener("mouseenter", () => {
        dropZone.firstElementChild.style.cssText = "pointer-events: auto";
      });
      dropZone.addEventListener("mouseleave", () => {
        dropZone.firstElementChild.style.cssText = "pointer-events: none";
      });
    });
  }

  clearExploreSection() {
    this.state._dropZones.forEach(dropZone => {
      dropZone.removeEventListener("dragenter", e => {
        e.preventDefault();
        dropZone.classList.add(Styles.ChartreusesEditorModelAllowDrop);
      });
      dropZone.addEventListener("dragleave", e => {
        e.preventDefault();
        dropZone.classList.remove(Styles.ChartreusesEditorModelAllowDrop);
      });
      dropZone.addEventListener("dragover", e => {
        e.preventDefault();
      });
      dropZone.addEventListener("drop", this.forEachdrop);
      dropZone.addEventListener("mouseenter", () => {
        dropZone.firstElementChild.style.cssText = "pointer-events: auto";
      });
      dropZone.addEventListener("mouseleave", () => {
        dropZone.firstElementChild.style.cssText = "pointer-events: none";
      });
    });
  }

  drop(e) {
    console.log(e);
    e.preventDefault();
    // this.classList.remove("allowdrop");
    // this.classList.add("drop");
    const iframe = e.target.firstElementChild,
      chartreuseToLoad = document.querySelector(
        `[data-certosa="${e.dataTransfer.getData("text")}"]`
      );

    // setTimeout(() => this.classList.remove("drop"), 750);

    chartreuseToLoad.classList.toggle("active");
    chartreuseToLoad.setAttribute("draggable", false);

    if (!e.target.classList.contains("hide")) {
      e.target.classList.add("hide", "dropped");
    }

    if (this.firstElementChild.src.includes("sketchfab")) {
      const chartreuseToUnload = document.querySelector(
        `[data-certosa="${this.firstElementChild.src.split("/")[4]}"]`
      );

      chartreuseToUnload.classList.toggle("active");
      chartreuseToUnload.setAttribute("draggable", true);
    }

    // currentImage = iframe.dataset.index = chartreuseToLoad.dataset.index;

    if (this.dataset.dropzone === "first-model") {
      new window.Sketchfab(iframe).init(e.dataTransfer.getData("text"), {
        success: function onSuccess(api) {
          this.setState(
            {
              firstModelApi: api
            },
            () => {
              api.start();

              api.addEventListener("viewerready", function() {
                api.setTextureQuality("ld", () => {});
              });

              // api.addEventListener("annotationSelect", function(index) {
              //   secondModelApi && secondModelApi.gotoAnnotation(index);
              // });

              api.addEventListener("annotationFocus", function(index) {
                this.state.secondModelApi &&
                  this.state.secondModelApi.gotoAnnotation(index);
              });
            }
          );
        }
      });
    } else {
      new window.Sketchfab(iframe).init(e.dataTransfer.getData("text"), {
        success: function onSuccess(api) {
          this.setState(
            {
              secondModelApi: api
            },
            () => {
              api.start();

              api.addEventListener("viewerready", function() {
                api.setTextureQuality("ld", () => {});
              });

              // api.addEventListener("annotationSelect", function(index) {
              //   firstModelApi && firstModelApi.gotoAnnotation(index);
              // });

              api.addEventListener("annotationFocus", function(index) {
                this.state.firstModelApi &&
                  this.statefirstModelApi.gotoAnnotation(index);
              });
            }
          );
        }
      });
    }
  }

  render() {
    return (
      <div id="editor" className={Styles.ChartreusesEditor}>
        <div
          className={Styles.ChartreusesEditorModel}
          data-dropzone="first-model"
          ref={div => this.state._dropZones.push(div)}
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
          ref={div => this.state._dropZones.push(div)}
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
  }
}

export default ChartreusesEditor;
