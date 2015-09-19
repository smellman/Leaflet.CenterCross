L.Control.CenterCross = L.Control.extend({
	options: {
		position: 'topleft',
		toggleText: 'C',
		toggleTitle: 'Toggle Center Cross',
		show: false
	},

	initialize: function (options) {
		L.Control.prototype.initialize.call(this, options);
	},

	onAdd: function (map) {
		var container = L.DomUtil.create('div', 'leaflet-center-cross leaflet-bar');
		this._map = map;

		this._toggleButton = this._createButton(container, this);
		this._centerCross = L.centerCross(this._map, {visible: this.options.show});
		this._updateButton();

		return container;
	},

	_createButton: function (container, context) {
		var link = L.DomUtil.create('a', 'leaflet-center-cross-toggle', container);
		link.innerHTML = this.options.toggleText;
		link.href = '#';
		link.title = this.options.toggleTitle;

		var stop = L.DomEvent.stopPropagation;

		L.DomEvent
			.on(link, 'click', stop)
			.on(link, 'click', L.DomEvent.preventDefault)
			.on(link, 'click', this._toggle, context);

		return link;
	},

	_toggle: function () {
		var updateOn = !this._centerCross.getVisible();
		this._centerCross.setVisible(updateOn);
		this._updateButton();
	},

	_updateButton: function () {
		var on = this._centerCross.getVisible(),
			className = 'leaflet-disabled';

		L.DomUtil.removeClass(this._toggleButton, className);
		if (on) {
			L.DomUtil.addClass(this._toggleButton, className);
		}
	}

});

L.control.centerCross = function (options) {
	return new L.Control.CenterCross(options);
};
