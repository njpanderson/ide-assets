const chalk = require('chalk'),
	glob = require('glob'),
	Rsync = require('rsync'),
	init = require('./lib/init-packaging'),
	package_files = 'dist/*.iife*.*';

init('./.rsync.json', upload);

/**
 * Upload the globbed files given host `options`
 */
function upload(options, git_data) {
	var rsync = new Rsync();

	// glob files
	glob(package_files, {
		absolute: true
	}, function(error, files) {
		var dest, path;

		if (error) throw error;

		console.log(chalk.green('Uploading ' + files.length + ' packages to ' + options.host + '...'));

		path = options.path + '/' + options.package_name + '/' + git_data.branch + '/' + git_data.tag;
		dest = (options.user ? options.user + '@' : '') +
			options.host + ':' + path;

		rsync
			.flags('z')
			.set('rsync-path', 'mkdir -p ' + path + ' && rsync')
			.source(files)
			.destination(dest);

		rsync.execute(function(error, code, cmd) {
			if (error) {
				console.error('Rsync error: ' + error.message + ' ' + cmd);
				process.exit(code);
			}
		});
	});
}