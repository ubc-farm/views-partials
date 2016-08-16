import {resolve} from 'path';
import dirname from '../dirname.js';

/** @type {string} Path to the partials folder */
export const partials = resolve(dirname, '../partials');

/** @type {string} Path to the helpers folder */
export const helpers = resolve(dirname, '../helpers');