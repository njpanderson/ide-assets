module.exports = {
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true,
			"experimentalObjectRestSpread": true
		}
	},
	"plugins": [
		"react"
	],
	"env": {
		"browser": true,
		"node": true,
		"mocha": true,
		"es6": true,
		"jquery": true
	},
	"rules": {
		// enable additional rules
		"indent": ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		"quotes": ["error", "single"],
		"semi": ["error", "always"],

		// override default options for rules from base configurations
		//"comma-dangle": ["error", "always"],
		//"no-cond-assign": ["error", "except-parens"],

		// disable rules from base configurations
		"no-console": "off",

		// react specific rules
		"react/no-danger": "off",
		"react/display-name": "off"
	}
}