import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { dbputoriginalText } from 'src/services/dynamodb';
import { Text } from 'src/types/Text';

import schema from './schema';

const insertText: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  //TODO rimuovere il valore dal database e ritornare un valore booleano.
  /*
    try(await db.deleteTenant(event.body.name)){
      ritorna successo.
    }catch(eroor e){
      ritorna errore.
    }
  */
    try {
      await dbputoriginalText(event.pathParameters.tenant,event.pathParameters.language,event.body);
      return formatJSONResponse({message:"testo inserito con successo"});
    } catch (error) {
      return formatJSONResponse(
        {
          error,
        }
      );
    }
  
};

export const main = middyfy(insertText);
