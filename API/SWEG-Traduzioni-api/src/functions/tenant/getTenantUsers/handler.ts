import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {dbgetTenantinfo, dbgetTenants} from 'src/services/dynamodb';
import { Tenant } from 'src/types/Tenant';

import schema from './schema';

const getTenant: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let tenant:Tenant=await dbgetTenantinfo(event.pathParameters.tenantname);
  return formatJSONResponse({"users":tenant.users});
};

export const main = middyfy(getTenant);
