module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended',
  'plugin:@typescript-eslint/recommended', "standard-with-typescript", "plugin:react/recommended","prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", '@typescript-eslint'],
  rules: {
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/space-before-function-paren": "off"
  },
};
