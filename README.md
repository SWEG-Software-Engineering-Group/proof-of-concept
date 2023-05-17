# proof-of-concept

## Come eseguire per la prima volta

### Backend

```
- cd API/SWEG-Traduzioni-api
- npm i -g serverless 
- serverless dynamodb install (Per Linux - sls dynamodb install)
- npm i (per installare tutto)
```
- Scaricare AWS CLI se non installato: [https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html]

- ```aws configure```
- AWS Access Key ID [****************MHOV]: ```DEFAULT_ACCESS_KEY``` (da inserire)
- AWS Secret Access Key [****************2t63]: ```DEFAULT_SECRET``` (da inserire)
- Default region name [us-east-1]: ```us-east-1``` (da inserire)
- Default output format [None]: (dare Invio)

### Frontend

Dentro la cartella Frontend:
```
- cd sweg-traduzioni-backoffice
- npm i
```

### Testing

- Si consiglia l'installazione di Jest con il seguente comando:
```
npm install --save-dev jest @types/jest ts-jest supertest
```
- Si consiglia di impostare un file di configurazione del tipo ```jest.config``` prendendo spunto da: [https://plainenglish.io/blog/beginners-guide-to-testing-jest-with-node-typescript]
- Per eseguire i test:
```
- npm run test 
```

### Esecuzione generale

- Backend:
  - All'interno di API/SWEG-Traduzioni-api :``` serverless offline start```
- Frontend:
  - All'interno di Frontend : ```npm start```

