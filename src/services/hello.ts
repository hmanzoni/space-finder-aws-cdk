import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({});

async function hanblder(event: APIGatewayProxyEvent, context: Context) {
  const command = new ListBucketsCommand({});
  const listBucketsResult = (await s3Client.send(command)).Buckets;

  const resp: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(
      `Hello! I will read from Dynamo Table > ${
        process.env.TABLE_NAME
      } ! :D, my S3 Buckets are ${JSON.stringify(listBucketsResult)}`
    ),
  };
  console.log(event);
  return resp;
}

export { hanblder };
