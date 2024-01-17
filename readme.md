# Progetto Ingeneria del Software

## Descrizione
Progetto Ingeneria del Software II (appello gennaio 2024)

## Struttura del Progetto
```plaintext
IS2-24
|-- config                  # Configurazioni del progetto
|   |-- db.js               # Configurazioni del database
|   `-- popolaShoe.json     # Dati di popolamento per le scarpe

|-- middleware              # Middleware del server
|   |-- isAdmin.js          # Middleware per verificare se l'utente è un amministratore
|   `-- tokenChecker.js     # Middleware per verificare i token di autenticazione

|-- models                  # Definizioni dei modelli di dati
|   |-- cart.js             # Modello per il carrello dell'utente
|   |-- shoe.js             # Modello per le informazioni sulle scarpe
|   `-- user.js             # Modello per le informazioni degli utenti

|-- public                  # Risorse pubbliche
|   |-- css
|   |   `-- style.css       # Foglio di stile principale
|   `-- js
|       |-- admin.js        # Script per la pagina admin
|       |-- aggiungi.js      # Script per la pagina di aggiunta
|       |-- cart.js         # Script per la gestione del carrello
|       |-- home.js         # Script per la homepage
|       |-- index.js        # Script principale
|       |-- login.js        # Script per la pagina di login
|       |-- logout.js       # Script per la gestione del logout
|       |-- modifica.js     # Script per la modifica
|       `-- vetrina.js      # Script per la visualizzazione della vetrina

|-- routes                  # Definizioni delle route dell'applicazione
|   |-- addCartRoute.js     # Route per l'aggiunta di elementi al carrello
|   |-- addshoeRoute.js     # Route per l'aggiunta di nuove scarpe
|   |-- adminRoute.js       # Route per le operazioni amministrative
|   |-- cartRoute.js        # Route per la gestione del carrello
|   |-- deleteCartRoute.js  # Route per la rimozione di elementi dal carrello
|   |-- deleteShoeRoute.js  # Route per la rimozione di scarpe
|   |-- loginRoute.js       # Route per la gestione del login
|   |-- modificaRoute.js    # Route per la modifica di elementi
|   |-- protectedRoute.js   # Route protetta
|   |-- registerRoute.js    # Route per la registrazione degli utenti
|   |-- shoeRoute.js        # Route per la gestione delle scarpe
|   `-- updateShoeRoute.js  # Route per l'aggiornamento delle scarpe

|-- tests                   # Test dell'applicazione
|   |-- addCartRoute.test.js  # Test per la route di aggiunta al carrello
|   |-- addshoeRoute.test.js  # Test per la route di aggiunta di nuove scarpe
|   |-- adminRoute.test.js    # Test per le operazioni amministrative
|   |-- app.test.js           # Test dell'applicazione principale
|   |-- cartRoute.test.js     # Test per la route di gestione del carrello
|   |-- deleteShoeRoute.test.js  # Test per la route di rimozione di scarpe
|   |-- jest.setup.js         # Configurazione di Jest
|   |-- loginRoute.test.js    # Test per la route di login
|   |-- registerRoute.test.js # Test per la route di registrazione
|   |-- shoeRoute.test.js     # Test per la route di gestione delle scarpe
|   |-- testConfig.js         # Configurazione dei test
|   `-- updateShoeRoute.test.js  # Test per la route di aggiornamento delle scarpe

|-- views                   # Viste dell'applicazione
|   |-- adminpage.ejs       # Pagina amministrativa
|   |-- aggiungi.ejs        # Pagina di aggiunta
|   |-- carrello.ejs        # Pagina del carrello
|   |-- home.ejs            # Pagina principale
|   |-- index.ejs           # Pagina di indice
|   |-- login.ejs           # Pagina di login
|   |-- logout.ejs          # Pagina di logout
|   |-- modifica.ejs        # Pagina di modifica scarpe
|   |-- navbar.ejs          # Barra di navigazione
|   |-- protected.ejs       # Pagina protetta
|   |-- prova.ejs           # Pagina di prova
|   |-- register.ejs        # Pagina di registrazione
|   `-- vetrina.ejs         # Pagina della vetrina

## File Principali
|-- .gitattributes          # Configurazione Git.
|-- .gitignore              # File e cartelle esclusi dal tracciamento di Git.
|-- app.js                  # Server.
|-- jest.config.js          # Configurazione per Jest.
|-- package-lock.json       # Blocco delle versioni delle dipendenze npm.
|-- package.json            # Informazioni sul progetto e dipendenze.
|-- readme.md               # Questa pagina.
`-- swagger.json            # Documentazione della API Swagger.
