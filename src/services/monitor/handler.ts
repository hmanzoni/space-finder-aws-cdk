import { SNSEvent } from 'aws-lambda';

const webHookUrl = 'TOKEN_FROM_YOUR_WEB_HOOK';

async function handler(event: SNSEvent): Promise<void> {
  for (const record of event.Records) {
    await fetch(webHookUrl, {
      method: 'POST',
      body: JSON.stringify({ text: record }),
    });
  }
}

export { handler };
