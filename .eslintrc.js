module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "space-before-function-paren": ["error", "never"],
    camelcase: "off",
    '@typescript-eslint/camelcase': 'off',
    "@typescript-eslint/no-explicit-any": "off",
    "indent": ["error", 2, {
      "SwitchCase": 1
    }],
    "comma-dangle": ["error", {
      "arrays": "only-multiline",
      "objects": "only-multiline",
      "imports": "only-multiline",
      "exports": "only-multiline",
      "functions": "never"
    }]
  }
}
