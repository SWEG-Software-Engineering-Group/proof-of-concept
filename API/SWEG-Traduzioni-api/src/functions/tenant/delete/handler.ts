import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { dbdeleteTenants } from 'src/services/dynamodb';

import schema from './schema';

const deleteTenant: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  //TODO rimuovere il valore dal database e ritornare un valore booleano.
  /*
    try(await db.deleteTenant(event.body.name)){
      ritorna successo.
    }catch(eroor e){
      ritorna errore.
    }
  */
    try {
      await dbdeleteTenants(event.body.name);
      return formatJSONResponse({});
    } catch (error) {
      return formatJSONResponse(
        {
          error,
        }
      );
    }
  
};

export const main = middyfy(deleteTenant);
