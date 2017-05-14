const chalk = require('chalk'),
	glob = require('glob'),
	fs = require('fs'),
	path = require('path'),
	Rsync = require('rsync'),
	init = require('./lib/init-packaging'),
	docs_path = path.resolve('docs');

init('./.rsync.json', upload);

/**
 * Upload the globbed files given host `options`
 */
function upload(options, git_data) {
	var rsync = new Rsync(),
		path, dest_path;

	path = docs_path + '/' + options.package_name + '/' + git_data.tag.replace(/v/, '');

	if (fs.existsSync(path)) {
		console.log(chalk.green('Uploading docs to ' + options.host + '...'));

		dest_path = options.path + '/docs/' + options.package_name + '/';
		dest = (options.user ? options.user + '@' : '') +
			options.host + ':' + dest_path;

		rsync
			.flags('zr')
			.set('delete')
			.set('rsync-path', 'mkdir -p ' + dest_path + ' && rsync')
			.source(path + '/')
			.destination(dest);

		rsync.execute(function(error, code, cmd) {
			if (error) {
				console.error('Rsync error: ' + error.message + ' ' + cmd);
				process.exit(code);
			}
		});
	} else {
		console.error(
			chalk.red('Documentation files could not be found at'),
			chalk.white(path + '.'),
			chalk.red('Aborting!')
		);
		process.exit(1);
	}
}