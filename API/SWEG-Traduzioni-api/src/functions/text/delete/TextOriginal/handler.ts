import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { dbdeletetranslation } from 'src/services/dynamodbTexts';
import schema from './schema';

const deleteTextOriginal: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
      const tenant = event.pathParameters.tenant as string;
      const key = event.pathParameters.key as string;
      const group = event.pathParameters.group as string;
      const data = await dbdeletetranslation(tenant,key,group);
      return formatJSONResponse({data});
    } catch (error) {
      return formatJSONResponse(
        {
          error,
        }
      );
    }
  
};

export const main = middyfy(deleteTextOriginal);
