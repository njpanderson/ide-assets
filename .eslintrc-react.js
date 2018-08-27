let options = require('./.eslintrc.js');

options['extends'].push('plugin:react/recommended');

(options.plugins && options.plugins.push('react')) || (options.plugins = ['react']);

options.rules = Object.assign(options.rules, {
	// react specific rules
	'react/no-danger': 'off',
	'react/display-name': 'off'
});

module.exports = options;
