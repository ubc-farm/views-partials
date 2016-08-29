/* eslint-disable import/no-commonjs */
const test = require('tape');
const banner = require('../helpers/banner.js');

test('Calls render function with correct context', t => {
	t.plan(5);

	const options = {
		fn(data) {
			t.equal(arguments.length, 1, 'should have 1 argument passed');
			t.equal(typeof data, 'object', 'argument should be an object');
			t.equal(Object.keys(data).length, 2, 'Object should have 2 keys');

			t.equal(typeof data.title, 'string', 'data.title should be a string');
			t.equal(typeof data.href, 'string', 'data.href should be a string');
		},
	};

	banner('', options);
});

test('Parses string correctly', t => {
	t.plan(2);

	banner('[Title](/href)', {
		fn({ title, href }) {
			t.equal(title, 'Title');
			t.equal(href, '/href');
		},
	});
});

test('Calls once for each > section', t => {
	t.plan(1);
	let callCount = 0;

	banner(' > > ', {
		fn() { callCount++; },
	});

	t.equal(callCount, 3);
});
