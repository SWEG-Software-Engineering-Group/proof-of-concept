import {
    DeleteCommand,
    GetCommand,
    GetCommandInput,
    PutCommand,
    ScanCommand,
    ScanCommandInput,
    UpdateCommand,
    UpdateCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "./dbConnection"
import { environment } from "src/environement/environement";
import { languageText, Text } from "src/types/Text";
import { dbgetTenantinfo } from "./dynamodb";
import editText from "@functions/text/put/editText";
const dbputText = async (tenant: string, newtext: Text, language: string = "") => {
    const texts = await dbgetText(tenant);
    if (texts.texts.filter((value) => {
        return value.key == newtext.key && value.group == newtext.group;
    }).length > 0) {
        return "errore coppia chiave gruppo gia presente";
    }
    const tenantdata = await dbgetTenantinfo(tenant);
    const params: UpdateCommandInput = {
        TableName: environment.dynamo.textTable.tableName,
        Key: {
            tenantName: tenant,
            language: (language == "") ? tenantdata.mainlang : language,
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
    try {
        ddbDocClient.send(new UpdateCommand(params));
        return "testo inserito con successo";
    } catch (e) {
        return { error: "testo inserito con successo" };
    }

}
/*const dbputtranslateText = async (tenant: string, language: string, newtext: Text) => {
    const traslatedtext = await dbgetText(tenant, language);
    if (traslatedtext.texts.filter((value) => {
        return value.key == newtext.key && value.group == newtext.group;
    }).length > 0) {
        return "errore traduzione gia presente";
    }
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
    return "testo inserito con successo";
}*/
const dbgetText = async (tenant: string, language: string = "") => {
    var params: ScanCommandInput = { TableName: environment.dynamo.textTable.tableName, };
    if (language == "") {
        params = {
            TableName: environment.dynamo.textTable.tableName,
            FilterExpression: "#original = :original AND #tenantName = :tenantName",
            ExpressionAttributeNames: { "#original": "original", "#tenantName": "tenantName" },
            ExpressionAttributeValues: {
                ':original': true,
                ':tenantName': tenant
            }
        };
    } else {
        params = {
            TableName: environment.dynamo.textTable.tableName,
            FilterExpression: "#language = :language AND #tenantName = :tenantName",
            ExpressionAttributeNames: { "#language": "language", "#tenantName": "tenantName" },
            ExpressionAttributeValues: {
                ':language': language,
                ':tenantName': tenant
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
    const params: GetCommandInput = {
        TableName: environment.dynamo.textTable.tableName,
        Key: {
            'tenantName': tenant,
            'language': language,
        }
    };
    try {
        const text = await dbgetText(tenant);
        const data = await ddbDocClient.send(new GetCommand(params));
        const translatedtexts = data.Item as languageText;
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
const dbgetAllTexts = async (tenant: string) => {
    const params: ScanCommandInput = {
        TableName: environment.dynamo.textTable.tableName,
        FilterExpression: " #tenantName = :tenantName",
        ExpressionAttributeNames: { "#tenantName": "tenantName" },
        ExpressionAttributeValues: {
            ':tenantName': tenant
        }
    };
    try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        console.log("Success - GET", data);
        if (!data.Items) return { texts: [] };
        return data.Items;
    } catch (error) {
        return { "error": error };
    }
}
const dbdeletetranslation = async (tenant: string, keyval: string, groupval: string, language: string = "") => {
    let tenantinfo = await dbgetTenantinfo(tenant)
    if (language == "") {
        tenantinfo.languages.forEach(async lang => {
            const textsuntranslated = await dbgetText(tenant, lang);
            const position = textsuntranslated.texts.findIndex(element => { return element.key == keyval && element.group == groupval });
            const params: UpdateCommandInput = {
                TableName: environment.dynamo.textTable.tableName,
                Key: {
                    tenantName: tenant,
                    language: lang,
                },
                UpdateExpression: "REMOVE #attrName[" + position + "]",
                ExpressionAttributeNames: {
                    "#attrName": "texts"
                },
                ReturnValues: "ALL_NEW"
            };
            try {
                await ddbDocClient.send(new UpdateCommand(params));
            } catch (error) {
                return { "error": error }
            }
        });
        return "testo " + keyval + " " + groupval + " cancellato con successo in tutte le lingue";
    } else {
        const textsuntranslated = await dbgetText(tenant, language);
        const position = textsuntranslated.texts.findIndex(element => { return element.key == keyval && element.group == groupval });
        const params: UpdateCommandInput = {
            TableName: environment.dynamo.textTable.tableName,
            Key: {
                tenantName: tenant,
                language: language,
            },
            UpdateExpression: "REMOVE #attrName[" + position + "]",
            ExpressionAttributeNames: {
                "#attrName": "texts"
            },
            ReturnValues: "ALL_NEW"
        };
        try {
            await ddbDocClient.send(new UpdateCommand(params));
            return "testo " + keyval + " " + groupval + " cancellato con successo nella lingua " + language;
        } catch (error) {
            return { "error": error }
        }
    }
}
const dbeditText = async (tenant: string, language: string, eidtedText: Text) => {
    try {
        await dbdeletetranslation(tenant, eidtedText.key, eidtedText.group, language);
        await dbputText(tenant, eidtedText, language);
        return "testo aggiornato";
    } catch (error) {
        return {error:error};
    }
}
export {
    dbputText,
    dbgetText,
    dbgetTextuntranslated,
    dbgetAllTexts,
    dbdeletetranslation,
    dbeditText
}