import type { AWS } from '@serverless/typescript';
import {
  hello,
  getTenant,
  createTenant,
  deleteTenant,
  newUser,
  getUsers,
  getText,
  insertText,
  getTextuntranslated,
  singleTenantinfo,
  getTextlang,
  inserttranslation
}
  from '@functions/index'; import { environment } from 'src/environement/environement';


const serverlessConfiguration: AWS = {
  service: 'sweg-traduzioni-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline',/*testing*/'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  resources: {
    Resources: {
      tenantTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: environment.dynamo.tenantTable.tableName,
          BillingMode: 'PAY_PER_REQUEST',
          AttributeDefinitions: [
            {
              AttributeName: 'name',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'name',
              KeyType: 'HASH',
            },
          ],
        },
      },
      userTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: environment.dynamo.userData.tableName,
          BillingMode: 'PAY_PER_REQUEST',
          AttributeDefinitions: [
            {
              AttributeName: 'username',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'username',
              KeyType: 'HASH',
            },
          ],
        },
      },
      textTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: environment.dynamo.textTable.tableName,
          BillingMode: 'PAY_PER_REQUEST',
          AttributeDefinitions: [
            {
              AttributeName: 'tenantName',
              AttributeType: 'S',
            },
            {
              AttributeName: 'language',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'tenantName',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'language',
              KeyType: 'RANGE',
            },
          ],
        },
      },
    },
  },
  // import the function via paths
  functions:
  {
    hello,
    getTenant,
    createTenant,
    deleteTenant,
    newUser,
    getUsers,
    getText,
    insertText,
    getTextuntranslated,
    singleTenantinfo,
    getTextlang,
    inserttranslation
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    //extra per testare dynamodb in locale
    dynamodb: {
      stages: 'dev',
      start: {
        port: 8000,
        inmemory: true,
        migrate: true,
      }
    }
  },
};

module.exports = serverlessConfiguration;
