/**
 * @param {string} text to parse and turn into a loop.
 * Each item for the header should be seperated with a '>' character.
 * Text should be written like markdown links.
 * @param {function} options.fn - function to render children with a context.
 * {{ title }} will be the text, and {{ href }} will be the url.
 *
 * @example
 * {{bannerLoop "[Fields](/fields) > [Editor](#)" /}}
 */
function bannerLoop(text = '', { fn: render }) {
	const parts = text.split('>');

	return parts.map(md => {
		let mode = 'starting';
		const buffer = { title: '', href: '' };
		for (const character of md) {
			switch (mode) {
				case 'starting':
					if (character === '[') mode = 'title';
					break;
				case 'title':
					if (character === ']') {
						mode = 'middle';
						continue;
					}

					buffer.title += character;
					break;
				case 'middle':
					if (character === '(') {
						mode = 'href';
						break;
					} else {
						throw new Error('Closing bracket was not followed ' +
							`with a opening parenthesis in string ${md}`);
					}
				case 'href':
					if (character === ')') {
						mode = 'ending';
						continue;
					}

					buffer.href += character;
					break;
				case 'ending': break;
				default: throw new Error(`${mode} is not valid`);
			}
		}

		return render(buffer);
	}).join('');
}

module.exports = bannerLoop; // eslint-disable-line import/no-commonjs
