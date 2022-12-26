import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { dbputOriginalText, dbputtranslateText } from 'src/services/dynamodbTexts';
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
      const tenant = event.pathParameters.tenant as string;
      const lang = event.pathParameters.language as string;
      const message=await dbputtranslateText(tenant,lang,event.body);
      return formatJSONResponse({message:message});
    } catch (error) {
      return formatJSONResponse(
        {
          error,
        }
      );
    }
  
};

export const main = middyfy(insertText);
