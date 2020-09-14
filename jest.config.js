module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: true,
    },
  },
  testEnvironment: 'node',
};
