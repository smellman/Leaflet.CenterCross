/*
	Leaflet.CenterCross, a plugin that adds cross image on center to Leaflet powered maps.
	Original program is developed by Geospatial Information Authority of Japan.
	(c) 2015, Taro Matsuzawa and Geospatial Information Authority of Japan

	https://github.com/smellman/Leaflet.CenterCross
	http://leafletjs.com
	Original: https://github.com/gsi-cyberjapan/gsimaps
*/
(function (window, document, undefined) {L.centerCrossVersion = '0.0.1';



L.CenterCross = L.Class.extend({

	marker : null,
	options : {
		visible : true
	},

	initialize: function (map, options) {
		options = L.setOptions(this, options);
		this.map = map;
		this.setVisible(this.options.visible);
	},

	refresh: function () {
		if (this.options.visible) {
			var pos = this.map.getCenter();
			if (!this.marker) {
				var icon = L.icon({
					iconUrl: 'data:image:png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAHVJREFUWMPt1rENgDAMRNEPi3gERmA0RmAERgmjsAEjhMY0dOBIWHCWTulOL5UN8VmACpRoUdcAU1v19SQaYYQRRhhhhMmIMV//9WGuG/xudmA6C+YApGUGgNF1b0KKjithhBFGGGGE+Rtm9XfL8CHzS8340hzaXWaR1yQVAAAAAABJRU5ErkJggg==',
					iconSize:     [32, 32],
					iconAnchor:   [16, 16]
				});

				this.marker = L.marker(pos, {
					icon: icon,
					clickable: false,
					draggable: false,
					keyboard: false,
					opacity: 0.8,
					zIndexOffset: 0
				});
				this.marker.addTo(this.map);
			} else {
				this.marker.setLatLng(pos);
			}
		} else if (this.marker) {
			this.map.removeLayer(this.marker);
			this.marker = null;
		}
	},

	setVisible: function (on) {
		this.options.visible = on;
		if (this.options.visible) {
			this.map.on('move', this.refresh, this);
		} else {
			this.map.off('move', this.refresh, this);
		}
		this.refresh();
	},

	getVisible: function () {
		return this.options.visible;
	}
});

L.centerCross = function (map, options) {
	return new L.CenterCross(map, options);
};


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


}(window, document));