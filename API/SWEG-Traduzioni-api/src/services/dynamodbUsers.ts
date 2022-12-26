import {
    DeleteCommand,
    GetCommand,
    GetCommandInput,
    PutCommand,
    ScanCommand,
    ScanCommandInput,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { environment } from "src/environement/environement";
import { UserData } from "src/types/UserData";
import { ddbDocClient } from "./dbConnection";

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
    dbcreateUser,
    dbgetUsers,
};