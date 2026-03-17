#!/usr/bin/env node

import { App } from 'aws-cdk-lib';

import { AppStack } from '../lib/app-stack';
import { IConfig } from '../lib/config-type';
import { readFileSync } from 'fs';

const app = new App();

const appConfig1: IConfig = JSON.parse(readFileSync('./configs/config.json', 'utf-8'));
const appConfig2: IConfig = JSON.parse(readFileSync('./configs/config_dev-us-east-1.json', 'utf-8'));

const appConfig = {
    ...appConfig1,
    ...appConfig2,
};

const { appAccount, appName, env, region } = appConfig;
const envAppName = `${env}-${appName}-appstack`;

new AppStack(app, envAppName, appConfig, {
    env: { account: appAccount, region: region },
    stackName: envAppName,
});

app.synth();
