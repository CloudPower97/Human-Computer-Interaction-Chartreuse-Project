import React from "react";
import Styles from "./CharteusesList.css";
import CertosaDiSanMartinoSmallJpg from "../../assets/images/certosa-di-san-martino-small.jpg";
import CertosaDiSanMartinoSmall2xJpg from "../../assets/images/certosa-di-san-martino-small@2x.jpg";
import CertosaDiSanMartinoSmallWebP from "../../assets/images/certosa-di-san-martino-small.webp";
import CertosaDiSanMartinoSmall2xWebP from "../../assets/images/certosa-di-san-martino-small@2x.webp";
import CertosaDiSanMartinoLargeJpg from "../../assets/images/certosa-di-san-martino-large.jpg";
import CertosaDiSanMartinoLarge2xJpg from "../../assets/images/certosa-di-san-martino-large@2x.jpg";
import CertosaDiSanMartinoLargeWebP from "../../assets/images/certosa-di-san-martino-large.webp";
import CertosaDiSanMartinoLarge2xWebP from "../../assets/images/certosa-di-san-martino-large@2x.webp";
import CertosaDiSanGiacomoSmallJpg from "../../assets/images/certosa-di-san-giacomo-small.jpg";
import CertosaDiSanGiacomoSmall2xJpg from "../../assets/images/certosa-di-san-giacomo-small@2x.jpg";
import CertosaDiSanGiacomoSmallWebP from "../../assets/images/certosa-di-san-giacomo-small.webp";
import CertosaDiSanGiacomoSmall2xWebP from "../../assets/images/certosa-di-san-giacomo-small@2x.webp";
import CertosaDiSanGiacomoLargeJpg from "../../assets/images/certosa-di-san-giacomo-large.jpg";
import CertosaDiSanGiacomoLarge2xJpg from "../../assets/images/certosa-di-san-giacomo-large@2x.jpg";
import CertosaDiSanGiacomoLargeWebP from "../../assets/images/certosa-di-san-giacomo-large.webp";
import CertosaDiSanGiacomoLarge2xWebP from "../../assets/images/certosa-di-san-giacomo-large@2x.webp";
import CertosaDiSanLorenzoSmallJpg from "../../assets/images/certosa-di-san-lorenzo-small.jpg";
import CertosaDiSanLorenzoSmall2xJpg from "../../assets/images/certosa-di-san-lorenzo-small@2x.jpg";
import CertosaDiSanLorenzoSmallWebP from "../../assets/images/certosa-di-san-lorenzo-small.webp";
import CertosaDiSanLorenzoSmall2xWebP from "../../assets/images/certosa-di-san-lorenzo-small@2x.webp";
import CertosaDiSanLorenzoLargeJpg from "../../assets/images/certosa-di-san-lorenzo-large.jpg";
import CertosaDiSanLorenzoLarge2xJpg from "../../assets/images/certosa-di-san-lorenzo-large@2x.jpg";
import CertosaDiSanLorenzoLargeWebP from "../../assets/images/certosa-di-san-lorenzo-large.webp";
import CertosaDiSanLorenzoLarge2xWebP from "../../assets/images/certosa-di-san-lorenzo-large@2x.webp";

export default () => {
  return (
    <div id="list" className={Styles.ChartreusesList}>
      <h2>Scegli la certosa</h2>

      <div
        className={Styles.ChartreusesListImages}
        role="menubar"
        aria-orientation="vertical"
      >
        <div
          data-certosa="a9214249dc844fa99e11e931ff17942e"
          data-index="0"
          role="menuitem"
          aria-controls="editor"
          draggable="true"
        >
          <figure>
            <picture>
              <source
                type="image/webp"
                srcSet={`${CertosaDiSanMartinoLargeWebP}, ${CertosaDiSanMartinoLarge2xWebP} 2x`}
                media="(min-width: 800px)"
              />
              <source
                type="image/webp"
                srcSet={`${CertosaDiSanMartinoSmallWebP}, ${CertosaDiSanMartinoSmall2xWebP} 2x`}
              />
              <source
                srcSet={`${CertosaDiSanMartinoLargeJpg}, ${CertosaDiSanMartinoLarge2xJpg} 2x`}
                media="(min-width: 800px)"
              />

              <img
                srcSet={`${CertosaDiSanMartinoSmallJpg}, ${CertosaDiSanMartinoSmall2xJpg} 2x`}
                alt="Certosa di San Martino - Napoli (NA)"
              />
            </picture>

            <i className="fas fa-check fa-3x" />
            <figcaption>
              <div className="caption">
                <h2>Certosa di San Martino</h2>
                <span className="fa-fw">
                  <i className="fas fa-caret-up fa-2x" />
                </span>
              </div>

              <div className="features">
                <div>
                  <i className="fas fa-map-marked-alt fa-2x" />
                  <h3>Napoli</h3>
                </div>
                <div>
                  <i className="fas fa-calendar fa-2x" />
                  <h3>1300</h3>
                </div>
                <div>
                  <i className="fas fa-paint-brush fa-2x" />
                  <h3>Barocco</h3>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>

        <div
          data-certosa="a10966d718a44958bf57e078fb02f62d"
          data-index="1"
          role="menuitem"
          aria-controls="editor"
          draggable="true"
        >
          <figure>
            <picture>
              <source
                type="image/webp"
                srcSet={`${CertosaDiSanGiacomoLargeWebP}, ${CertosaDiSanGiacomoLarge2xWebP} 2x`}
                media="(min-width: 800px)"
              />
              <source
                type="image/webp"
                srcSet={`${CertosaDiSanGiacomoSmallWebP}, ${CertosaDiSanGiacomoSmall2xWebP} 2x`}
              />
              <source
                srcSet={`${CertosaDiSanGiacomoLargeJpg}, ${CertosaDiSanGiacomoLarge2xJpg} 2x`}
                media="(min-width: 800px)"
              />

              <img
                srcSet={`${CertosaDiSanGiacomoSmallJpg}, ${CertosaDiSanGiacomoSmall2xJpg} 2x`}
                alt="Certosa di San Giacomo - Capri (NA)"
              />
            </picture>

            <i className="fas fa-check fa-3x" />
            <figcaption>
              <div className="caption">
                <h2>Certosa di San Giacomo</h2>
                <span className="fa-fw">
                  <i className="fas fa-caret-up fa-2x" />
                </span>
              </div>

              <div className="features">
                <div>
                  <i className="fas fa-map-marked-alt fa-2x" />
                  <h3>Capri (NA)</h3>
                </div>
                <div>
                  <i className="fas fa-calendar fa-2x" />
                  <h3>1300</h3>
                </div>
                <div>
                  <i className="fas fa-paint-brush fa-2x" />
                  <h3>Barocco</h3>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>

        <div
          data-certosa="3beb68e77080431b9bc1003bf0e23a3b"
          data-index="2"
          role="menuitem"
          aria-controls="editor"
          draggable="true"
        >
          <figure>
            <picture>
              <source
                type="image/webp"
                srcSet={`${CertosaDiSanLorenzoLargeWebP}, ${CertosaDiSanLorenzoLarge2xWebP} 2x`}
                media="(min-width: 800px)"
              />
              <source
                type="image/webp"
                srcSet={`${CertosaDiSanLorenzoSmallWebP}, ${CertosaDiSanLorenzoSmall2xWebP} 2x`}
              />
              <source
                srcSet={`${CertosaDiSanLorenzoLargeJpg}, ${CertosaDiSanLorenzoLarge2xJpg} 2x`}
                media="(min-width: 800px)"
              />

              <img
                srcSet={`${CertosaDiSanLorenzoSmallJpg}, ${CertosaDiSanLorenzoSmall2xJpg} 2x`}
                alt="Certosa di San Lorenzo - Padula (SA)"
              />
            </picture>

            <i className="fas fa-check fa-3x" />
            <figcaption>
              <div className="caption">
                <h2>Certosa di San Lorenzo</h2>
                <span className="fa-fw">
                  <i className="fas fa-caret-up fa-2x" />
                </span>
              </div>

              <div className="features">
                <div>
                  <i className="fas fa-map-marked-alt fa-2x" />
                  <h3>Padula (SA)</h3>
                </div>
                <div>
                  <i className="fas fa-calendar fa-2x" />
                  <h3>1300</h3>
                </div>
                <div>
                  <i className="fas fa-paint-brush fa-2x" />
                  <h3>Barocco</h3>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};
