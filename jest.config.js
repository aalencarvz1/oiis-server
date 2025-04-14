export default {
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  testEnvironment: 'node',
  moduleFileExtensions: ['js'],
  transform: {}, // desativa o ts-jest,
  setupFiles: ['<rootDir>/jest.setup.js']
}