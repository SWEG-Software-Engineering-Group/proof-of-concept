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
import { Tenant } from "src/types/Tenant";

import { languageText } from "src/types/Text";
const dbputTenant = async (tenant: Tenant) => {
    if ((await dbgetTenants()).tenants.findIndex(element => { return element.name == tenant.name; }) != -1) {
        return "questo nome esiste gia";
    }
    const tenantparams = {
        TableName: environment.dynamo.tenantTable.tableName,
        Item: tenant,
    };
    try {
        const data = await ddbDocClient.send(new PutCommand(tenantparams));
        await addlangs(tenant.languages, tenant);
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
const dbgetTenantinfo = async (tenant: string) => {
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
const dbdeleteTenants = async (tenant: string) => {
    const tenantdata = await dbgetTenantinfo(tenant);
    // Set the parameters.
    const params: GetCommandInput = {
        TableName: environment.dynamo.tenantTable.tableName,
        Key: { name: tenant },
    };
    try {
        await removelangs(tenantdata.languages, tenantdata);
        const data = await ddbDocClient.send(new DeleteCommand(params));
        console.log("Success - GET", data);
    } catch (err) {
        console.log("Error", err.stack);
        throw { err, tenant };
    }
};
const dbupdateTenant = async (tenant: Tenant) => {
    let oldTenant = await dbgetTenantinfo(tenant.name);
    //control if new name already exists
    if (oldTenant == undefined) {
        return { error: "questo tenant non esitse" };
    }
    //get the values of the old tenant

    //add the new languages]
    let langstoadd = tenant.languages.filter((element) => { return !oldTenant.languages.includes(element) });
    await addlangs(langstoadd, tenant);
    //remove the old languages
    let langstodelete = oldTenant.languages.filter((element) => { return !tenant.languages.includes(element) });
    await removelangs(langstodelete, oldTenant);
    //false on old main language
    try {
        const params = {
            TableName: environment.dynamo.textTable.tableName,
            Key: {
                tenantName: oldTenant.name,
                language:oldTenant.mainlang
            },
            UpdateExpression: "SET #original = :mainlang",
            ExpressionAttributeNames: {
                "#original": "original",
            },
            ExpressionAttributeValues: {
                ":mainlang": false,
            },
            ReturnValues: "UPDATED_NEW"
        };
        await ddbDocClient.send(new UpdateCommand(params));
    } catch (error) {
        return { "error": error };
    }
    //true on new main language
    try {
        const params = {
            TableName: environment.dynamo.textTable.tableName,
            Key: {
                tenantName: tenant.name,
                language:tenant.mainlang
            },
            UpdateExpression: "SET #original = :mainlang",
            ExpressionAttributeNames: {
                "#original": "original",
            },
            ExpressionAttributeValues: {
                ":mainlang": true,
            },
            ReturnValues: "UPDATED_NEW"
        };
        await ddbDocClient.send(new UpdateCommand(params));
    } catch (error) {
        return { "error": error };
    }
    //update tenant table
    
    try {
        const params = {
            TableName: environment.dynamo.tenantTable.tableName,
            Key: {
                name: oldTenant.name
            },
            UpdateExpression: "SET #mainlang = :mainlang,#languages = :languages,#users = :users",
            ExpressionAttributeNames: {
                "#mainlang": "mainlang",
                "#languages": "languages",
                "#users": "users",
            },
            ExpressionAttributeValues: {
                ":mainlang": tenant.mainlang,
                ":languages": tenant.languages,
                ":users": tenant.users,
            },
            ReturnValues: "UPDATED_NEW"
        };
        await ddbDocClient.send(new UpdateCommand(params));
        return "tenant updated";
    } catch (error) {
        return { "error": error };
    }
};
const addlangs = async (langs: Array<String>, tenant: Tenant) => {
    await langs.forEach(element => {
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
}
const removelangs = async (langs: Array<String>, tenant: Tenant) => {
    await langs.forEach(async element => {
        const params: GetCommandInput = {
            TableName: environment.dynamo.textTable.tableName,
            Key: {
                tenantName: tenant.name,
                language: element
            },
        };
        try {
            const data = await ddbDocClient.send(new DeleteCommand(params));
            console.log("Success - GET", data);
        } catch (err) {
            console.log("Error", err.stack);
            throw { err, tenant };
        }
    });
}
const renamelangs = async (langs: Array<String>, oldTenant: Tenant, newtenant: Tenant) => {
    await langs.forEach(async element => {
        const params = {
            TableName: environment.dynamo.textTable.tableName,
            Key: {
                tenantName: oldTenant.name,
                language: element,
            },
            UpdateExpression: "SET #attrName = :attrValue",
            ExpressionAttributeNames: {
                "#attrName": "tenantName"
            },
            ExpressionAttributeValues: {
                ":attrValue": newtenant.name
            },
            ReturnValues: "UPDATED_NEW"
        };
        ddbDocClient.send(new UpdateCommand(params));
    });
}
export {
    dbputTenant,
    dbgetTenants,
    dbdeleteTenants,
    dbgetTenantinfo,
    dbupdateTenant
};
