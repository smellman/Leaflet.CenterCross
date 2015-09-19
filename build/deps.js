var deps = {
	Core: {
		src: [
			'Leaflet.CenterCross.js'
		],
		desc: 'The core of the plugin. Currently only includes the version.'
	},

	Main: {
		src: [
			'CenterCross.js',
			'Control.CenterCross.js'
		],
		desc: 'Main components.',
		deps: ['Core']
	}
};

if (typeof exports !== 'undefined') {
	exports.deps = deps;
}
