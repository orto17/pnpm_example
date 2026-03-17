module.exports = {
    extends: ["@commitlint/config-conventional"],
    plugins: ["commitlint-plugin-function-rules"],
    rules: {
        "subject-case": [0],
        "function-rules/subject-case": [
            2,
            "always",
            (parsed) => {
                const test =
                    /^(feat|fix|docs|refactor|test|build|ci|chore|revert): ([A-Z0-9]{1,}-[0-9]{1,}) (.*)$/g;
                const isMatching = test.test(parsed.header.toString());

                if (!isMatching) {
                    return [
                        false,
                        "Invalid commit message syntax. Example: feat: DBZ-1337 set power level to >9000",
                    ];
                }
                return [true];
            },
        ],
    },
};
