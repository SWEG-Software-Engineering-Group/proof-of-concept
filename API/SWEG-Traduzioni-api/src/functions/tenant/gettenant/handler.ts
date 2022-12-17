import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const getTenant: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  //TODO una volta implementato il database eseguire la query che riceve i nomi e ritornatli
  const tenants=["tenant1","tenant2","tenant3"];
  return formatJSONResponse({tenants});
};

export const main = middyfy(getTenant);
