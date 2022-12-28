import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { dbeditText, dbputOriginalText } from 'src/services/dynamodbTexts';
import { Text } from 'src/types/Text';

import schema from './schema';

const editText: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
      const text:Text=event.body;
      const tenant=event.pathParameters.tenant;
      const language=event.pathParameters.language;
      const val=await dbeditText(tenant,language,text);
      return formatJSONResponse({message:val});
    } catch (error) {
      return formatJSONResponse(
        {
          error,
        }
      );
    }
  
};

export const main = middyfy(editText);
