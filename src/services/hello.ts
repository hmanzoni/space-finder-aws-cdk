import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

async function hanblder(event: APIGatewayProxyEvent, context: Context) {
  const resp: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(
      `Hello! I will read from Dynamo Table > ${process.env.TABLE_NAME} ! :D`
    ),
  };
  console.log(event);
  return resp;
}

export { hanblder };
