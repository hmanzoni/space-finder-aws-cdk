import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

interface LambdaProps extends StackProps {
  spacesTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly helloLambdaIntegration: LambdaIntegration;
  constructor(scope: Construct, id: string, props: LambdaProps) {
    super(scope, id, props);

    const helloLambda = new NodejsFunction(this, 'HelloLambda', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'hello',
      entry: join(__dirname, '..', '..', 'services', 'hello.ts'),
      environment: {
        TABLE_NAME: props.spacesTable.tableName,
      },
    });
    const policyAllowS3Interaction = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['s3:ListAllMyBuckets', 's3:ListBucket'],
      resources: ['*'],
    });
    helloLambda.addToRolePolicy(policyAllowS3Interaction);
    this.helloLambdaIntegration = new LambdaIntegration(helloLambda);
  }
}
