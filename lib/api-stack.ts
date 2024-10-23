import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Crear la Lambda utilizando Node.js 20
    const helloLambda = new lambda.Function(this, 'HelloWorldLambda', {
      runtime: lambda.Runtime.NODEJS_20_X, // Node.js 20
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          const response = {
            message: "Hello World",
            timestamp: new Date().toISOString()
          };
          
          return {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(response)
          };
        };
      `),
    });

    // Crear una API Gateway que exponga la Lambda
    new apigateway.LambdaRestApi(this, 'HelloWorldApi', {
      handler: helloLambda,
    });
  }
}
