import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {dbcreateUser } from 'src/services/dynamodbUsers';

import schema from './schema';

const newUser: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  //prova a metterlo nel database
  // se successo ritorna ok altrimenti ritorna errore.
  //aggiunge il tenant al database
  try {
    await dbcreateUser(event.body);
  } catch (e) {
    return formatJSONResponse(
      {
        error: e,
        statusCode:500
      }
    );
  }

};

export const main = middyfy(newUser);
