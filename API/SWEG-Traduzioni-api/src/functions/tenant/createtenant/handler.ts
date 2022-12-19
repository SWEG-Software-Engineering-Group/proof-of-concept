import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {dbputTenant } from 'src/services/dynamodb';

import schema from './schema';

const createTenant: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  //prova a metterlo nel database
  // se successo ritorna ok altrimenti ritorna errore.
  //aggiunge il tenant al database
  try {
    await dbputTenant(event.body);
  } catch (e) {
    return formatJSONResponse(
      {
        error: e,
        statusCode:500
      }
    );
  }

};

export const main = middyfy(createTenant);
