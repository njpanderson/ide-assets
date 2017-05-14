const fs = require('fs'),
	chalk = require('chalk'),
	get_git_data_by_cmd = require('./get-git-data');

/**
 * Initialises packaging by testing the JSON based config for this project
 */
module.exports = function(file_settings, after) {
	var options;

	// skip process within CI ENV
	if (process.env.CI_ENV && process.env.CI_ENV === 'TRAVIS') {
		console.log(chalk.yellow('Skipping packaging within CI environment...'));
		process.exit();
	}

	if (fs.existsSync(file_settings)) {
		try {
			options = fs.readFileSync(file_settings);
			options = JSON.parse(options);

			['host', 'user', 'path'].forEach((prop) => {
				if (!options[prop]) {
					throw new Error(
						'Options property ' + chalk.yellow(prop) + ' is missing. Have you set it in the .rsync.json file?'
					);
				}
			});
		} catch(e) {
			console.log(chalk.red('.rsync.json could not be parsed. cancelling packaging.'), e.message);
			process.exit(1);
		}

		// populate git properties
		get_git_data_by_cmd((data) => {
			// fire callback
			after(options, data);
		});
	} else {
		console.log(chalk.yellow('.rsync.json is missing', chalk.white('- Skipping packaging process. Please see'), chalk.green('.rsync.example.json'), chalk.white('in the ide-assets repository: https://github.com/njpanderson/ide-assets')));
		process.exit();
	}
}