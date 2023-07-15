import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { postSpaces } from './PostSpaces';

const ddbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message: string;
  try {
    switch (event.httpMethod) {
      case 'GET':
        message = 'Hello from GET';
        break;
      case 'POST':
        const resp = postSpaces(event, ddbClient);
        return resp;

      default:
        break;
    }
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
  const resp: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };
  // console.log(event);
  return resp;
}

export { handler };
