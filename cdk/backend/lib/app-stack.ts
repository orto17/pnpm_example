import { Stack, StackProps } from 'aws-cdk-lib';
import { Role } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

import { parseConfigs } from '../configs/configs';

import { createLambdas } from './resources/lambdas';
import { getVpc } from './resources/vpc';
import { IConfig } from './config-type';

export class AppStack extends Stack {
    constructor(scope: Construct, id: string, config: IConfig, props?: StackProps) {
        super(scope, id, props);

        config = parseConfigs(config);

        const { appName, env } = config;

        // ###########################################
        // ### Roles & Permissions
        // ###########################################
        const commonRole = Role.fromRoleName(this, 'Common', `${env}-${appName}-Common`);

        // ###########################################
        // ### VPC
        // ###########################################

        const network = getVpc(this, config);

        // ###########################################
        // ### Lambdas
        // ###########################################
        createLambdas(this, config, network, commonRole);
    }
}
