import { handler } from '../src/services/spaces/handler';

const reqPost = {
  httpMethod: 'POST',
  body: JSON.stringify({ location: 'Roma', name: 'Test' }),
};
const reqGetId = {
  httpMethod: 'GET',
  queryStringParameters: { id: '87b2f2eb-c03b-44f2-8224-9b82cfd44d8c' },
};
const reqGetScan = {
  httpMethod: 'GET',
};
const reqPut = {
  httpMethod: 'PUT',
  queryStringParameters: { id: '87b2f2eb-c03b-44f2-8224-9b82cfd44d8c' },
  body: JSON.stringify({ location: 'Dublin2' }),
};
const reqDel = {
  httpMethod: 'DELETE',
  queryStringParameters: { id: '87b2f2eb-c03b-44f2-8224-9b82cfd44d8c' },
};

handler(reqPost as any, {} as any);
