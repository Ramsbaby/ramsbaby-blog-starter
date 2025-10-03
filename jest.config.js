module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(gatsby)/)',
  ],
  moduleNameMapper: {
    '.+\\.(css|scss|sass)$': 'identity-obj-proxy',
    '.+\\.(png|jpg|jpeg|gif|svg|webp|avif)$': '<rootDir>/__mocks__/file-mock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['node_modules', '.cache', 'public'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
};
