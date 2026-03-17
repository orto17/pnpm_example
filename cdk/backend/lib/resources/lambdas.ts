import { IRole } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

import { IConfig } from '../config-type';
import { IFunctions, INetwork } from '../types';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';

export const createLambdas = (scope: Construct, config: IConfig, network: INetwork, role: IRole): IFunctions => {
    const { appName, env, lambdas } = config;
    const { securityGroups, vpc } = network;
    const enableDynatrace = env == 'prod';

    const defaultConfig = {
        enableDynatrace,
        role,
        securityGroups,
        vpc,
    };

    const helloDynamo = new Function(scope, 'HelloDynamo', 
        {
            ...defaultConfig,
            code: Code.fromAsset('../../lambdas/HelloDynamo'),
            handler: 'index.handler',
            runtime: Runtime.NODEJS_22_X,
            environment: lambdas.HelloDynamo.environment,
            functionName: `${env}-${appName}-HelloDynamo`,
        }
    )

    return {
        helloDynamo,
    };
};
