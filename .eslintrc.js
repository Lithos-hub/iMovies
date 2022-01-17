module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "max-len": [
      "true",
      {
        code: 150,
        ignoreUrls: true,
      },
    ],
    "quotes": ["error", "double"],
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
  },
};
