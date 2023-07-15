import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { postSpaces } from './PostSpaces';
import { getSpaces } from './GetSpaces';

const ddbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message: string;
  try {
    switch (event.httpMethod) {
      case 'GET':
        const getResp = getSpaces(event, ddbClient);
        return getResp;

      case 'POST':
        const postResp = postSpaces(event, ddbClient);
        return postResp;

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
