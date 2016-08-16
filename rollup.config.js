export default {
	entry: 'js/index.js',
	sourceMap: true,
	targets: [
		{dest: 'index.node.js', format: 'cjs' },
		{dest: 'index.es.js', format: 'es' }
	],
	external: ['handlebars', 'fs', 'path']
}