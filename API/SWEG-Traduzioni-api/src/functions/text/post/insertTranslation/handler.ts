import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { dbputText } from 'src/services/dynamodbTexts';
import { Text } from 'src/types/Text';

import schema from './schema';

const insertText: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
      const tenant = event.pathParameters.tenant as string;
      const lang = event.pathParameters.language as string;
      const message=await dbputText(tenant,event.body,lang);
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
