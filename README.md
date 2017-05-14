# IDE-like Assets

Nobody except me will find this repo useful, but here's some reminder notes on how to use it if you do.

## Installation

Use git submodules to install:

```
git submodule add https://github.com/njpanderson/ide-assets.git .ide
```

Then `cd` into the `.ide` folder and run `yarn` or `npm i` to ensure the node_modules folder is created.

Then, you'll need to add a .rsync.json file. An example file is in the root of this module:

 - **host** - The rsync hostname to upload to.
 - **user** - The authenticated user with write access to the `path` setting.
 - **path** - The path to upload to (will eventually contain releases and docs)
 - **package_name** - The package name, as defined by the package.json file.

Once that's done, you can then add the following to your package JSON:

```
{
	"scripts": {
		"postpublish": "yarn run package && yarn run docs",
		"package": "node .ide/package-iife.js",
		"docs": "jsdoc -c .ide/jsdoc.json && node .ide/package-docs.js"
	}
}
```

## Usage

`npm run package` / `yarn run package` will package up the files in `src/` to `dist/` and then upload the `iife.js` files given the settings in the contents of `.rsync.json`.

`npm run docs` / `yarn run docs` will generate documentation using `jsdoc` and upload them.