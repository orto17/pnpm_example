import { DynamoDBClient, ScanCommand, ScanOutput } from '@aws-sdk/client-dynamodb';

import { EYWResult, IEYWResult, IRule, Status } from './IModels';

const DYNAMODB_URL = process.env.DYNAMODB_URL || 'http://localhost:4566';
const TABLE_NAME = process.env.TABLE_NAME || 'eyw-results';

const db = new DynamoDBClient({ endpoint: DYNAMODB_URL });
const params = {
    TableName: TABLE_NAME,
};

const headers = {
    // Required for CORS support to work
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*', // Required for cookies, authorization headers with HTTPS
    ContentType: 'application/json',
};

export const computeProjectsStatus = (eywResults: IEYWResult[]): void => {
    eywResults.forEach((eywResult: IEYWResult) => {
        let status = Status.FAIL;

        if (!eywResult.results?.rules) status = Status.PASS;
        else {
            // To PASS, all rules exit code should be 0
            const sum: number = eywResult.results.rules.reduce(
                (sumOfExitCodes: number, rule: IRule) => sumOfExitCodes + rule.exitCode,
                0
            );
            if (sum === 0) status = Status.PASS;
        }

        eywResult.status = status;
    });
};

export const handler: (event: any) => Promise<any> = async () => {
    try {
        const response: ScanOutput = await db.send(new ScanCommand(params));
        const results: IEYWResult[] = response.Items ? response.Items.map((item) => new EYWResult(item)) : [];

        computeProjectsStatus(results);

        return { body: JSON.stringify(results), headers, statusCode: 200 };
    } catch (err: any) {
        return { body: JSON.stringify(err), headers, statusCode: 500 };
    }
};
