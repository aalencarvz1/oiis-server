export default {
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  verbose: false,
  silent: true,
  testEnvironment: 'node',
  moduleFileExtensions: ['js'],
  transform: {}, // desativa o ts-jest,
  setupFiles: ['<rootDir>/jest.setup.js'],
  testTimeout:30000
}