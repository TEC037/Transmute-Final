// __mocks__/@testing-library/svelte.js
// Jest mock to provide CommonJS exports for the testing-library/svelte package.
// This avoids ES module syntax issues during test execution.

const actual = require('@testing-library/svelte');
module.exports = {
  ...actual,
};
