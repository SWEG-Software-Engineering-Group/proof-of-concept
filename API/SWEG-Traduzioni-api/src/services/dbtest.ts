import { GetCommand, GetCommandInput, PutCommand } from "@aws-sdk/lib-dynamodb";
import { environment } from "..//environement/environement";
import { Tenant } from "../types/Tenant";
import { ddbDocClient } from "./dbConnection";



async function newTenant(tenant: Tenant) {
    const tenantparams = {
        TableName: environment.dynamo.tenantTable.tableName,
        Item: tenant,
    };
    console.log(tenantparams);

    try {
        await ddbDocClient.send(new PutCommand(tenantparams));
    } catch (err) {
        throw err;
    }
    return "hello world";
}
const getTenant = async (tenant: string) => {
    // Set the parameters.
    const params: GetCommandInput = {
        TableName: environment.dynamo.tenantTable.tableName,
        Key: { name: tenant },
    };
    try {
        const tenant = await ddbDocClient.send(new GetCommand(params));
        return tenant.Item as Tenant;
    } catch (err) {
        console.log("Error", err.stack);
        throw { err };
    }
};
export { newTenant, getTenant };