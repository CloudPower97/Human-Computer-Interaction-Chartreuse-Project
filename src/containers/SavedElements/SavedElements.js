import React from 'react'
import Styles from './SavedElements.css'

const SavedElements = () => {
  return (
    <section id="saved-elements" className={Styles.SavedElements}>
      <div role="tablist">
        <button
          role="tab"
          aria-selected="true"
          aria-controls="testi-salvati-tab"
          id="testi-salvati-label"
          tabIndex="0">
          <span className="fa-fw">
            <i className="fas fa-align-left" />
          </span>
          Testi salvati
        </button>
        <button
          role="tab"
          aria-selected="false"
          aria-controls="immagini-salvate-tab"
          id="immagini-salvate-label"
          tabIndex="0">
          <span className="fa-fw">
            <i className="fas fa-images" />
          </span>
          Immagini Salvate
        </button>
      </div>

      <div className="tabs smooth">
        <div
          role="tabpanel"
          id="testi-salvati-tab"
          aria-labelledby="testi-salvati-label"
          data-saved-elements="Sembra che tu non abbia salvato ancora alcun testo... Perche' non ci provi subito?">
          <span className="no-data" />

          <template id="card-template">
            <div className="card">
              <div className="card--text" data-caption="">
                <p />
              </div>

              <div className="card--alert" hidden>
                <span>Sei sicuro di voler eliminare questo elemento salvato?</span>

                <div>
                  <button className="btn" data-remove tabIndex="0">
                    Si
                  </button>
                  <button className="btn" tabIndex="0">
                    No
                  </button>
                </div>
              </div>

              <div className="card--action" role="menubar" aria-orientation="vertical">
                <button data-view-element role="menuitem">
                  <span className="fa-fw">
                    <i className="fas fa-eye" />
                  </span>
                </button>

                <button data-share role="menuitem" aria-controls="social-modal">
                  <span className="fa-fw">
                    <i className="fas fa-share-alt" />
                  </span>
                </button>

                <button data-delete-item role="menuitem" aria-controls="card--alert">
                  <span className="fa-fw">
                    <i className="fas fa-times" />
                  </span>
                </button>
              </div>
            </div>
          </template>
        </div>

        <div
          role="tabpanel"
          id="immagini-salvate-tab"
          aria-labelledby="immagini-salvate-label"
          data-saved-elements="Sembra che tu non abbia salvato ancora alcuna immagine... Perche' non ci provi subito?">
          <span className="no-data" />
        </div>
      </div>
    </section>
  )
}

export default SavedElements
