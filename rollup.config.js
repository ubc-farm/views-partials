import nodeGlobals from 'rollup-plugin-node-globals';

export default {
	entry: 'js/index.js',
	sourceMap: true,
	targets: [
		{dest: 'index.node.js', format: 'cjs' },
		{dest: 'index.es.js', format: 'es' }
	],
	externals: ['handlebars', 'fs', 'path'],
	plugins: [nodeGlobals()]
}