import React, { Component } from 'react'
import Styles from './FontModal.css'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faFont, faCaretDown, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

class FontModal extends Component {
  state = {
    headingFont: '',
    paragraphFont: '',
    marginLeft: '',
    marginRight: '',
    lineHeight: '',
    fontSizeIncrease: '0rem',
    backgroundColor: '',
    textColor: '',
    nightMode: '',
  }

  componentDidMount() {}

  componentWillUnmount() {}

  updateFont = fonts => {
    document.documentElement.style.setProperty('--heading-font', fonts.headingFont)
    document.documentElement.style.setProperty('--paragraph-font', fonts.paragraphFont)
    this.setState({
      fontDescription: fonts.description,
      paragraphFont: fonts.paragraphFont,
      headingFont: fonts.headingFont,
    })

    // localStorage.setItem(
    //   this.state.preferences,
    //   JSON.stringify(this.state.preferences).trim()
    // );
  }

  updateLineHeight = lineHeight => {
    this.setState(
      {
        lineHeightDescription: lineHeight.description,
        lineHeight: lineHeight.value,
      },
      () => {
        document.documentElement.style.setProperty('--line-height', lineHeight.value)
        // localStorage.setItem(
        //   this.state.preferences,
        //   JSON.stringify(this.state.preferences).trim()
        // );
      }
    )
  }

  increaseFontSize = size => {
    this.setState(
      prevState => ({
        fontSizeIncrease: (Number.parseFloat(prevState.fontSizeIncrease) + size)
          .toString()
          .concat('rem'),
      }),
      () => {
        document.documentElement.style.setProperty(
          '--font-size-increase',
          this.state.fontSizeIncrease
        )
        // localStorage.setItem(
        //   this.state.preferences,
        //   JSON.stringify(this.state.preferences).trim()
        // );
      }
    )
  }

  decreaseFontSize = size => {
    this.setState(
      prevState => ({
        fontSizeIncrease: (Number.parseFloat(prevState.fontSizeIncrease) - size)
          .toString()
          .concat('rem'),
      }),
      () => {
        document.documentElement.style.setProperty(
          '--font-size-increase',
          this.state.fontSizeIncrease
        )
        // localStorage.setItem(
        //   this.state.preferences,
        //   JSON.stringify(this.state.preferences).trim()
        // );
      }
    )
  }

  setNightMode = () => {
    this.setState(
      prevState => ({
        nightMode: !prevState.nightMode,
      }),
      () => {
        if (this.state.nightMode) {
          document.documentElement.style.setProperty('--background-color', '#333')
          document.documentElement.style.setProperty('--text-color', '#F4F4F4')
        } else {
          document.documentElement.style.setProperty('--background-color', '#F4F4F4')
          document.documentElement.style.setProperty('--text-color', '#333')
        }
      }
    )

    // localStorage.setItem(
    //   this.state.preferences,
    //   JSON.stringify(this.state.preferences).trim()
    // );
  }

  render() {
    return (
      <div
        ref={div => (this._fontModal = div)}
        aria-hidden="false"
        role="dialog"
        className={Styles.FontModal}>
        <div className={Styles.FontModalContent}>
          <div>
            <button
              data-tooltip="Diminuisci la dimensione del font"
              onClick={() => this.decreaseFontSize(0.175)}>
              <Icon icon={faFont} size="2x" />
            </button>

            <button
              data-tooltip="Aumenta la dimensione del font"
              onClick={() => this.increaseFontSize(0.175)}>
              <Icon icon={faFont} size="3x" />
            </button>
          </div>

          <div className="option">
            <span id="font-label">Carattere:</span>

            <div id="font" className={Styles.FontModalSelect}>
              <button
                id="font-button"
                aria-haspopup="listbox"
                aria-labelledby="font-label font-button"
                aria-expanded="false">
                {this.state.fontDescription}
                <Icon icon={faCaretDown} fixedWidth />
              </button>

              <ul tabIndex="-1" role="listbox" aria-labelledby="font-label" aria-hidden="true">
                <li
                  role="option"
                  aria-selected={this.state.headingFont === "'Libre Baskerville', serif"}
                  onClick={() =>
                    this.updateFont({
                      description: 'Montserrat',
                      paragraphFont: "'Montserrat', sans-serif",
                      headingFont: "'Libre Baskerville', serif",
                    })
                  }>
                  Montserrat
                </li>

                <li
                  role="option"
                  aria-selected={this.state.headingFont === "'Merriweather', serif"}
                  onClick={() =>
                    this.updateFont({
                      description: 'Open Sans',
                      paragraphFont: "'Open Sans', sans-serif",
                      headingFont: "'Merriweather', serif",
                    })
                  }>
                  Open Sans
                </li>

                <li
                  role="option"
                  aria-selected={this.state.headingFont === "'Old Standard TT', serif"}
                  onClick={() =>
                    this.updateFont({
                      description: 'Questrial',
                      paragraphFont: "'Questrial', sans-serif",
                      headingFont: "'Old Standard TT', serif",
                    })
                  }>
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
                data-active="Stretti">
                <Icon icon={faCaretDown} fixedWidth />
              </button>

              <ul tabIndex="-1" role="listbox" aria-labelledby="margin-label" aria-hidden="true">
                <li
                  data-description="Stretti"
                  data-margin="5vw"
                  role="option"
                  aria-selected="true"
                  onClick={() => {}}>
                  <span aria-hidden="true" className="font-margin">
                    <span />
                  </span>
                  Stretti
                </li>

                <li
                  data-description="Normali"
                  data-margin="10vw"
                  role="option"
                  aria-selected="false">
                  <span aria-hidden="true" className="font-margin">
                    <span />
                  </span>
                  Normali
                </li>

                <li
                  data-description="Larghi"
                  data-margin="15vw"
                  role="option"
                  aria-selected="false">
                  <span className="font-margin">
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
                aria-expanded="false">
                {this.state.lineHeightDescription}
                <Icon icon={faCaretDown} fixedWidth />
              </button>

              <ul
                tabIndex="-1"
                role="listbox"
                aria-labelledby="line-height-label"
                aria-hidden="true">
                <li
                  data-description="Stretta"
                  role="option"
                  aria-selected={this.state.lineHeight === '1.7em'}
                  onClick={() =>
                    this.updateLineHeight({
                      description: 'Stretta',
                      value: '1.7em',
                    })
                  }>
                  <span aria-hidden="true" className="bars">
                    <span />
                    <span />
                    <span />
                  </span>
                  Stretta
                </li>

                <li
                  data-description="Normale"
                  role="option"
                  aria-selected={this.state.lineHeight === '2.0em'}
                  onClick={e =>
                    this.updateLineHeight({
                      description: 'Normale',
                      value: '2.0em',
                    })
                  }>
                  <span aria-hidden="true" className="bars">
                    <span />
                    <span />
                    <span />
                  </span>
                  Normale
                </li>

                <li
                  data-description="Larga"
                  role="option"
                  aria-selected={this.state.lineHeight === '2.3em'}
                  onClick={() =>
                    this.updateLineHeight({
                      description: 'Larga',
                      value: '2.3em',
                    })
                  }>
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
              <input
                type="checkbox"
                className={Styles.FontModalSwitchToggle}
                onChange={this.setNightMode}
                checked={this.state.nightMode}
              />
              <span data-on="ON" data-off="OFF" className={Styles.FontModalSwitchLabel} />
              <span className={Styles.FontModalSwitchHandle}>
                <Icon icon={faSun} />
                <Icon icon={faMoon} />
              </span>
            </label>
          </div>
        </div>
      </div>
    )
  }
}

export default FontModal
