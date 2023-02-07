# proof-of-concept


## Come eseguire per la prima volta

### Backend
Dentro la cartella API
- cd SWEG-Traduzioni-api
- npm i -g serverless 
- serverless dynamodb install (Per Linux - sls dynamodb install)
- npm i (per installare tutto)

- Scaricare AWS CLI se non installato: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
(Per Linux - sudo apt install awscli)

- aws configure
AWS Access Key ID [****************MHOV]: DEFAULT_ACCESS_KEY (da inserire)
AWS Secret Access Key [****************2t63]: DEFAULT_SECRET (da inserire)
Default region name [us-east-1]: us-east-1 (da inserire)
Default output format [None]: (dare Invio)
- per installare jest per il testing
```
npm install --save-dev jest
npm install --save-dev @types/jest
npm install --save-dev ts-jest
npm install --save-dev supertest
```
- questo da aggiungere ai file di configurazione [https://plainenglish.io/blog/beginners-guide-to-testing-jest-with-node-typescript]
- per eseguire i test che sono integration test fai partire il serverless poi esegui in un nuovo terminale
```
- npm run test 
```

### Frontend
Dentro la cartella Frontend
- cd sweg-traduzioni-backoffice
- npm i


Per runnare tutto:
(Backend)
- Da dentro API/SWEG-Traduzioni-api : serverless offline start
(Frontend)
- Da dentro Frontend : npm start


La parte Backend si apre da sola sulla porta 3000 quindi node per il Frontend chiederà di aprirsi su un'altra porta (perché sulla 3000 sta già aperto Serverless) 
Per avviare, dare Yes (y) e si aprirà sulla porta 3001
http://localhost:3001/index

Totale: 
Porta 3000 - Serverless Offline (va runnato per primo)
Porta 3001 - Frontend (va runnato per secondo)
Porta 8000 - DynamoDB
