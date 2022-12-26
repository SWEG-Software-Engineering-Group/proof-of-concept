import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {dbgetUsers } from 'src/services/dynamodbUsers';

import schema from './schema';

const currentUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event,context) => {
  //prova a metterlo nel database
  // se successo ritorna ok altrimenti ritorna errore.
  //aggiunge il tenant al database
  try {
    const username = event.requestContext.authorizer.claims.sub;
    const user = await dbgetUsers(username);
    return JSON.stringify(user);
    let users=await dbgetUsers();
  return formatJSONResponse({users});
  } catch (e) {
    return formatJSONResponse(
      {
        error: e,
        statusCode:500
      }
    );
  }

};

export const main = middyfy(currentUser);
