import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';

import { mockClient } from 'aws-sdk-client-mock';

import { handler } from '../src/index';

const mockDynamo = mockClient(DynamoDBClient);

const createLambdaEvent = (): any => ({
    body: '',
    headers: {},
    httpMethod: 'GET',
    isBase64Encoded: false,
    multiValueHeaders: {},
    multiValueQueryStringParameters: {},
    path: '/',
    pathParameters: null,
    queryStringParameters: {},
    requestContext: null,
    resource: '',
    stageVariables: null,
});

describe('HelloDynamoHandler test', () => {
    it('should return a response', async () => {
        const scanResponse: any = {
            Items: [
                {
                    branch: '7a0ad7a8efee2d0662188c44df5a356d94ca14ad',
                    codeBuild: null,
                    id: '9a040aa0-b5c2-4a31-9b13-5f2b089a1d33',
                    levelAchieved: 'godmode',
                    project: 'sample-frontend-eyw',
                    pullRequest: null,
                    results: {
                        rules: [
                            {
                                description: 'Commit message standards are present.',
                                exitCode: 0,
                                level: '1',
                                ruleId: '2',
                                ruleName: 'commit_standards_present.rule',
                            },
                            {
                                description: 'A linter is present.',
                                exitCode: 0,
                                level: '1',
                                ruleId: '4',
                                ruleName: 'linter_present.rule',
                            },
                            {
                                description: 'The repository is in the sharedprod environment.',
                                exitCode: 0,
                                level: '1',
                                ruleId: '6',
                                ruleName: 'repo_in_sharedprod.rule',
                            },
                            {
                                description: 'The repository is onboarded to SonarQube.',
                                exitCode: 0,
                                level: '1',
                                ruleId: '7',
                                ruleName: 'repo_onboarded_to_sonarqube.rule',
                            },
                            {
                                description: 'Standardized logging is in place.',
                                exitCode: 0,
                                level: '1',
                                ruleId: '8',
                                ruleName: 'standardized_logging.rule',
                            },
                            {
                                description: 'Unit tests are running via the pipeline.',
                                exitCode: 0,
                                level: '1',
                                ruleId: '9',
                                ruleName: 'unit_test_via_pipeline.rule',
                            },
                            {
                                description: 'Code is deployed via a pipeline.',
                                exitCode: 0,
                                level: '1',
                                ruleId: '3',
                                ruleName: 'deployed_via_pipeline.rule',
                            },
                            {
                                description: 'The API is documented.',
                                exitCode: 0,
                                level: '1',
                                ruleId: '1',
                                ruleName: 'api_documented.rule',
                            },
                            {
                                description: 'A pre-commit hook is present.',
                                exitCode: 0,
                                level: '1',
                                ruleId: '5',
                                ruleName: 'pre_commit_hook_present.rule',
                            },
                        ],
                    },
                    sourceReference: {
                        type: 'commitId',
                        value: '3c5ad7a8efee2d0662188c44df5a356d94ca14df',
                    },
                    status: 0,
                    timestamp: '2022-02-08T21:22:46.000Z',
                },
            ],
        };

        mockDynamo.on(ScanCommand).resolves(scanResponse);

        const response = await handler(createLambdaEvent());
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)[0].status).toBe(0);
    });

    it('should fail with HTTP Status 500', async () => {
        mockDynamo.on(ScanCommand).rejects(new Error('Dummy scan error'));

        const response = await handler(createLambdaEvent());
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
    });
});
