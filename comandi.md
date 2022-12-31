DA DENTRO LA CARTELLA IN CUI VOGLIAMO CREARE IL PROGETTO

npm install -g serverless

serverless create --template aws-nodejs-typescript --path nomeAPIProgetto (crea un progetto serverless con un template aws con typescript in una cartella di nome "nomeAPIProgetto")

-----------------

DA DENTRO LA CARTELLA DEL PROGETTO

npm i (installa i moduli linkati nel file delle dipendenze package.json)

npm install serverless-offline --save-dev (serve per provare le lambda in locale senza deployarle su AWS in fase di sviluppo)

(dentro il file serverless.ts, che è il file di configurazione di serverless aggiungiamo "serverless-offline" nell'array plugins)

serverless offline (per runnare in locale il server http)
(CTRL+C per spegnerlo, da riattivare ogni volta che apportiamo delle modifiche per vederle)


LIBRERIA DA INSTALLARE
npm i @aws-sdk/client-dynamodb
npm i @aws-sdk/lib-dynamodb

-----------------

PER DEPLOYARE ONLINE

serverless deploy

PER FRONTEND

- Entrare in "sweg-traduzioni-backoffice"
- npm i 
- Installare (--save dev per farlo solo in locale nella cartella del progetto)
    - npm i react-router
    - npm i @material-ui/core
- Esecuzione: npm start (CTRL + C per terminare l'esecuzione)

PER BACKEND 
Test di "sweg-javascript-api" (si vede il test su CloudWatch)
- Entrare in "API"
- npm install -g serverless
- npm install serverless-offline --save-dev
- Previo accesso ad AWS ed impostazione utenti
(con relativa creazione del file "credentials" per utenti) -> 
https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
- serverless deploy --aws-profile nomeprofilo

Test di "sweg-traduzioni-api"
- npm i
- npm install serverless-offline --save-dev
- serverless deploy --aws-profile nomeprofilo (per farlo online)
- serverless offline (per farlo offline)