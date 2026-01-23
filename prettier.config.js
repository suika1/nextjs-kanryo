/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
module.exports = {
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
  singleQuote: true,
  endOfLine: 'lf',
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
};
