import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { dbgetAllTexts, dbgetText } from 'src/services/dynamodbTexts';
import schema from './schema';

const getText: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
      const tenant = event.pathParameters.tenant as string;
      const data = await dbgetAllTexts(tenant);
      return formatJSONResponse({data});
    } catch (error) {
      return formatJSONResponse(
        {
          error,
        }
      );
    }
  
};

export const main = middyfy(getText);
