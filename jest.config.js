module.exports = {
  testRegex: "./test/.*\\.(test|spec)?\\.(ts|tsx)$",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "ts"],
  collectCoverage: false,
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["clover", "lcov", "text", "text-summary", "html"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!/dist/",
    "!/node_modules/",
    "!test/**/*",
    "!src/**/__tests__/**",
    "!src/config/*",
    "!src/**/*.d.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/test/.*/fixtures/"],
  watchPathIgnorePatterns: ["coverage"],
};
