import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { dbgetText } from 'src/services/dynamodb';
import schema from './schema';

const getText: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  //TODO rimuovere il valore dal database e ritornare un valore booleano.
  /*
    try(await db.deleteTenant(event.body.name)){
      ritorna successo.
    }catch(eroor e){
      ritorna errore.
    }
  */
    try {
      const tenant = event.pathParameters.tenant as string;
      const language = event.pathParameters.language as string;
      const data = await dbgetText(tenant,language);
      return formatJSONResponse(data);
    } catch (error) {
      return formatJSONResponse(
        {
          error,
        }
      );
    }
  
};

export const main = middyfy(getText);
