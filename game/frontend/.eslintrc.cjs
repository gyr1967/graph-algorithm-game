module.exports = {
  extends: ["plugin:vue/vue3-recommended", "plugin:@typescript-eslint/recommended"],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    "vue/html-indent": "off",
  },
};
