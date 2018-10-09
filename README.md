# Visualizzatore dei modelli tridimensionali delle certose campane

## Introduzione

L'applicativo si configura come una web app nata da un progetto nell'ambito della valorizzazione dei beni culturali della Campania e realizzato ai fini dell'esame di Human-Computer Interaction, Corso di Laurea in Informatica - Federico II.  
L'interfaccia mira, pertanto, a presentarsi come una valida sintesi dei principi di User-Experience e User-Interface acquisiti durante il corso, di cui si presenta un breve look-up nella sezione "Scelte progettuali inerenti all'interfaccia". <METTERE IL LINK>
 
## Tecnologie web coinvolte nel progetto

Per realizzare la web app si è scelto di sfruttare al meglio le funzionalità delle versioni più recenti degli strumenti che seguono :

* HTML5 per il markup e la formattazione della pagina web;
* CSS3 e Sassy CSS in qualità di linguaggi di stile;
* Javascript (nella versione ES6?) come linguaggio di scripting e di gestione di eventi, ai fini di definire la logica e l'interazione con APIs esterne.

## Utilizzo di APIs esterne - L'API di Sketchfab

Sketchfab è la piattaforma di condivisione di contenuti 3D da cui l'applicativo effettua il retrieve dei modelli delle certose e ne fornisce una web view.  
La sua API ha fornito validi strumenti per la realizzazione dell'architettura della pagina web per il confronto dei monasteri, in particolare :  

## Scelte progettuali inerenti all'interfaccia

Come già prima affermato, in fase di produzione si è posto particolare accento sui principi di usabilità, e ciò è stato fatto ponendo attenzione alle caratteristiche che seguiranno.  

### Palette dei colori

Fondamentale è l'accostamento di tonalità cromatiche in contrasto per un layout gradevole e per nulla monotono; si è scelto quindi di alternare toni freddi nelle sfumature brillanti con toni caldi dalle sfumature desaturate (per la legge del contrasto della Gestalt).

<ATTENDO PALETTE DEI COLORI PER ULTERIORI DESCRIZIONI>

### Versione desktop : il drag & drop dei modelli

La sezione del confronto tra modelli risulta intrinsecamente dotata di buona affordance, poichè suggerisce naturalmente i mezzi e lo scopo di utilizzo, prevenendo qualsiasi necessità, da parte dell'utente, di ricorrere a tutorials o supporti esterni.

In particolare, i commenti dinamici nelle dropzones guidano l'utente nell'esperienza d'utilizzo, segnalando a questi, di volta in volta, le operazioni possibili.  

La prevenzione degli errori consiste nell'evitare all'utente di selezionare il modello errato oppure di caricare il modello voluto nella dropzone errata (incidenti che potrebbero avvenire principalmente per lapsus, oppure per errore di cattura) e si concretizza come segue :

* la lista dei modelli si presenta come una sequenza di tre immagini, rispettive alle tre certose che possono essere visualizzate, e ciascuna di esse presenta un nome inequivocabile (nonchè informazioni aggiuntive);
  
* la lista dei modelli occupa una buona porzione del viewport (circa il 30%) affinchè l'utente possa applicare il cursore sull' immagine rispettiva al modello appropriato, senza il rischio di selezionarne uno adiacente per sbaglio. Per la legge di Fitts, inoltre, lo spostamento del cursore su ognuna delle immagini risulta un movimento rapido, poichè il tempo di moto è inversamente proporzionale alla grandezza dell'immagine, proprio in virtù del fatto che questa è trascinabile a partire da ogni suo punto;

* viene mostrata l'anteprima della certosa che verrà caricata, a patto di avere supporto nativo da parte del browser, durante l'intero completamento del drag;

* si forniscono opportuni feedback all'utente : quando il cursore si colloca su una dropzone durante il trascinamento dell'icona, compare un layer scuro sull'area di drop, corredato da commenti che suggeriscono l'azione appropriata.

La gestione degli errori, invece, si focalizza sul garantire all'utente di porre rimedio ad una eventuale selezione errata, mediante meccanismo di forward error correction.