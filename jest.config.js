module.exports = {
    preset: "ts-jest",            // use ts-jest preset
    testEnvironment: "node",      // or "jsdom" if you're testing browser APIs (React, DOM, etc.)

    // look for test files
    testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],

    // optional: collect coverage
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.d.ts",
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        }
    }
};
