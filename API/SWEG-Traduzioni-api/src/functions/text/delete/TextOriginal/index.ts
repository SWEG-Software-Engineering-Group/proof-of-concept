import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'delete',
        path: '{tenant}/{key}/{group}/removeText',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
