import {
    DeleteCommand,
    GetCommand,
    GetCommandInput,
    PutCommand,
    ScanCommand,
    ScanCommandInput,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import {ddbDocClient} from "./dbConnection"
import { environment } from "src/environement/environement";
import { Tenant } from "src/types/Tenant";

import { languageText, Text } from "src/types/Text";
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
const dbgetTenantinfo = async (tenant:string) => {
    // Set the parameters.
    const params: GetCommandInput = {
        TableName: environment.dynamo.tenantTable.tableName,
        Key: { name: tenant },
    };
    try {
        const tenant = await ddbDocClient.send(new GetCommand(params));

        console.log("Success - GET", tenant);
        return tenant.Item as Tenant;
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


export {
    dbputTenant,
    dbgetTenants,
    dbdeleteTenants,
    dbgetTenantinfo
};
