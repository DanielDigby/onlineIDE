/* eslint-disable */
module.exports = {
	env: {
		browser: true,
		es2020: true,
		mocha: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"plugin:security/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 11,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "prettier", "security"],
	rules: {
		"prettier/prettier": [
			1,
			{
				usePrettierrc: true,
			},
		],
		...require("eslint-config-prettier").rules,
	},
};
