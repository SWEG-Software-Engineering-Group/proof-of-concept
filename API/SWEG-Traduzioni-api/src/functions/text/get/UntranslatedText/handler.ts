import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { dbgetTextuntranslated } from 'src/services/dynamodbTexts';
import schema from './schema';

const getTextuntranslated: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
      const tenant = event.pathParameters.tenant as string;
      const language = event.pathParameters.language as string;
      const texts = await dbgetTextuntranslated(tenant,language);
      return formatJSONResponse({texts});
    } catch (error) {
      return formatJSONResponse(
        {
          error,
        }
      );
    }
  
};

export const main = middyfy(getTextuntranslated);
