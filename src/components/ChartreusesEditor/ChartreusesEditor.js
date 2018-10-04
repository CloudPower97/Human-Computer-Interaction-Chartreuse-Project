import React, { Component } from "react";
import Styles from "./ChartreusesEditor.css";

class ChartreusesEditor extends Component {
  state = {
    _dropZones: []
  };

  componentDidMount() {
    this.state._dropZones.forEach(dropZone => {
      dropZone.addEventListener("dragenter", e => {
        this.dragEnter(e, dropZone);
      });
      dropZone.addEventListener("dragleave", e => {
        this.dragLeave(e, dropZone);
      });
      dropZone.addEventListener("dragover", e => {
        this.dragOver(e);
      });
      dropZone.addEventListener("drop", this.drop.bind(this));
      dropZone.addEventListener("mouseenter", dropZone => {
        this.mouseEnter(dropZone);
      });
      dropZone.addEventListener("mouseleave", dropZone => {
        this.mouseLeave(dropZone);
      });
    });
  }

  componentWillUnmount() {
    this.state._dropZones.forEach(dropZone => {
      dropZone.removeEventListener("dragenter", e => {
        this.dragEnter(e, dropZone);
      });
      dropZone.removeEventListener("dragleave", e => {
        this.dragLeave(e, dropZone);
      });
      dropZone.removeEventListener("dragover", e => {
        this.dragOver(e);
      });
      dropZone.removeEventListener("drop", this.drop.bind(this));
      dropZone.removeEventListener("mouseenter", dropZone => {
        this.mouseEnter(dropZone);
      });
      dropZone.removeEventListener("mouseleave", dropZone => {
        this.mouseLeave(dropZone);
      });
    });
  }

  dragEnter(e, dropZone) {
    e.preventDefault();
    dropZone.classList.add(Styles.ChartreusesEditorModelAllowDrop);
  }

  dragLeave(e, dropZone) {
    e.preventDefault();
    dropZone.classList.remove(Styles.ChartreusesEditorModelAllowDrop);
  }

  dragOver(e) {
    e.preventDefault();
  }

  drop(e) {
    e.preventDefault();
    e.target.classList.remove(Styles.ChartreusesEditorModelAllowDrop);
    e.target.classList.add(Styles.ChartreusesEditorModelDrop);
    const iframe = e.target.firstElementChild,
      chartreuseToLoad = document.querySelector(
        `[data-certosa="${e.dataTransfer.getData("text")}"]`
      );

    setTimeout(
      () => e.target.classList.remove(Styles.ChartreusesEditorModelDrop),
      750
    );

    // chartreuseToLoad.classList.toggle("active");
    chartreuseToLoad.setAttribute("draggable", false);

    if (!e.target.classList.contains(Styles.ChartreusesEditorModelHide)) {
      e.target.classList.add(
        Styles.ChartreusesEditorModelHide,
        Styles.ChartreusesEditorModelDropped
      );
    }

    if (e.target.firstElementChild.src.includes("sketchfab")) {
      const chartreuseToUnload = document.querySelector(
        `[data-certosa="${this.firstElementChild.src.split("/")[4]}"]`
      );

      // chartreuseToUnload.classList.toggle("active");
      chartreuseToUnload.setAttribute("draggable", true);
    }

    // currentImage = iframe.dataset.index = chartreuseToLoad.dataset.index;

    if (e.target.dataset.dropzone === "first-model") {
      const setFirstModelApi = api => {
        this.setState(
          {
            firstModelApi: api
          },
          () => {
            this.state.firstModelApi.start();
            this.state.firstModelApi.start();
            this.state.firstModelApi.addEventListener(
              "annotationFocus",
              index => {
                this.state.secondModelApi &&
                  this.state.secondModelApi.gotoAnnotation(index);
              }
            );
          }
        );
      };

      new window.Sketchfab(iframe).init(e.dataTransfer.getData("text"), {
        success: function onSuccess(api) {
          setFirstModelApi(api);
        }
      });
    } else {
      const setSecondModelApi = api => {
        this.setState(
          {
            secondModelApi: api
          },
          () => {
            this.state.secondModelApi.start();
            this.state.secondModelApi.start();
            this.state.secondModelApi.addEventListener(
              "annotationFocus",
              index => {
                this.state.firstModelApi &&
                  this.state.firstModelApi.gotoAnnotation(index);
              }
            );
          }
        );
      };

      new window.Sketchfab(iframe).init(e.dataTransfer.getData("text"), {
        success: function onSuccess(api) {
          setSecondModelApi(api);
        }
      });
    }
  }

  mouseEnter(dropZone) {
    if (dropZone.firstElementChild) {
      dropZone.firstElementChild.style.cssText = "pointer-events: auto";
    }
  }

  mouseLeave(dropZone) {
    if (dropZone.firstElementChild) {
      dropZone.firstElementChild.style.cssText = "pointer-events: none";
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
