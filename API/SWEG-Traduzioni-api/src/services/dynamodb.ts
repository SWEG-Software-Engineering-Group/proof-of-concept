import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    GetCommandInput,
    PutCommand,
    ScanCommand,
    ScanCommandInput,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { environment } from "src/environement/environement";
import { Tenant } from "src/types/Tenant";
import { languageText, Text } from "src/types/Text";
import { UserData } from "src/types/UserData";
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
} else {

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
    const tenantparams = {
        TableName: environment.dynamo.tenantTable.tableName,
        Item: tenant,
        //ConditionExpression: 'attribute_not_exists("name")'
    };

    try {
        const data = await ddbDocClient.send(new PutCommand(tenantparams));

        //TODO da rifare
        await tenant.languages.forEach(element => {
            const languages = {
                tenantName: tenant.name,
                original: element == tenant.mainlang,
                language: element,
                texts: []
            } as languageText
            const textparams = {
                TableName: environment.dynamo.textTable.tableName,
                Item: languages,
                //ConditionExpression: 'attribute_not_exists("name")'
            };
            ddbDocClient.send(new PutCommand(textparams));
        });
        console.log("Success - item added or updated", data);
    } catch (err) {
        console.log("Error", err.stack);
        throw err;
    }
}
const dbgetTenants = async () => {
    // Set the parameters.
    const tenantparams: ScanCommandInput = {
        TableName: environment.dynamo.tenantTable.tableName,
    };
    try {
        const tenant = await ddbDocClient.send(new ScanCommand(tenantparams));

        console.log("Success - GET", tenant);
        return { tenants: tenant.Items.sort((a, b) => a.name - b.name) };
    } catch (err) {
        console.log("Error", err.stack);
        throw { err };
    }
};
const dbdeleteTenants = async (tenant: String) => {
    // Set the parameters.
    const params: GetCommandInput = {
        TableName: environment.dynamo.tenantTable.tableName,
        Key: { name: tenant },
    };
    try {
        const data = await ddbDocClient.send(new DeleteCommand(params));
        console.log("Success - GET", data);
    } catch (err) {
        console.log("Error", err.stack);
        throw { err, tenant };
    }
};
const dbputoriginalText = async (tenant: String,languag:string, newtext: Text) => {
    const params = {
        TableName: environment.dynamo.textTable.tableName,
        Key: {
            tenantName: tenant,
            language: languag,
        },
        UpdateExpression: "SET #attrName = list_append(#attrName, :attrValue)",
        ExpressionAttributeNames: {
            "#attrName": "texts"
        },
        ExpressionAttributeValues: {
            ":attrValue": [newtext]
        },
        ReturnValues: "UPDATED_NEW"
    };
    ddbDocClient.send(new UpdateCommand(params));
}
const dbgetText = async (tenant: string, language: string) => {
    console.log({ 
            tenantName:tenant,
            language:language,
        },);
    const params: GetCommandInput = {
        TableName: environment.dynamo.textTable.tableName,
        Key: { 
            tenantName:tenant,
            language:language,
        },
      };
      try {
        const data = await ddbDocClient.send(new GetCommand(params));
        console.log("Success - GET", data);
        if (!data.Item) return { texts: [] };
        return data.Item;
      } catch (err) {
        console.log("Error", err.stack);
        throw { err, tenant };
      }
}
const dbcreateUser = async (userData: UserData) => {
    // Set the parameters.
    const params = {
        TableName: environment.dynamo.userData.tableName,
        Item: userData,
    };
    try {
        const data = await ddbDocClient.send(new PutCommand(params));
        console.log("Success - item added or updated", data);
    } catch (err) {
        console.log("Error", err.stack);
        throw err;
    }
};

const dbgetUsers = async () => {
    // Set the parameters.
    const params: ScanCommandInput = {
        TableName: environment.dynamo.userData.tableName,
    };
    try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        console.log("Success - GET", data);
        return data.Items.sort((a, b) => a.username - b.username);
    } catch (err) {
        console.log("Error", err.stack);
        throw { err };
    }
};
export {
    dbputTenant,
    dbgetTenants,
    dbdeleteTenants,
    dbcreateUser,
    dbgetUsers,
    dbputoriginalText,
    dbgetText,
};
