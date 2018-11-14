[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub contributors](https://img.shields.io/github/contributors/CloudPower97/Human-Computer-Interaction-Chartreuse-Project.svg)](https://GitHub.com/CloudPower97/Human-Computer-Interaction-Chartreuse-Project/graphs/contributors/)
[![made-with-react](https://img.shields.io/badge/Made%20with-React-1f425f.svg)](https://reactjs.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Visualizzatore dei modelli tridimensionali delle certose campane

## Introduzione

L'applicativo si configura come una web app nata da un progetto nell'ambito della valorizzazione dei beni culturali della Campania e realizzato ai fini dell'esame di **Human-Computer Interaction**, _Corso di Laurea in Informatica_ - **Federico II**.  
L'interfaccia mira, pertanto, a presentarsi come una valida sintesi dei principi di **User-Experience** e **User-Interface** acquisiti durante il corso, di cui si presenta un breve look-up nella sezione _"Scelte progettuali inerenti all'interfaccia"_. 

## Tecnologie web coinvolte nel progetto

Per realizzare la web app si è scelto di sfruttare al meglio le funzionalità delle versioni più recenti degli strumenti che seguono :

- _HTML5_ per il markup e la formattazione della pagina web;
- _CSS3_ e _PostCSS_ con i seguenti plugin:
  - _PostCSS Nested Ancestor_
  - _PostCSS Nested_
  - _PostCSS Easing Gradients_
- _Javascript_ ed il framework _React.js_ nella versione **16.5.2**

## Utilizzo di APIs esterne - L'API di Sketchfab

_Sketchfab_ è la piattaforma di condivisione di contenuti 3D da cui l'applicativo effettua il retrieve dei modelli delle certose e ne fornisce una web view.  
La sua **Viewer API** ha fornito validi strumenti per la realizzazione dell'architettura della pagina web per il confronto dei monasteri, in particolare :

- metodi per il lancio e la cattura di eventi, utilizzati soprattutto per il caricamento del modello richiesto nella dropzone selezionata;

- metodi per la gestione e visualizzazione delle annotazioni di ciascun modello, sfruttati sic est, nonchè manipolati per consentire il confronto simultaneo di più certose.

## Scelte progettuali inerenti all'interfaccia

Come già prima affermato, in fase di produzione si è posto particolare accento sui principi di usabilità, e ciò è stato fatto ponendo attenzione alle caratteristiche che seguiranno.

### Palette dei colori

Fondamentale è l'accostamento di tonalità cromatiche in contrasto per un layout gradevole e per nulla monotono; si è scelto quindi di alternare toni freddi nelle sfumature brillanti con toni caldi dalle sfumature desaturate (per la legge del constrasto simultaneo).

![Palette dei colori](https://coolors.co/export/png/2980b9-c78283-373737-c0b283-f4f4f4)

### Disposizione del layout in griglie

Nella disposizione complessiva degli elementi della pagina, fondamentale è il ricorso ad alcune **leggi della Gestalt** :

- la _legge del destino comune_, così come la _legge della continuità di direzione_, garantiscono che l'occhio umano accorpi alcune porzioni del viewport sotto un'unica forma, percepibile come singola unità logica. In particolare, elementi caratterizzati dallo stesso orientamento e dal movimento solidale tra loro, rispetto agli altri elementi, verranno visti come un tutt'uno. Le immagini che caratterizzano la lista dei modelli, così come le due dropzones, ne sono un valido esempio;

- per la _legge della somiglianza_, poi, vengono considerati sotto la medesima unità gli elementi simili tra loro: la continuità nella formattazione, rispettivamente, delle tre porzioni che suddividono il viewport, è essenziale a tale scopo, in particolare se si considera il contrasto, anche cromatico, che persiste tra le macrosezioni;
  
- la _legge dell'esperienza passata_, poi, entra in gioco in particolare per l'appbar ed i suoi bottoni; infatti, si è scelto di utilizzare icone familiari all'utente, in modo tale da mantenere coerenza e consistenza con il suo background.
  
### Appbar

L'appbar, che si sviluppa in verticale sulla sinistra del viewport nella versione desktop dell'applicativo (e, rispettivamente, in orizzontale in basso nella versione mobile in _portrait_) consente all'utente di muoversi all'interno delle sezioni della web app.

Al fine di guidare l'utente nella navigazione consapevole della web app, l'hover sui bottoni conduce alla comparsa di _tips_ che suggeriscono all'utente cosa andrà a visualizzare in seguito al click. Si rafforza così l'**affordance** della barra e si estende agli _utenti novizi_, mentre le icone familiari rievocano l'esperienza passata degli _utenti scaltri_.

Inoltre, per rendere l'utente sempre consapevole dello stato in cui l'applicativo si trova, comparirà un layer scuro sul bottone rispettivo alla sezione correntemente visualizzata.

### Versione desktop : il drag & drop dei modelli

La sezione del confronto tra modelli risulta intrinsecamente dotata di buona affordance, poichè suggerisce naturalmente i mezzi e lo scopo di utilizzo, prevenendo qualsiasi necessità, da parte dell'utente, di ricorrere a tutorials o supporti esterni.

In particolare, i commenti dinamici nelle dropzones guidano l'utente nell'esperienza d'utilizzo, segnalando a questi, di volta in volta, le operazioni possibili.

La **prevenzione degli errori** consiste nell'evitare all'utente di selezionare il modello errato oppure di caricare il modello voluto nella dropzone errata (incidenti che potrebbero avvenire principalmente per _lapsus_, oppure per _errore di cattura_) e si concretizza come segue :

- la lista dei modelli si presenta come una sequenza di tre immagini, rispettive alle tre certose che possono essere visualizzate, e ciascuna di esse presenta un nome inequivocabile (nonchè informazioni aggiuntive);

- la lista dei modelli occupa una buona porzione del viewport (circa il 30%) affinchè l'utente possa applicare il cursore sull' immagine rispettiva al modello appropriato, senza il rischio di selezionarne uno adiacente per sbaglio. Per la **legge di Fitts**, inoltre, lo spostamento del cursore su ognuna delle immagini risulta un movimento rapido, poichè il tempo di moto è inversamente proporzionale alla grandezza dell'immagine, proprio in virtù del fatto che questa è trascinabile a partire da ogni suo punto;

- viene mostrata l'anteprima della certosa che verrà caricata, a patto di avere supporto nativo da parte del browser, durante l'intero completamento del drag;

- si forniscono opportuni **feedback** all'utente : quando il cursore si colloca su una dropzone durante il trascinamento dell'icona, compare un layer scuro sull'area di drop, corredato da commenti che suggeriscono l'azione appropriata.

La **gestione degli errori**, invece, si focalizza sul garantire all'utente di porre rimedio ad una eventuale selezione errata; mediante meccanismo di _forward error correction_, infatti, è egli stesso che ha modo di rendersi conto della situazione di errore (vedrà infatti comparire un segno di spunta sull'immagine rispettiva al modello erroneamente caricato) e, senza necessità di ripristinare lo stato iniziale dell'applicativo, potrà comodamente selezionare il modello che desiderava realmente caricare.

### Versione mobile : il carosello e la modalità di swipe

Nella versione mobile con vista in _portrait_ dell'applicativo è presente, nella porzione inferiore del viewport, il carosello delle immagini rispettive ai tre modelli.
Tramite un meccanismo di _swipe_ è possibile selezionare esclusivamente il modello da esplorare (non si fornisce la possibilità di confrontare più modelli, per limiti dovuti alla dimensione ridotta del viewport).

La **prevenzione degli errori** consente di garantire che l'utente carichi un modello differente da quello che sta correntemente osservando solo se voluto; il trascinamento sull'immagine porta alla comparsa dell'immagine successiva solo se lo swipe ha condotto a mostrarne più del 40% (quindi, solo se il trascinamento è fatto con volontà nell'azione).

In tal caso, qualora l'utente dovesse erroneamente caricare il modello errato quando aveva dinanzi quello giusto, la **gestione degli errori** è per _backward error recovery_ : potrà effettuare lo swipe sul carosello nella direzione opposta e tornare indietro.
