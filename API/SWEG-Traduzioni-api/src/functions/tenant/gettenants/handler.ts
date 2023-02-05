import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {dbgetTenants} from 'src/services/dynamodb';

import schema from './schema';

const getTenant: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  //TODO una volta implementato il database eseguire la query che riceve i nomi e ritornatli;
  //let tenants = await dbgetTenants();
  let tenants=await dbgetTenants();
  return formatJSONResponse(tenants);
};

export const main = middyfy(getTenant);
