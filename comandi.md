DA DENTRO LA CARTELLA IN CUI VOGLIAMO CREARE IL PROGETTO

npm install -g serverless

serverless create --template aws-nodejs-typescript --path nomeAPIProgetto (crea un progetto serverless con un template aws con typescript in una cartella di nome "nomeAPIProgetto")

-----------------

DA DENTRO LA CARTELLA DEL PROGETTO

npm i (installa i moduli linkati nel file delle dipendenze package.json e crea una cartella chiamata "node_modules"

npm install serverless-offline --save-dev (serve per provare le lambda in locale senza deployarle su AWS in fase di sviluppo)
[si può anche installare globalmente con npm i -g serverless-offline]

(dentro il file serverless.ts, che è il file di configurazione di serverless aggiungiamo "serverless-offline" nell'array plugins)

serverless offline (per runnare in locale il server http)
(CTRL+C per spegnerlo, da riattivare ogni volta che apportiamo delle modifiche per vederle)

Questo può essere fatto --> nella cartella sweg-traduzioni-api

LIBRERIA DA INSTALLARE
npm i @aws-sdk/client-dynamodb
npm i @aws-sdk/lib-dynamodb

-----------------

PER DEPLOYARE ONLINE

serverless deploy