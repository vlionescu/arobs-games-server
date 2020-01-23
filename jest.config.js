module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/env/'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '[wW]*/dist/'],
  setupFiles: ['./jest.setup.js'],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
};
