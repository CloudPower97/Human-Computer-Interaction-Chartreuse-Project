(function() {
  let preferences = {
      headingFont: "",
      paragraphFont: "",
      marginLeft: "",
      marginRight: "",
      lineHeight: "",
      fontSizeIncrease: "0rem",
      backgroundColor: "",
      textColor: "",
      nightMode: ""
    },
    savedText = [];

  const mediaQuery = window.matchMedia("(max-width: 768px)"),
    appBar = document.getElementById("app-bar"),
    chartreuseSelection = document.getElementById("images"),
    fontModal = document.getElementById("font-modal"),
    savedElementsTab = document.getElementById("saved-elements"),
    fontBtnHandler = function() {
      const handler = function() {
        const clickHandler = function(e) {
          if (
            document.body.hasAttribute("data-modal") &&
            !document
              .getElementById(document.body.dataset.modal)
              .contains(e.target)
          ) {
            document.body.removeAttribute("data-modal");
            document
              .querySelector("main")
              .removeEventListener("click", clickHandler);
            document.getElementById("font-btn").classList.remove("active");
          }
        };

        document.querySelector("main").addEventListener("click", clickHandler);
      };

      appBar
        .querySelectorAll("button:not(#font-btn)")
        .forEach(function(button) {
          button.getAttribute("disabled") === ""
            ? button.removeAttribute("disabled")
            : button.setAttribute("disabled", "");
        });

      if (document.body.hasAttribute("data-modal")) {
        document.body.removeAttribute("data-modal");
      } else {
        document.body.setAttribute("data-modal", "font-modal");
        setTimeout(handler, 100);
      }
    },
    exploreBtnHandler = function() {
      document.body.classList.remove("saved-elements");
      document.body.classList.toggle("explore");
      appBar.querySelector("#home").classList.toggle("active");

      document.getElementById("top-btn").classList.add("hide");
    },
    savedElementsBtnHandler = function() {
      document.body.classList.remove("explore");
      document.body.classList.toggle("saved-elements");
      document.getElementById("top-btn").classList.add("hide");
      appBar.querySelector("#home").classList.toggle("active");
    },
    homeBtnHandler = function() {
      document.body.classList.remove("saved-elements", "explore");
    },
    selectionPopOver = document.getElementById("selection-pop-over"),
    dropZones = document
      .getElementById("editor")
      .querySelectorAll("[data-dropzone]");

  if (localStorage.getItem("preferences")) {
    preferences = JSON.parse(localStorage.getItem("preferences"));
    document.documentElement.style.setProperty(
      "--paragraph-margin-left",
      preferences.marginLeft
    );
    document.documentElement.style.setProperty(
      "--paragraph-margin-right",
      preferences.marginRight
    );
    document.documentElement.style.setProperty(
      "--heading-font",
      preferences.headingFont
    );
    document.documentElement.style.setProperty(
      "--paragraph-font",
      preferences.paragraphFont
    );
    document.documentElement.style.setProperty(
      "--line-height",
      preferences.lineHeight
    );
    document.documentElement.style.setProperty(
      "--font-size-increase",
      preferences.fontSizeIncrease
    );
    document.documentElement.style.setProperty(
      "--background-color",
      preferences.backgroundColor
    );
    document.documentElement.style.setProperty(
      "--text-color",
      preferences.textColor
    );
  }

  if (localStorage.getItem("savedText")) {
    const savedTextTab = document.getElementById("testi-salvati-tab");

    savedText = JSON.parse(localStorage.getItem("savedText"));

    if (savedText.length > 0) {
      const fragment = document.createDocumentFragment(),
        cardTemplate = document.getElementById("card-template");

      savedTextTab.dataset.savedElements = true;

      savedText.forEach(function(elem) {
        let clone = document.importNode(cardTemplate.content, true),
          cardText = clone.querySelector(".card--text"),
          cardAlert = clone.querySelector(".card--alert"),
          cardActionButtons = clone.querySelectorAll(".card--action > button"),
          cardAlertButtons = cardAlert.querySelectorAll("button");

        cardText.dataset.caption = elem.container;

        cardText.querySelector("p").append(elem.text);

        cardActionButtons.forEach(function(button) {
          button.addEventListener("click", function() {
            this.blur();
          });

          if ("deleteItem" in button.dataset) {
            button.addEventListener("click", triggerAlert);
          } else if ("share" in button.dataset) {
            // apri modale social
          } else {
            button.addEventListener("click", seeElement);
          }
        });

        cardAlertButtons.forEach(function(button) {
          button.addEventListener("click", function() {
            this.blur();
          });

          if ("remove" in button.dataset) {
            button.dataset.remove = elem.id;

            button.addEventListener("click", deleteElement);
          } else {
            button.addEventListener("click", triggerAlert);
          }
        });

        fragment.appendChild(clone);

        function triggerAlert() {
          cardText.classList.toggle("hide");
          cardAlert.classList.toggle("show");
          cardAlert.querySelector("button").focus();
        }

        function seeElement() {
          alert("dovrei andare a vedere elemento");
        }

        function deleteElement(e) {
          console.log(
            (this.closest(".card").style.cssText = "display : none;")
          );
          savedText.splice(
            savedText.findIndex(function(elem) {
              return elem.id === e.target.dataset.remove;
            }),
            1
          );

          localStorage.setItem("savedText", JSON.stringify(savedText));
        }
      });

      savedTextTab.appendChild(fragment);
    }
  }

  initAppBar(appBar);

  updateAppBarOrientation(mediaQuery);

  mediaQuery.addListener(updateAppBarOrientation);

  initFontModal(fontModal);

  initSelectionPopOver(selectionPopOver);

  mediaQuery.addListener(updateChartreuseSelection);

  updateChartreuseSelection();

  initTab(savedElementsTab);

  initExploreSection();

  function handleActiveButtons() {
    this.blur();

    if (this.id !== "home" && this.classList.contains("active")) {
      this.classList.remove("active");
    } else {
      let activeButton = null;

      if (this.getAttribute("aria-haspopup")) {
        activeButton = appBar.querySelector("button:not(#home).active");
      } else {
        activeButton = appBar.querySelectorAll("button.active");
        activeButton &&
          activeButton.forEach(function(button) {
            button.classList.remove("active");
          });
      }

      this.classList.add("active");
    }
  }

  function initAppBar(appBar) {
    const appBarBtn = appBar.querySelectorAll("button");

    appBarBtn.forEach(button => {
      if (button.id === "font-btn") {
        button.addEventListener("click", fontBtnHandler);
      } else if (button.id === "social-btn") {
        button.addEventListener("click", function() {
          alert("devo aprire il modale dei social");
        });
      } else if (button.id === "explore-btn") {
        button.addEventListener("click", exploreBtnHandler);
      } else if (button.id === "saved-elements-btn") {
        button.addEventListener("click", savedElementsBtnHandler);
      } else if (button.id === "home") {
        button.addEventListener("click", homeBtnHandler);
      }

      button.addEventListener("click", handleActiveButtons);
    });
  }

  function initTab(tabContainer) {
    const tabList = tabContainer.querySelector('[role="tablist"]');
    const tabPanels = tabContainer.querySelector(".tabs");
    const tabs = tabList.querySelectorAll("button");

    tabs.forEach(function(tab) {
      tab.addEventListener("click", function() {
        if (this.getAttribute("aria-selected") === "false") {
          tabContainer
            .querySelector('button[aria-selected="true"]')
            .setAttribute("aria-selected", "false");
          this.setAttribute("aria-selected", "true");
          tabPanels.style.setProperty(
            "--i",
            currentTab === 0 ? (currentTab = 1) : (currentTab = 0)
          );
          tabPanels.style.setProperty("--f", 0.5);
        }
      });
    });

    tabPanels.querySelectorAll('[role="tabpanel"]').forEach(function(tab) {
      if (tab.dataset.savedElements !== "true") {
        tab
          .querySelector(".no-data")
          .appendChild(document.createTextNode(tab.dataset.savedElements));
      }
    });

    function unifyEvent(e) {
      return e.changedTouches ? e.changedTouches[0] : e;
    }

    function swipeStart(e) {
      startingPosition = unifyEvent(e).clientX;
      tabPanels.classList.toggle("smooth", !(touched = true));
    }

    function swipe(e) {
      e.preventDefault();

      if (touched)
        tabPanels.style.setProperty(
          "--tx",
          `${Math.round(unifyEvent(e).clientX - startingPosition)}px`
        );
    }

    function swipeEnd(e) {
      if (touched) {
        let swiped = unifyEvent(e).clientX - startingPosition,
          sign = Math.sign(swiped),
          f = +((sign * swiped) / window.innerWidth).toFixed(2);

        if (
          (currentTab > 0 || sign < 0) &&
          (currentTab < 1 || sign > 0) &&
          f > 0.35
        ) {
          tabPanels.style.setProperty("--i", (currentTab -= sign));
          f = 1 - f;
        }

        tabPanels.style.setProperty("--tx", "0px");
        tabPanels.style.setProperty("--f", f);
        tabPanels.classList.toggle("smooth", !(touched = false));
        tabContainer
          .querySelector('button[aria-selected="true"]')
          .setAttribute("aria-selected", "false");
        tabs[currentTab].setAttribute("aria-selected", true);
        startingPosition = null;
      }
    }

    tabPanels.addEventListener("mousedown", swipeStart, false);
    tabPanels.addEventListener("touchstart", swipeStart, false);

    tabPanels.addEventListener("mousemove", swipe, false);
    tabPanels.addEventListener("touchmove", swipe, false);

    tabPanels.addEventListener("mouseup", swipeEnd, false);
    tabPanels.addEventListener("touchend", swipeEnd, false);
  }

  function initFontModal(fontModal) {
    const toggleNightMode = fontModal.querySelector("#toggle-night-mode");
    const buttons = fontModal.querySelectorAll(".select > button");
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
            updateFont.call(this);
          } else {
            button.dataset.active = this.dataset.description;

            if ("margin" in this.dataset) {
              updateMargin.call(this);
            } else {
              updateLineHeight.call(this);
            }
          }
        });
      });

      if (localStorage.getItem("preferences")) {
        const firstLi = li[0].dataset;

        if ("paragraphFont" in firstLi) {
          button.dataset.active = preferences.paragraphFont.split("'")[1];
          button.style.fontFamily = preferences.paragraphFont;
        } else if ("margin" in firstLi) {
          for (let value of li.values()) {
            if (value.dataset.margin === preferences.marginRight) {
              button.dataset.active = value.dataset.description;
            }
          }
        } else {
          for (let value of li.values()) {
            if (value.dataset.lineHeight === preferences.lineHeight) {
              button.dataset.active = value.dataset.description;
            }
          }
        }
      }
    });

    fontModal
      .querySelector("#decrease-font-size")
      .addEventListener("click", function() {
        updateFontSize.call(this);
        this.blur();
      });

    fontModal
      .querySelector("#increase-font-size")
      .addEventListener("click", function() {
        updateFontSize.call(this);
        this.blur();
      });

    toggleNightMode.addEventListener("click", function() {
      if (this.hasAttribute("checked")) {
        this.removeAttribute("checked");
        setNightMode.call(this);
      } else {
        this.setAttribute("checked", "true");
        setNightMode.call(this);
      }
    });

    if (localStorage.getItem("preferences")) {
      if (preferences.nightMode === "on") {
        toggleNightMode.setAttribute("checked", "true");
      }
    }
  }

  function initSelectionPopOver(selectionPopOver) {
    selectionPopOver.querySelectorAll("button").forEach(function(button) {
      button.addEventListener("mouseup", function(e) {
        e.stopPropagation();
      });

      if (button.id === "bookmark") {
        button.addEventListener("click", function(e) {
          const _this = this;
          e.stopPropagation();
          savedText.push({
            text: document.body.dataset.selectedText.toString(),
            container: document.body.dataset.selectedTextContainer
          });
          localStorage.setItem("savedText", JSON.stringify(savedText).trim());
          this.blur();
          this.classList.add("active");

          setTimeout(function() {
            _this.classList.remove("active");
          }, 1250);
        });
      } else if (button.id === "dictionary") {
        button.addEventListener("click", function(e) {
          e.stopPropagation();
          openPopup(
            `http://www.treccani.it/vocabolario/ricerca/${getSelection().toString()}`
          );
          this.blur();
        });
      } else {
        button.addEventListener("click", function(e) {
          e.stopPropagation();
          this.blur();
        });

        button.addEventListener("click", function() {
          alert("Modale social da aprire");
        });
      }
    });
  }

  function updateSelectionPopOver() {
    setTimeout(function() {
      selectionPopOver.classList.add("show");

      document.addEventListener("click", function() {
        selectionPopOver.classList.remove("show");
      });
    }, 175);
  }

  function updateChartreuseSelection() {
    const chartreuses = chartreuseSelection.querySelectorAll(
      "div[data-certosa]"
    );

    if (mediaQuery.matches) {
      const firstModelViewer = dropZones[0].firstElementChild;
      chartreuses.forEach(function(chartreuse) {
        chartreuse.removeEventListener("dragstart", drag, false);
        chartreuse.setAttribute("draggable", "false");
      });

      // Questo per aprire il menu a tendina sui telefoni
      chartreuseSelection
        .querySelectorAll("figcaption")
        .forEach(function(caption) {
          caption.addEventListener("click", function() {
            this.style.cssText = "transform: translate(0%)";
          });
        });

      if (!firstModelViewer.src.includes("sketchfab")) {
        firstModelViewer.parentElement.classList.add("hide", "dropped");
        firstModelViewer.dataset.index = 0;

        new Sketchfab(firstModelViewer).init(
          "a9214249dc844fa99e11e931ff17942e",
          {
            success: function(api) {
              firstModelApi = api;
            }
          }
        );
      } else {
        chartreuseSelection.style.setProperty(
          "--i",
          firstModelViewer.dataset.index
        );
        currentImage = firstModelViewer.dataset.index;
      }

      chartreuseSelection.addEventListener("mousedown", swipeStart, false);
      chartreuseSelection.addEventListener("touchstart", swipeStart, false);

      chartreuseSelection.addEventListener("mousemove", swipe, false);
      chartreuseSelection.addEventListener("touchmove", swipe, false);

      chartreuseSelection.addEventListener("mouseup", swipeEnd, false);
      chartreuseSelection.addEventListener("touchend", swipeEnd, false);
    } else {
      chartreuses.forEach(function(chartreuse) {
        chartreuse.addEventListener("dragstart", drag, false);
        chartreuse.setAttribute("draggable", "true");
      });

      chartreuseSelection.removeEventListener("mousedown", swipeStart, false);
      chartreuseSelection.removeEventListener("touchstart", swipeStart, false);

      chartreuseSelection.removeEventListener("mousemove", swipe, false);
      chartreuseSelection.removeEventListener("touchmove", swipe, false);

      chartreuseSelection.removeEventListener("mouseup", swipeEnd, false);
      chartreuseSelection.removeEventListener("touchend", swipeEnd, false);
    }
  }

  function initExploreSection() {
    dropZones.forEach(dropZone => {
      dropZone.addEventListener("dragenter", function(e) {
        e.preventDefault();
        this.classList.add("allowdrop");
      });

      dropZone.addEventListener("dragleave", function(e) {
        e.preventDefault();
        this.classList.remove("allowdrop");
      });

      dropZone.addEventListener("dragover", allowDrop);

      dropZone.addEventListener("drop", drop);

      dropZone.addEventListener("mouseenter", function() {
        dropZone.firstElementChild.style.cssText = "pointer-events: auto";
      });

      dropZone.addEventListener("mouseleave", function() {
        dropZone.firstElementChild.style.cssText = "pointer-events: none";
      });
    });
  }

  function updateMargin() {
    document.documentElement.style.setProperty(
      "--paragraph-margin-left",
      this.dataset.margin
    );
    document.documentElement.style.setProperty(
      "--paragraph-margin-right",
      this.dataset.margin
    );
    preferences.marginLeft = preferences.marginRight = this.dataset.margin;
    localStorage.setItem("preferences", JSON.stringify(preferences).trim());
  }

  function updateFont() {
    document.documentElement.style.setProperty(
      "--heading-font",
      this.dataset.headingFont
    );
    document.documentElement.style.setProperty(
      "--paragraph-font",
      this.dataset.paragraphFont
    );
    preferences.paragraphFont = this.dataset.paragraphFont;
    preferences.headingFont = this.dataset.headingFont;
    localStorage.setItem("preferences", JSON.stringify(preferences).trim());
  }

  function updateLineHeight() {
    document.documentElement.style.setProperty(
      "--line-height",
      this.dataset.lineHeight
    );
    preferences.lineHeight = this.dataset.lineHeight;
    localStorage.setItem("preferences", JSON.stringify(preferences).trim());
  }

  function updateFontSize() {
    preferences.fontSizeIncrease = (
      Number.parseFloat(preferences.fontSizeIncrease) +
      Number.parseFloat(this.dataset.fontSizeIncrease)
    )
      .toString()
      .concat("rem");
    document.documentElement.style.setProperty(
      "--font-size-increase",
      preferences.fontSizeIncrease
    );
    localStorage.setItem("preferences", JSON.stringify(preferences).trim());
  }

  function setNightMode() {
    if (
      getComputedStyle(document.documentElement).getPropertyValue(
        "--background-color"
      ) === "#333"
    ) {
      preferences.backgroundColor = "#F4F4F4";
      preferences.textColor = "#333";
      preferences.nightMode = "off";
      document.documentElement.style.setProperty(
        "--background-color",
        "#F4F4F4"
      );
      document.documentElement.style.setProperty("--text-color", "#333");
    } else {
      preferences.backgroundColor = "#333";
      preferences.textColor = "#F4F4F4";
      preferences.nightMode = "on";
      document.documentElement.style.setProperty("--background-color", "#333");
      document.documentElement.style.setProperty("--text-color", "#F4F4F4");
    }

    localStorage.setItem("preferences", JSON.stringify(preferences).trim());
  }

  function updateAppBarOrientation(mediaQuery) {
    if (mediaQuery.matches) {
      appBar.setAttribute("orientation", "horizontal");
    } else {
      appBar.setAttribute("orientation", "vertical");
    }
  }

  window.addEventListener("contextmenu", function(e) {
    if (mediaQuery.matches) {
      e.preventDefault();
      const selectedText = getSelection();

      if (selectedText.toString().length > 0) {
        const offset = selectedText.getRangeAt(0).getBoundingClientRect();

        document.body.dataset.selectedText = selectedText;
        document.documentElement.style.setProperty(
          "--pop-over-left",
          Math.round(offset.left + 33).toString() + "px"
        );
        document.documentElement.style.setProperty(
          "--pop-over-top",
          Math.round(offset.top - 20).toString() + "px"
        );
        updateSelectionPopOver();
      }
    }
  });

  document.getElementById("main").addEventListener("mouseup", function() {
    const selectedText = getSelection();

    if (selectedText.toString().length > 0) {
      const currentSelection = {
        text: selectedText.toString(),
        container: selectedText
          .getRangeAt(0)
          .startContainer.parentElement.closest("[data-section-title]").dataset
          .sectionTitle,
        offset: {
          left:
            Math.round(
              selectedText.getRangeAt(0).getBoundingClientRect().left + 33
            ).toString() + "px",
          top:
            Math.round(
              selectedText.getRangeAt(0).getBoundingClientRect().top - 20
            ).toString() + "px"
        }
      };

      document.body.dataset.selectedText = currentSelection.text;
      document.body.dataset.selectedTextContainer = currentSelection.container;
      document.documentElement.style.setProperty(
        "--pop-over-left",
        currentSelection.offset.left
      );
      document.documentElement.style.setProperty(
        "--pop-over-top",
        currentSelection.offset.top
      );
      updateSelectionPopOver();
    }
  });

  document.getElementById("main").addEventListener("scroll", function() {
    selectionPopOver.classList.contains("show") &&
      selectionPopOver.classList.remove("show");
  });

  function unifyEvent(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  }

  function swipeStart(e) {
    startingPosition = unifyEvent(e).clientX;
    chartreuseSelection.classList.toggle("smooth", !(touched = true));
  }

  function swipe(e) {
    e.preventDefault();

    if (touched)
      chartreuseSelection.style.setProperty(
        "--tx",
        `${Math.round(unifyEvent(e).clientX - startingPosition)}px`
      );
  }

  function swipeEnd(e) {
    if (touched) {
      let swiped = unifyEvent(e).clientX - startingPosition,
        sign = Math.sign(swiped),
        f = +((sign * swiped) / window.innerWidth).toFixed(2);

      if (
        (currentImage > 0 || sign < 0) &&
        (currentImage < 2 || sign > 0) &&
        f > 0.4
      ) {
        const firstModelViewer = document
          .getElementById("editor")
          .querySelector("[data-dropzone='first-model'] iframe");

        firstModelViewer.parentElement.classList.add("hide", "dropped");

        chartreuseSelection.style.setProperty("--i", (currentImage -= sign));
        firstModelViewer.parentElement.classList.add("hide", "dropped");
        firstModelViewer.dataset.index = currentImage;
        f = 1 - f;

        const activeChartreuse = chartreuseSelection.querySelector(
          "div[data-certosa].active"
        );

        activeChartreuse && activeChartreuse.classList.remove("active");

        if (sign > 0) {
          e.target
            .closest("div")
            .previousElementSibling.classList.add("active");
          new Sketchfab(firstModelViewer).init(
            e.target.closest("div").previousElementSibling.dataset.certosa,
            {
              success: function(api) {
                firstModelApi = api;
              }
            }
          );
        } else if (sign < 0) {
          e.target.closest("div").nextElementSibling.classList.add("active");
          new Sketchfab(firstModelViewer).init(
            e.target.closest("div").nextElementSibling.dataset.certosa,
            {
              success: function(api) {
                firstModelApi = api;
              }
            }
          );
        }
      }

      chartreuseSelection.style.setProperty("--tx", "0px");
      chartreuseSelection.style.setProperty("--f", f);
      chartreuseSelection.classList.toggle("smooth", !(touched = false));
      startingPosition = null;
    }
  }

  function drag(e) {
    let img = document.createElement("img");

    e.dataTransfer.setData("text/plain", e.target.dataset.certosa);

    img.src = e.target.querySelector("img").currentSrc;

    e.dataTransfer.setDragImage(img, 0, 0);
  }

  function allowDrop(e) {
    e.preventDefault();
  }

  function drop(e) {
    e.preventDefault();
    this.classList.remove("allowdrop");
    this.classList.add("drop");
    const iframe = e.target.firstElementChild,
      chartreuseToLoad = document.querySelector(
        `[data-certosa="${e.dataTransfer.getData("text")}"]`
      );

    setTimeout(() => this.classList.remove("drop"), 750);

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

    currentImage = iframe.dataset.index = chartreuseToLoad.dataset.index;

    if (this.dataset.dropzone === "first-model") {
      new Sketchfab(iframe).init(e.dataTransfer.getData("text"), {
        success: function onSuccess(api) {
          firstModelApi = api;
          api.start();

          api.addEventListener("viewerready", function() {
            api.setTextureQuality("ld", () => {});
          });

          // api.addEventListener("annotationSelect", function(index) {
          //   secondModelApi && secondModelApi.gotoAnnotation(index);
          // });

          api.addEventListener("annotationFocus", function(index) {
            secondModelApi && secondModelApi.gotoAnnotation(index);
          });
        }
      });
    } else {
      new Sketchfab(iframe).init(e.dataTransfer.getData("text"), {
        success: function onSuccess(api) {
          secondModelApi = api;
          api.start();

          api.addEventListener("viewerready", function() {
            api.setTextureQuality("ld", () => {});
          });

          // api.addEventListener("annotationSelect", function(index) {
          //   firstModelApi && firstModelApi.gotoAnnotation(index);
          // });

          api.addEventListener("annotationFocus", function(index) {
            firstModelApi && firstModelApi.gotoAnnotation(index);
          });
        }
      });
    }
  }
})();

let startingPosition = null,
  currentImage = 0,
  currentTab = 0,
  touched = false,
  firstModelApi = null,
  secondModelApi = null;

let scrollpos = document.getElementById("main").scrollTop;
const header = document.getElementById("nav-bar");
const topBtn = document.getElementById("top-btn");
const add_class_on_scroll = () => {
  topBtn.classList.remove("hide");
  header.classList.add("fixed");
};
const remove_class_on_scroll = () => {
  topBtn.classList.add("hide");
  header.classList.remove("fixed");
};
const topBtnHandler = function() {
  document
    .getElementById("intro")
    .scrollIntoView({ block: "start", behavior: "smooth" });
  this.blur();
};

document.getElementById("main").addEventListener("scroll", function() {
  scrollpos = document.getElementById("main").scrollTop;
  if (scrollpos >= 430) {
    add_class_on_scroll();
  } else {
    remove_class_on_scroll();
  }
});

function openPopup(url) {
  var dualScreenLeft =
    window.screenLeft != undefined ? window.screenLeft : window.screenX;
  var dualScreenTop =
    window.screenTop != undefined ? window.screenTop : window.screenY;

  var width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
  var height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

  var left = width / 2 - 700 / 2 + dualScreenLeft;
  var top = height / 2 - 600 / 2 + dualScreenTop;

  setTimeout(function() {
    var newWindow = window.open(
      url,
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes, width=700, height=600, top=" +
        top +
        ", left=" +
        left
    );

    if (window.focus) {
      newWindow.focus();
    }
  }, 250);
}

topBtn.addEventListener("click", topBtnHandler);
