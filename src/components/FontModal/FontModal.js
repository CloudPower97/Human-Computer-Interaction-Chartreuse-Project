import React, { Component } from "react";
import Styles from "./FontModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFont, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

class FontModal extends Component {
  state = {
    preferences: {
      headingFont: "",
      paragraphFont: "",
      marginLeft: "",
      marginRight: "",
      lineHeight: "",
      fontSizeIncrease: "0rem",
      backgroundColor: "",
      textColor: "",
      nightMode: ""
    }
  };

  componentDidMount() {
    const toggleNightMode = this._fontModal.querySelector("#toggle-night-mode");
    const buttons = this._fontModal.querySelectorAll(".select > button");
    const buttonClickHandler = function() {
      this.getAttribute("aria-expanded") === "true" && this.blur();
    };

    buttons.forEach(function(button) {
      const li = button.nextElementSibling.querySelectorAll("li");

      button.addEventListener("focus", function() {
        this.setAttribute("aria-expanded", "true");
        this.nextElementSibling.setAttribute("aria-hidden", "false");
        this.closest(".option").classList.add("active");

        setTimeout(function() {
          button.addEventListener("click", buttonClickHandler);
        }, 1000);
      });

      button.addEventListener("blur", function() {
        this.setAttribute("aria-expanded", "false");
        this.nextElementSibling.setAttribute("aria-hidden", "true");
        this.closest(".option").classList.remove("active");
        this.removeEventListener("click", buttonClickHandler);
      });

      li.forEach(function(li) {
        li.addEventListener("click", function() {
          const button = this.parentNode.previousElementSibling;

          if ("paragraphFont" in this.dataset) {
            button.dataset.active = this.dataset.paragraphFont.split("'")[1];
            button.style.fontFamily = this.dataset.paragraphFont;
            this.updateFont.call(this);
          } else {
            button.dataset.active = this.dataset.description;

            if ("margin" in this.dataset) {
              this.updateMargin.call(this);
            } else {
              this.updateLineHeight.call(this);
            }
          }
        });
      });

      if (localStorage.getItem(this.state.preferences)) {
        const firstLi = li[0].dataset;

        if ("paragraphFont" in firstLi) {
          button.dataset.active = this.state.preferences.paragraphFont.split(
            "'"
          )[1];
          button.style.fontFamily = this.state.preferences.paragraphFont;
        } else if ("margin" in firstLi) {
          for (let value of li.values()) {
            if (value.dataset.margin === this.state.preferences.marginRight) {
              button.dataset.active = value.dataset.description;
            }
          }
        } else {
          for (let value of li.values()) {
            if (
              value.dataset.lineHeight === this.state.preferences.lineHeight
            ) {
              button.dataset.active = value.dataset.description;
            }
          }
        }
      }
    });

    this._fontModal
      .querySelector("#decrease-font-size")
      .addEventListener("click", e => {
        this.updateFontSize();
        e.target.blur();
      });

    this._fontModal
      .querySelector("#increase-font-size")
      .addEventListener("click", function() {
        this.updateFontSize();
        this.blur();
      });

    toggleNightMode.addEventListener("click", function() {
      if (this.hasAttribute("checked")) {
        this.removeAttribute("checked");
        this.setNightMode.call(this);
      } else {
        this.setAttribute("checked", "true");
        this.setNightMode.call(this);
      }
    });

    if (localStorage.getItem(this.state.preferences)) {
      if (this.state.preferences.nightMode === "on") {
        this.toggleNightMode.setAttribute("checked", "true");
      }
    }
  }

  componentWillUnmount() {}

  updateFont() {
    document.documentElement.style.setProperty(
      "--heading-font",
      this.dataset.headingFont
    );
    document.documentElement.style.setProperty(
      "--paragraph-font",
      this.dataset.paragraphFont
    );
    this.state.preferences.paragraphFont = this.dataset.paragraphFont;
    this.state.preferences.headingFont = this.dataset.headingFont;
    localStorage.setItem(
      this.state.preferences,
      JSON.stringify(this.state.preferences).trim()
    );
  }

  updateLineHeight() {
    document.documentElement.style.setProperty(
      "--line-height",
      this.dataset.lineHeight
    );
    this.state.preferences.lineHeight = this.dataset.lineHeight;
    localStorage.setItem(
      this.state.preferences,
      JSON.stringify(this.state.preferences).trim()
    );
  }

  updateFontSize() {
    this.setState(
      prevState => ({
        preferences: {
          fontSizeIncrease: (
            Number.parseFloat(this.state.preferences.fontSizeIncrease) +
            Number.parseFloat(2)
          )
            .toString()
            .concat("rem")
        }
      }),
      () => {
        document.documentElement.style.setProperty(
          "--font-size-increase",
          this.state.preferences.fontSizeIncrease
        );
        localStorage.setItem(
          this.state.preferences,
          JSON.stringify(this.state.preferences).trim()
        );
      }
    );
  }

  setNightMode() {
    if (
      getComputedStyle(document.documentElement).getPropertyValue(
        "--background-color"
      ) === "#333"
    ) {
      this.state.preferences.backgroundColor = "#F4F4F4";
      this.state.preferences.textColor = "#333";
      this.state.preferences.nightMode = "off";
      document.documentElement.style.setProperty(
        "--background-color",
        "#F4F4F4"
      );
      document.documentElement.style.setProperty("--text-color", "#333");
    } else {
      this.state.preferences.backgroundColor = "#333";
      this.state.preferences.textColor = "#F4F4F4";
      this.state.preferences.nightMode = "on";
      document.documentElement.style.setProperty("--background-color", "#333");
      document.documentElement.style.setProperty("--text-color", "#F4F4F4");
    }

    localStorage.setItem(
      this.state.preferences,
      JSON.stringify(this.state.preferences).trim()
    );
  }

  render() {
    return (
      <div
        ref={div => (this._fontModal = div)}
        id="font-modal"
        aria-hidden="true"
        role="dialog"
        className={Styles.FontModal}
      >
        <div className={Styles.FontModalContent}>
          <div>
            <button
              id="decrease-font-size"
              data-font-size-increase="-0.25"
              data-tooltip="Diminuisci la dimensione del font"
            >
              <FontAwesomeIcon icon={faFont} size="2x" />
            </button>

            <button
              id="increase-font-size"
              data-font-size-increase="0.25"
              data-tooltip="Aumenta la dimensione del font"
            >
              <FontAwesomeIcon icon={faFont} size="3x" />
            </button>
          </div>

          <div className="option">
            <span id="font-label">Carattere:</span>

            <div id="font" className={Styles.FontModalSelect}>
              <button
                id="font-button"
                aria-haspopup="listbox"
                aria-labelledby="font-label font-button"
                aria-expanded="false"
                data-active="Montserrat"
              >
                <span className="fa-fw">
                  <i className="fas fa-caret-down" />
                </span>
              </button>

              <ul
                tabIndex="-1"
                role="listbox"
                aria-labelledby="font-label"
                aria-hidden="true"
              >
                <li
                  data-paragraph-font="'Montserrat', sans-serif"
                  data-heading-font="'Libre Baskerville', serif"
                  role="option"
                >
                  Montserrat
                </li>

                <li
                  data-paragraph-font="'Open Sans', sans-serif"
                  data-heading-font="'Merriweather', serif"
                  role="option"
                >
                  Open Sans
                </li>

                <li
                  data-paragraph-font="'Questrial', sans-serif"
                  data-heading-font="'Old Standard TT', serif"
                  role="option"
                >
                  Questrial
                </li>
              </ul>
            </div>
          </div>

          <div className="option">
            <span id="margin-label">Margini:</span>

            <div id="margin" className={Styles.FontModalSelect}>
              <button
                id="margin-button"
                aria-haspopup="listbox"
                aria-labelledby="margin-label margin-button"
                aria-expanded="false"
                data-active="Stretti"
              >
                <span className="fa-fw">
                  <i className="fas fa-caret-down" />
                </span>
              </button>

              <ul
                tabIndex="-1"
                role="listbox"
                aria-labelledby="margin-label"
                aria-hidden="true"
              >
                <li data-description="Stretti" data-margin="5vw" role="option">
                  <span aria-hidden="true" className="font-margin">
                    <span />
                  </span>
                  Stretti
                </li>

                <li data-description="Normali" data-margin="10vw" role="option">
                  <span aria-hidden="true" className="font-margin">
                    <span />
                  </span>
                  Normali
                </li>

                <li data-description="Larghi" data-margin="15vw" role="option">
                  <span aria-hidden="true" className="font-margin">
                    <span />
                  </span>
                  Larghi
                </li>
              </ul>
            </div>
          </div>

          <div className="option">
            <span id="line-height-label">Interlinea:</span>

            <div id="line-height" className={Styles.FontModalSelect}>
              <button
                id="line-height-button"
                aria-haspopup="listbox"
                aria-labelledby="line-height-label line-height-button"
                aria-expanded="false"
                data-active="Stretta"
              >
                <span className="fa-fw">
                  <i className="fas fa-caret-down" />
                </span>
              </button>

              <ul
                tabIndex="-1"
                role="listbox"
                aria-labelledby="line-height-label"
                aria-hidden="true"
              >
                <li
                  data-description="Stretta"
                  data-line-height="1.7em"
                  role="option"
                >
                  <span aria-hidden="true" className="bars">
                    <span />
                    <span />
                    <span />
                  </span>
                  Stretta
                </li>

                <li
                  data-description="Normale"
                  data-line-height="2.0em"
                  role="option"
                >
                  <span aria-hidden="true" className="bars">
                    <span />
                    <span />
                    <span />
                  </span>
                  Normale
                </li>

                <li
                  data-description="Larga"
                  data-line-height="2.3em"
                  role="option"
                >
                  <span aria-hidden="true" className="bars">
                    <span />
                    <span />
                    <span />
                  </span>
                  Larga
                </li>
              </ul>
            </div>
          </div>

          <div aria-hidden="true">
            <span>Modalita' Notturna</span>

            <label className={Styles.FontModalSwitch}>
              <input id="toggle-night-mode" type="checkbox" />
              <span data-on="ON" data-off="OFF" className="switch-label" />
              <span className={Styles.FontModalSwitchHandle}>
                <FontAwesomeIcon icon={faSun} />
                <FontAwesomeIcon icon={faMoon} />
              </span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default FontModal;
