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
        modelViewer = document.getElementById("model-viewer"),
        sketchFab = new Sketchfab(modelViewer),
        fontModal = document.getElementById("font-modal"),
        savedElementsTab = document.getElementById("saved-elements"),
        savedTextTab = savedElementsTab.querySelector("#testi-salvati-tab"),
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
                console.log("listener rimosso");
                document.getElementById("font-btn").classList.remove("active");
              }
            };

            document.querySelector("main").addEventListener("click", clickHandler);

            console.log("listener aggiunto");
          };

          appBar
            .querySelectorAll("button:not(#font-btn)")
            .forEach(function(button) {
              console.log(button);
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
          document.getElementById("top-btn").classList.toggle("hide");
          sketchFab.init("a9214249dc844fa99e11e931ff17942e", {
            success: function(api) {
              api.start();
            },
            ui_stop: 0
          });
        },
        savedElementsBtnHandler = function() {
          document.body.classList.remove("explore");
          document.body.classList.toggle("saved-elements");
          document.getElementById("top-btn").classList.toggle("hide");
        },
        topBtnHandler = function() {
          document
            .getElementById("test")
            .scrollIntoView({ block: "start", behavior: "smooth" });
        },
        selectionPopOver = document.getElementById("selection-pop-over");

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

    if(savedText.length > 0){
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
  
          console.log(this.closest(".card").style.cssText = "display : none;");
          savedText.splice(savedText.findIndex(function(elem) {
            return elem.id === e.target.dataset.remove;
          }), 1);
  
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

  function handleActiveButtons() {
    this.blur();

    if (this.classList.contains("active")) {
      this.classList.remove("active");
    } else {
      const activeButton = appBar.querySelector("button.active");

      activeButton && activeButton.classList.remove("active");

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
      } else if (button.id === "top-btn") {
        button.addEventListener("click", topBtnHandler);
      }

      button.addEventListener("click", handleActiveButtons);
    });
  }

  function initTab(tabContainer) {
    const tabList = tabContainer.querySelector("[role=\"tablist\"]");
    const tabPanels = tabContainer.querySelector(".tabs");
    const tabs = tabList.querySelectorAll("button");

    tabs.forEach(function(tab) {
      tab.addEventListener("click", function() {
        if (this.getAttribute("aria-selected") === "false") {
          tabContainer.querySelector("button[aria-selected=\"true\"]").setAttribute("aria-selected", "false");
          this.setAttribute("aria-selected", "true");
          tabPanels.style.setProperty("--i", currentTab === 0 ? currentTab = 1 : currentTab = 0);
          tabPanels.style.setProperty("--f", 0.5);
        }
      });
    });

    tabPanels.querySelectorAll("[role=\"tabpanel\"]").forEach(function(tab) {
      if (tab.dataset.savedElements !== "true") {
        tab.querySelector(".no-data").appendChild(document.createTextNode(tab.dataset.savedElements));
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
        tabPanels.style.setProperty("--tx", `${Math.round(unifyEvent(e).clientX - startingPosition)}px`);
    }

    function swipeEnd(e) {
      if (touched) {
        let swiped = unifyEvent(e).clientX - startingPosition,
            sign = Math.sign(swiped),
            f = +(sign * swiped / window.innerWidth).toFixed(2);

        if ((currentTab > 0 || sign < 0) && (currentTab < 1 || sign > 0) && f > 0.35) {
          tabPanels.style.setProperty("--i", currentTab -= sign);
          f = 1 - f;
        }

        tabPanels.style.setProperty("--tx", "0px");
        tabPanels.style.setProperty("--f", f);
        tabPanels.classList.toggle("smooth", !(touched = false));
        tabContainer.querySelector("button[aria-selected=\"true\"]").setAttribute("aria-selected", "false");
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
    const chartreuse = chartreuseSelection.querySelectorAll(
      "div[data-certosa]"
    );

    if (mediaQuery.matches) {
      console.log("metto swipe");

      chartreuse.forEach(function(chartreuse) {
        chartreuse.removeEventListener("click", loadChartreuseModel, false);
      });

      chartreuseSelection
        .querySelectorAll("figcaption")
        .forEach(function(caption) {
          console.log(caption);
          caption.addEventListener("click", function() {
            this.style.cssText = "transform: translate(0%)";
          });
        });

      chartreuseSelection.addEventListener("mousedown", swipeStart, false);
      chartreuseSelection.addEventListener("touchstart", swipeStart, false);

      chartreuseSelection.addEventListener("mousemove", swipe, false);
      chartreuseSelection.addEventListener("touchmove", swipe, false);

      chartreuseSelection.addEventListener("mouseup", swipeEnd, false);
      chartreuseSelection.addEventListener("touchend", swipeEnd, false);
    } else {
      console.log(chartreuse);

      chartreuse.forEach(function(chartreuse) {
        chartreuse.addEventListener("click", loadChartreuseModel, false);
      });

      chartreuseSelection.removeEventListener("mousedown", swipeStart, false);
      chartreuseSelection.removeEventListener("touchstart", swipeStart, false);

      chartreuseSelection.removeEventListener("mousemove", swipe, false);
      chartreuseSelection.removeEventListener("touchmove", swipe, false);

      chartreuseSelection.removeEventListener("mouseup", swipeEnd, false);
      chartreuseSelection.removeEventListener("touchend", swipeEnd, false);
    }
  }

  function loadChartreuseModel(e) {
    const previousActive = chartreuseSelection.querySelector(".active");

    previousActive && previousActive.classList.toggle("active");
    e.target.closest("div[data-certosa]").blur();
    e.target.closest("div[data-certosa]").classList.toggle("active");
    sketchFab.init(e.target.closest("div[data-certosa]").dataset.certosa, {
      success: function(api) {
        api.start();
      }
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
        chartreuseSelection.style.setProperty("--i", (currentImage -= sign));
        f = 1 - f;

        if (sign > 0) {
          sketchFab.init(
            e.target.closest("div").previousElementSibling.dataset.certosa,
            {
              success: function() {}
            }
          );
        } else if (sign < 0) {
          sketchFab.init(
            e.target.closest("div").nextElementSibling.dataset.certosa,
            {
              success: function() {}
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
})();

let startingPosition = null,
  currentImage = 0,
  currentTab = 0,
  touched = false;

// target elements with the "draggable" class
interact(".draggable").draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  restrict: {
    restriction: "parent",
    endOnly: true,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  },
  // enable autoScroll
  autoScroll: true,

  // call this function on every dragmove event
  onmove: dragMoveListener,
  // call this function on every dragend event
  onend: function(event) {
    var textEl = event.target.querySelector("p");

    textEl &&
      (textEl.textContent =
        "moved a distance of " +
        Math.sqrt(
          (Math.pow(event.pageX - event.x0, 2) +
            Math.pow(event.pageY - event.y0, 2)) |
            0
        ).toFixed(2) +
        "px");
  }
});

function dragMoveListener(event) {
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
    y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

let scrollpos = document.getElementById("main").scrollTop;
const header = document.getElementById("nav-bar");
const add_class_on_scroll = () => header.classList.add("fixed");
const remove_class_on_scroll = () => header.classList.remove("fixed");

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
