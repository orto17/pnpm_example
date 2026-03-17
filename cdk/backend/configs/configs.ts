import { IConfig } from '../lib/config-type';
import { ILambdas, ISampleBeConfig, ITags, TEnvironmentCommons } from '../lib/types';

export const parseConfigs = (configs: IConfig): ISampleBeConfig => {
    const { appName, env } = configs;

    const environmentCommons: TEnvironmentCommons = {
        ENV_PREFIX: env,
        LOG_LEVEL: 'debug',
    };

    const commonTags: ITags = {
        env: env,
        github: appName,
        project: 'sample-backend',
    };

    const envVar: Pick<ISampleBeConfig, 'dynamodb'> = {
        dynamodb: {
            tableName: `${env}-${appName}-eyw`,
            url: 'http://${env}-${appName}.example.com',
        },
    };

    const lambdaConfigs: ILambdas = {
        HelloDynamo: {
            environment: {
                ...environmentCommons,
                DYNAMODB_URL: envVar.dynamodb.url,
                TABLE_NAME: envVar.dynamodb.tableName,
            },
            tags: commonTags,
        },
    };

    return {
        ...configs,
        ...envVar,
        lambdas: lambdaConfigs,
    };
};
