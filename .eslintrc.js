module.exports = {
  env: {
    browser: true,
    es6: true,
    "cypress/globals": true,
    node: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  plugins: ["cypress"],
  rules: {
    camelcase: "warn",
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single", { avoidEscape: true }],
    semi: ["error", "never"]
  },
  overrides: [
    {
      files: ["test*.js", "*/cypress/**/*.js"],
      rules: {
        "no-console": "off"
      }
    }
  ]
};
