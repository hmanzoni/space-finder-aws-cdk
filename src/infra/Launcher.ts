import { App } from 'aws-cdk-lib';
import { DataStack } from './stacks/DataStack';
import { LambdaStack } from './stacks/LambdaStack';
import { ApiStack } from './stacks/ApiStack';
import { AuthStack } from './stacks/AuthStack';
import { MonitorStack } from './stacks/MonitorStack';

const app = new App();
const dataStack = new DataStack(app, 'DataStack');
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
  spacesTable: dataStack.spaceTalbe,
});
const authStack = new AuthStack(app, 'AuthStack');
new ApiStack(app, 'ApiStack', {
  lambdaIntegration: lambdaStack.lambdaIntegration,
  userPool: authStack.userPool,
});
new MonitorStack(app, 'MonitorStack');
