import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { validateAsSpaceEntry } from '../shared/Validator';
import { createRandomId, parseJSON } from '../shared/Utils';

async function postSpaces(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
  const randomId = createRandomId();
  const item = parseJSON(event.body);
  item.id = randomId;
  validateAsSpaceEntry(item);

  const result = await ddbDocClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      // Item: { id: { S: randomId }, location: { S: item.location } },
      Item: item,
    })
  );
  console.log(result);

  return {
    statusCode: 201,
    body: JSON.stringify({ id: randomId }),
  };
}

export { postSpaces };
