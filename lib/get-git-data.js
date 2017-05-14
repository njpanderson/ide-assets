const child_exec = require('child_process').exec;

module.exports = function(after) {
	var commands = {
			branch: 'git rev-parse --abbrev-ref HEAD',
			tag: 'git describe --abbrev=0 --tags'
		},
		results = 0,
		keys = Object.keys(commands),
		data = {};

	keys.forEach((key) => {
		child_exec(commands[key], (error, stdout) => {
			if (error) {
				console.error(error.message);
				process.exit(error.code);
			}

			results += 1;

			// console.log(key, stdout, results);
			data[key] = stdout.trim();

			if (results === keys.length) {
				after(data);
			}
		});
	});
}