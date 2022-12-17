import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const createTenant: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  //prova a metterlo nel database
  // se successo ritorna ok altrimenti ritorna errore.
  /*
    try(await db.createTenant(event.body.name)){
      db.addmainLang(event.body.name,event.body.mainlang);
      ritorna successo.
    }catch(eroor e){
      ritorna errore.
    }
  */
  return formatJSONResponse({
    message: `tenant ${event.body.name}, creato con successo`
  });
};

export const main = middyfy(createTenant);
