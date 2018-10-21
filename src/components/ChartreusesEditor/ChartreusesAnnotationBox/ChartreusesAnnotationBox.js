import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Styles from "./ChartreusesAnnotationBox.css";

const ChartreusesAnnotationBox = ({ annotationIndex }) => {
  let annotationBox = null,
    annotationDescription,
    annotationTitle;

  switch (annotationIndex) {
    case 0:
      annotationTitle = "Chiostro Grande";
      annotationDescription =
        "Intorno al chiostro grande sono disposte le celle dei padri, rappresentava pertanto il cuore della vita di clausura.";
      break;

    case 1:
      annotationTitle = "Chiesa";
      annotationDescription =
        "Il luogo sacro per eccellenza dove i padri si recavano più volte al giorno, nel rispetto della liturgia certosina che prevede la preghiera notturna o Mattutino, la celebrazione della Messa conventuale e i Vespri.";
      break;

    case 2:
      annotationTitle = "Celle";
      annotationDescription =
        "Le celle sono spazi sufficientemente ampi dove i monaci trascorrevano molto tempo, non solo vi dormivano e mangiavano, ma potevano dedicarsi alla preghiera solitaria e al lavoro, nel rispetto del motto ‘ora et labora’ cui è improntata la regola certosina. Nei giorni non festivi i padri ricevevano i pasti attraverso i passavivande, piccole aperture collocate accanto alla porta.";
      break;

    case 3:
      annotationTitle = "Refettorio";
      annotationDescription =
        "È il luogo destinato a consumare i pasti in comunità, la domenica o nei giorni di festa. I monaci mangiavano in silenzio, ascoltando la sacra scrittura o altri testi indicati dal Priore, che venivano letti da un apposito pulpito.";
      break;

    case 4:
      annotationTitle = "Quarto del Priore";
      annotationDescription =
        "Il Priore, capo spirituale della comunità certosina, disponeva di un quarto, un appartamento, più spazioso rispetto alle celle degli altri monaci e di solito riccamente decorato e dotato di giardino privato.";
      break;

    default:
      annotationTitle = "Le Certose";
      annotationDescription =
        "Una certosa è un monastero di monaci certosini, di norma situato in zone solitarie. Il nome deriva dalla Grande Certosa (Grande Chartreuse), monastero principale dell'Ordine Certosino, che si trova sul massiccio della Chartreuse sulle Alpi francesi a nord della città di Grenoble in Val-d'Isère.";
      break;
  }

  annotationBox = (
    <Fragment>
      <h2>{annotationTitle}</h2>
      <p>{annotationDescription}</p>
    </Fragment>
  );

  return <div className={Styles.ChartreusesAnnotationBox}>{annotationBox}</div>;
};

ChartreusesAnnotationBox.propTypes = {
  annotationIndex: PropTypes.number.isRequired
};

export default ChartreusesAnnotationBox;
