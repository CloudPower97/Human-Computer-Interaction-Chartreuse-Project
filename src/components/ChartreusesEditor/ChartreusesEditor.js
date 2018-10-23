import React, { Component } from 'react'
import Styles from './ChartreusesEditor.css'

import ChartreuseAnnotationBox from './ChartreusesAnnotationBox/ChartreusesAnnotationBox'
class ChartreusesEditor extends Component {
  state = {
    _dropZones: [],
  }

  componentDidMount() {
    ;[this._dropZones0, this._dropZones1].forEach(dropZone => {
      dropZone.addEventListener('dragenter', e => {
        this.dragEnter(e, dropZone)
      })
      dropZone.addEventListener('dragleave', e => {
        this.dragLeave(e, dropZone)
      })
      dropZone.addEventListener('dragover', e => {
        this.dragOver(e)
      })
      dropZone.addEventListener('drop', this.drop.bind(this))
      dropZone.addEventListener('mouseenter', e => {
        this.mouseEnter(e, dropZone)
      })
      dropZone.addEventListener('mouseleave', e => {
        this.mouseLeave(e, dropZone)
      })
    })
  }

  componentWillUnmount() {
    this.state._dropZones.forEach(dropZone => {
      dropZone.removeEventListener('dragenter', this.dragEnter)
      dropZone.removeEventListener('dragleave', this.dragLeave)
      dropZone.removeEventListener('dragover', this.dragOver)
      dropZone.removeEventListener('drop', this.drop)
      dropZone.removeEventListener('mouseenter', this.mouseEnter)
      dropZone.removeEventListener('mouseleave', this.mouseLeave)
    })
  }

  dragEnter(e, dropZone) {
    e.preventDefault()
    dropZone.classList.add(Styles.ChartreusesEditorModelAllowDrop)
  }

  dragLeave(e, dropZone) {
    e.preventDefault()
    dropZone.classList.remove(Styles.ChartreusesEditorModelAllowDrop)
  }

  dragOver(e) {
    e.preventDefault()
  }

  drop(e) {
    e.preventDefault()
    e.target.classList.remove(Styles.ChartreusesEditorModelAllowDrop)
    e.target.classList.add(Styles.ChartreusesEditorModelDrop)
    const iframe = e.target.firstElementChild,
      sketchfabUrl = e.dataTransfer.getData('text'),
      chartreuseToLoad = document.querySelector(`[data-certosa="${sketchfabUrl}"]`)

    setTimeout(() => e.target.classList.remove(Styles.ChartreusesEditorModelDrop), 750)

    if (chartreuseToLoad) {
      chartreuseToLoad.dataset.active = true
      chartreuseToLoad.setAttribute('draggable', false)
    }

    if (!e.target.classList.contains(Styles.ChartreusesEditorModelHide)) {
      e.target.classList.add(
        Styles.ChartreusesEditorModelHide,
        Styles.ChartreusesEditorModelDropped
      )
    }

    if (e.target.firstElementChild.src.includes('sketchfab')) {
      const chartreuseToUnload = document.querySelector(
        `[data-certosa="${e.target.firstElementChild.src.split('/')[4]}"]`
      )

      if (chartreuseToUnload) {
        delete chartreuseToUnload.dataset.active
        chartreuseToUnload.setAttribute('draggable', true)
      }
    }

    // currentImage = iframe.dataset.index = chartreuseToLoad.dataset.index;

    if (e.target.dataset.dropzone === 'first-model') {
      const setFirstModelApi = api => {
        this.setState(
          {
            firstModel: {
              api: api,
              modelUrl: sketchfabUrl,
            },
          },
          () => {
            const { firstModel } = this.state

            firstModel.api.start()
            firstModel.api.addEventListener('annotationSelect', index => {
              this.setState({
                annotationIndex: index,
              })
              if (this.state.firstModel.modelUrl === '3beb68e77080431b9bc1003bf0e23a3b') {
                firstModel.api.getAnnotation(index, (err, inf) => {
                  if (index === 0 || index === 1) {
                    const eye = inf && inf.eye,
                      target = inf && inf.target

                    if (eye && target) {
                      firstModel.api.setCameraLookAt(eye, [target[0], target[1], target[2] + 45])
                    }
                  }
                })
              } else if (this.state.firstModel.modelUrl === 'a9214249dc844fa99e11e931ff17942e') {
                firstModel.api.getAnnotation(index, (err, inf) => {
                  const eye = inf && inf.eye,
                    target = inf && inf.target

                  if (eye && target) {
                    if (index === 0) {
                      firstModel.api.setCameraLookAt(eye, [target[0], target[1], target[2] + 45])
                    } else if (index === 1) {
                      firstModel.api.setCameraLookAt(eye, [target[0], target[1], target[2] + 25])
                    }
                  }
                })
              }
            })
            firstModel.api.addEventListener('annotationFocus', index => {
              this.state.secondModel && this.state.secondModel.api.gotoAnnotation(index)
            })
          }
        )
      }

      new window.Sketchfab(iframe).init(e.dataTransfer.getData('text'), {
        success: function onSuccess(api) {
          setFirstModelApi(api)
        },
      })
    } else {
      const setSecondModelApi = api => {
        this.setState(
          {
            secondModel: {
              api: api,
              modelUrl: sketchfabUrl,
            },
          },
          () => {
            const { secondModel } = this.state

            secondModel.api.start()
            secondModel.api.addEventListener('annotationSelect', index => {
              if (this.state.secondModel.modelUrl === '3beb68e77080431b9bc1003bf0e23a3b') {
                secondModel.api.getAnnotation(index, (err, inf) => {
                  if (index === 0 || index === 1) {
                    const eye = inf && inf.eye,
                      target = inf && inf.target

                    if (eye && target) {
                      secondModel.api.setCameraLookAt(eye, [target[0], target[1], target[2] + 45])
                    }
                  }
                })
              } else if (this.state.secondModel.modelUrl === 'a9214249dc844fa99e11e931ff17942e') {
                secondModel.api.getAnnotation(index, (err, inf) => {
                  const eye = inf && inf.eye,
                    target = inf && inf.target

                  if (eye && target) {
                    if (index === 0) {
                      secondModel.api.setCameraLookAt(eye, [target[0], target[1], target[2] + 45])
                    } else if (index === 1) {
                      secondModel.api.setCameraLookAt(eye, [target[0], target[1], target[2] + 25])
                    }
                  }
                })
              }
            })
            secondModel.api.addEventListener('annotationFocus', index => {
              this.state.firstModel && this.state.firstModel.api.gotoAnnotation(index)
            })
          }
        )
      }

      new window.Sketchfab(iframe).init(e.dataTransfer.getData('text'), {
        success: function onSuccess(api) {
          setSecondModelApi(api)
        },
      })
    }
  }

  mouseEnter(e, dropZone) {
    if (dropZone.firstElementChild) {
      dropZone.firstElementChild.style.cssText = 'pointer-events: auto'
    }
  }

  mouseLeave(e, dropZone) {
    if (dropZone.firstElementChild) {
      dropZone.firstElementChild.style.cssText = 'pointer-events: none'
    }
  }

  render() {
    const { annotationIndex } = this.state

    return (
      <div id="editor" className={Styles.ChartreusesEditor}>
        <div
          className={Styles.ChartreusesEditorModel}
          data-dropzone="first-model"
          ref={div => (this._dropZones0 = div)}>
          <iframe
            src=""
            title="first model"
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
          ref={div => (this._dropZones1 = div)}>
          <iframe
            src=""
            title="second model"
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

        <ChartreuseAnnotationBox annotationIndex={annotationIndex} />
      </div>
    )
  }
}

export default ChartreusesEditor
