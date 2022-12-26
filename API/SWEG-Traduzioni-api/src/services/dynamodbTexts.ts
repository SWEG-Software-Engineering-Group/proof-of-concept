import {
    DeleteCommand,
    GetCommand,
    GetCommandInput,
    PutCommand,
    ScanCommand,
    ScanCommandInput,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "./dbConnection"
import { environment } from "src/environement/environement";
import { languageText, Text } from "src/types/Text";
import { dbgetTenantinfo } from "./dynamodb";
const dbputOriginalText = async (tenant: string, newtext: Text) => {
    const tenantdata = await dbgetTenantinfo(tenant);
    const params = {
        TableName: environment.dynamo.textTable.tableName,
        Key: {
            tenantName: tenant,
            language: tenantdata.mainlang,
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
const dbputtranslateText = async (tenant: string, language: string, newtext: Text) => {
    const params = {
        TableName: environment.dynamo.textTable.tableName,
        Key: {
            tenantName: tenant,
            language: language,
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
const dbgetText = async (tenant: string, language: string = "") => {
    var params: ScanCommandInput = { TableName: environment.dynamo.textTable.tableName, };
    if (language == "") {
        params = {
            TableName: environment.dynamo.textTable.tableName,
            FilterExpression: "#original = :original",
            ExpressionAttributeNames: { "#original": "original" },
            ExpressionAttributeValues: {
                ':original': true,
            }
        };
    } else {
        params = {
            TableName: environment.dynamo.textTable.tableName,
            FilterExpression: "#language = :language",
            ExpressionAttributeNames: { "#language": "language" },
            ExpressionAttributeValues: {
                ':language': language,
            }
        };
    }

    try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        console.log("Success - GET", data);
        if (!data.Items) return { texts: [] };
        return data.Items.pop() as languageText;
    } catch (err) {
        console.log("Error", err.stack);
        throw { err, tenant };
    }
}
const dbgetTextuntranslated = async (tenant: string, language: string) => {
    const params: ScanCommandInput = {
        TableName: environment.dynamo.textTable.tableName,
        FilterExpression: "#tenant = :tenant AND #language = :language",
        ExpressionAttributeNames: { "#tenant": "tenantName", "#language": "language" },
        ExpressionAttributeValues: {
            ':tenant': tenant,
            ':language': language,
        }
    };
    try {
        const text = await dbgetText(tenant);
        const data = await ddbDocClient.send(new ScanCommand(params));
        const translatedtexts = data.Items.pop() as languageText;
        const containedkeys = translatedtexts.texts.map((text) => { return text.key });
        //questo dovrebbe filtrare tutti i testi originali non tradottin in una certa lingua
        const filtered = text.texts.filter(value => {
            return !containedkeys.includes(value.key, 0);
        });
        console.log("Success - GET", data);
        if (!text.texts) return { texts: [] };
        return filtered;
    } catch (err) {
        console.log("Error", err.stack);
        throw { err, tenant };
    }
}
export {
    dbputtranslateText,
    dbgetText,
    dbgetTextuntranslated,
    dbputOriginalText
}