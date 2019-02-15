module.exports = {
	'extends': ['eslint:recommended'],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true,
			'experimentalObjectRestSpread': true
		},
		'sourceType': 'module'
	},
	'env': {
		'browser': true,
		'node': true,
		'mocha': true,
		'es6': true
	},
	'rules': {
		// enable additional rules
		'indent': ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'prefer-const': ['error'],
		'no-var': ['error'],

		// override default options for rules from base configurations
		//'comma-dangle': ['error', 'always'],
		//'no-cond-assign': ['error', 'except-parens'],

		// disable rules from base configurations
		'no-console': 'off',

		// react specific rules
		'react/no-danger': 'off',
		'react/display-name': 'off',

		// best practices
		'curly': ['error']
	},
	globals: {
		'PRODUCTION': true
	}
};
