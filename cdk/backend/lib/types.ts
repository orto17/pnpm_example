import { ISecurityGroup, IVpc } from 'aws-cdk-lib/aws-ec2';
import { IFunction } from 'aws-cdk-lib/aws-lambda';

export interface ISampleBeConfig {
    appName: string;
    env: string;
    region: string;
    appAccount: string;
    sharedAccount: string;
    dynamodb: {
        tableName: string;
        url: string;
    };
    lambdas: ILambdas;
    securityGroups: {
        management: string;
    };
}

/**
 * Network configuration interface.
 */
export interface INetwork {
    securityGroups: ISecurityGroup[];
    vpc: IVpc;
}

/**
 * Configuration interface for Lambda functions.
 */
export interface ILambdas {
    HelloDynamo: IHelloDynamo;
}

/**
 * Interface for Lambda functions.
 */
export interface IFunctions {
    helloDynamo: IFunction;
}

/**
 * Common environment properties.
 */
export type TEnvironmentCommons = {
    ENV_PREFIX: string;
    LOG_LEVEL: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';
};

/**
 * Tags interface for Lambda functions.
 */
export interface ITags {
    github: string;
    env: string;
    project: string;
}

export interface IHelloDynamo {
    environment: {
        DYNAMODB_URL: string;
        TABLE_NAME: string;
    } & TEnvironmentCommons;
    tags: ITags;
}
