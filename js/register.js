import {registerPartial, registerHelper} from 'handlebars';
import {basename, join} from 'path';
import {readdir, readFile, stat} from 'fs';
import {partials, helpers} from './paths.js';

/**
 * Loads a partial at the given path
 * @param {string} path
 * @param {string} [name] of the partial, defaults to the basename of the path
 * @returns {Promise}
 */
export function loadPartial(path, name = basename(path)) {
	return new Promise((resolve, reject) => {
		readFile(path, 'utf8', (err, data) => {
			if (err) reject(err);
			else {
				registerPartial(name, data);
				resolve();
			}
		})
	});
}

/**
 * Loads a helper at the given path
 * @param {string} path
 * @param {string} [name] of the helper, defaults to the basename of the path
 */
export function loadHelper(path, name = basename(path)) {
	//eslint-disable-next-line global-require
	const helperModule = require(path); 
	//helperModule = interopDefault(helperModule);

	registerHelper(name, helperModule);
}

function isFile(path) {
	return new Promise((resolve, reject) => {
		stat(path, (err, stats) => {
			if (err) reject(err);
			else resolve(stats.isFile());
		})
	})
}

function getFilesFromDir(foldername) {
	return new Promise((resolve, reject) => {
		const path = foldername;
		readdir(path, (err, list) => {
			if (err) reject(err);
			else resolve(list);
		})
	})
	.then(list => Promise.all(list.map(filename => {
		const path = join(foldername, filename);

		return isFile(path).then(result => ({
			isFile: result, 
			path
		}));
	})))
	.then(stats => stats.reduce((array = [], value) => {
		if (value.isFile) {
			array.push(value.path);
		}
		return array;
	}))
}

/**
 * Loads the helpers and partials from this package into handlebars.
 */
export default function register() {
	return Promise.all( [partials, helpers].map(getFilesFromDir)	)
	.then(([partialPaths, helperPaths]) => {
		helpers.forEach(loadHelper);

		return Promise.all(
			partialPaths.map(loadPartial)
		);
	})
}