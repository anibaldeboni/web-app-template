const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  roots: [
    '<rootDir>'
  ],
  setupFiles: [
    './jest.setup-file.ts'
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/utils/**',
    '!<rootDir>/src/infrastructure/**',
    '<rootDir>/src/infrastructure/services/CreditRiskService',
    '!<rootDir>/src/test/**',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testResultsProcessor: 'jest-sonar-reporter',
  coveragePathIgnorePatterns: [
    '.*/src/.*\\.d\\.ts',
    '.*/persistence/',
    '.*/commons/',
    '.*/presentation/',
    '.*/domain/.*/useCases/',
    '.*/tests'
  ],
  coverageReporters: ['json', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
}
