export enum Status {
    PASS = 0,
    FAIL = 1,
}

export interface DBResponse {
    [key: string]: any;
}

export interface IRule {
    ruleName: string;
    exitCode: number;
    ruleId: string;
    level: string;
    description: string;
}

export interface IResults {
    rules: IRule[];
}

export interface ISourceReference {
    type: string;
    value: string;
}

export interface IEYWResult {
    id: string;
    sourceReference: ISourceReference;
    pullRequest: string;
    branch: string;
    codeBuild: string;
    timestamp: Date;
    project: string;
    results: IResults;
    levelAchieved: string;
    status: Status;
}

export class EYWResult implements IEYWResult {
    id: string;
    sourceReference: ISourceReference;
    branch: string;
    codeBuild: string;
    levelAchieved: string;
    project: string;
    pullRequest: string;
    timestamp: Date;
    results: IResults;
    status = Status.FAIL; // Fail by default

    constructor(dbItems: DBResponse) {
        this.id = dbItems.id || null;
        this.sourceReference = dbItems.sourceReference || null;
        this.branch = dbItems.branch || null;
        this.codeBuild = dbItems.codeBuild || null;
        this.pullRequest = dbItems.pullRequest || null;
        this.project = dbItems.project || null;
        this.timestamp = (dbItems.timestamp && new Date(Date.parse(dbItems.timestamp))) || null;
        this.levelAchieved = dbItems.levelAchieved || null;
        this.results = dbItems.results || { rules: [] };
    }
}
