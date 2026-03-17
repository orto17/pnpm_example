import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

import { INetwork, ISampleBeConfig } from '../types';

export const getVpc = (scope: Construct, config: ISampleBeConfig): INetwork => {
    const {
        appName,
        env,
        region,
        securityGroups: { management },
    } = config;

    const managementSG = SecurityGroup.fromSecurityGroupId(scope, 'Management', management);

    const vpc = Vpc.fromLookup(scope, 'VPC', {
        vpcName: `${env}-${appName}-vpc`,
        region,
    });
    

    return {
        securityGroups: [managementSG],
        vpc,
    };
};
