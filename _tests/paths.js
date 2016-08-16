import {resolve} from 'path';
import test from 'tape';
import {partials, helpers} from '../js/paths.js';

const moduleRoot = resolve(__dirname, '../');

test('Returns correct path', t => {
	t.equal(partials, resolve(moduleRoot, './partials'));
	t.equal(helpers, resolve(moduleRoot, './helpers'));
	t.end();
})