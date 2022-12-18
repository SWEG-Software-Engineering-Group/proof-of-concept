import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    GetCommandInput,
    PutCommand,
    ScanCommand,
    ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { environment } from "src/environement/environement";
import { Tenant } from "src/types/Tenant";
//per eseguire in offline
//let options = { region: environment.awsRegion }
let options;
if (process.env.IS_OFFLINE) {
    options = {
        region: "localhost",
        endpoint: "http://localhost:8000",  
        accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
        secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
    }
}else{

}
// Create an Amazon DynamoDB service client object.
export const ddbClient = new DynamoDBClient(options);

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: true, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: true, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

// Create the DynamoDB document client.
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
    marshallOptions,
    unmarshallOptions,
});
//non funziona staticamente perche ogni volta che fai import crea una nuova classe db.


const dbputTenant = async (tenant: Tenant) => {
    const params = {
        TableName: environment.dynamo.tenantTable.tableName,
        Item: tenant,
    };
    try {
        const data = await ddbDocClient.send(new PutCommand(params));
        console.log("Success - item added or updated", data);
    } catch (err) {
        console.log("Error", err.stack);
        throw err;
    }
}
const dbgetTenants = async ()  => {
    // Set the parameters.
    const params: ScanCommandInput = {
        TableName: environment.dynamo.tenantTable.tableName,
      };
      try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        console.log("Success - GET", data);
        return data.Items.sort((a, b) => a.name - b.name);
      } catch (err) {
        console.log("Error", err.stack);
        throw { err };
      }
  };/*
const dbgetTenants=async() =>{
    return db.Tenants;
}

const dbdeleteTenants=async(tenant: String) =>{
    db.Tenants.forEach(element => {
        if (element.name==tenant){
            db.Tenants.splice(db.Tenants.indexOf(element),1);
            return true;
        }
    });
    return false;
}*/
export {
    dbputTenant,
    dbgetTenants,
    //dbdeleteTenants
};
