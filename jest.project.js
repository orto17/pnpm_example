const dotenv = require('dotenv');
const path = require('path');

const ROOT_DIR = __dirname;

module.exports = ({ dirname }) => {
  const pkg = require(path.resolve(dirname, 'package.json'));
  const isRoot = ROOT_DIR === dirname;
  const nameKeys = !isRoot ? {} : {
    name: pkg.name,
    displayName: pkg.name
  };
  
  dotenv.config({ path: path.resolve(dirname, '.env.test') });

  return {
    ...nameKeys,
    rootDir: dirname,
    cacheDirectory: path.resolve(ROOT_DIR, 'node_modules/.cache/jest'),
    coverageReporters: ['text', ['lcov', { "projectRoot": __dirname }]],
    transform: { '^.+\\.ts?$': 'ts-jest' },
    modulePathIgnorePatterns: ['core'],
    collectCoverage: true,
    restoreMocks: true,
  };
};
