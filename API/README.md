
- `npm install --save-dev serverless-dynamodb-local`

- `npm i @aws-sdk/lib-dynamodb`

- `sls dynamodb install`

- `sudo apt  install awscli`

- `aws configure`
  le credenziali da dare sono:
accessKeyId: =`DEFAULT_ACCESS_KEY`
secretAccessKey: -`DEFAULT_SECRET`
per far partire il database e le API usa
- `sls dynamodb start`

per far partire il server dynamodb esegui il comando una volta in una shell separata per non ricreare ogni volta il database

- `sls dynamodb start`

per provare usa sls offline dopo il start di dynamodb

- `sls offline`